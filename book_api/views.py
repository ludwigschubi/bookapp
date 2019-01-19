from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Q
from django.forms.models import model_to_dict

from book_api.serializers import UserSerializer
from book_api.serializers import BookSerializer, RentalSerializer, RentalShowSerializer
from book.models import Book, Rental
from django.contrib.auth.models import User

#
# user operations
#

@csrf_exempt
@api_view(["GET"])
def user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


#
# book operations
#

@csrf_exempt
@api_view(["GET"])
def bookList(request):
    books = Book.objects.all()
    serialized = BookSerializer(books, many=True)
    return Response(serialized.data)

@csrf_exempt
@api_view(["GET"])
def bookShow(request, bookId):
    try:
        book = Book.objects.get(id=bookId)
    except Book.DoesNotExist:
        return Response({"error": "No such book"}, status=status.HTTP_400_BAD_REQUEST)
    serialized = BookSerializer(book)
    return Response(serialized.data, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(["POST"])
def bookSearch(request):
    vector = SearchVector('title', 'author', 'isbn')
    query = SearchQuery(request.data['query'])
    books = Book.objects.annotate(rank=SearchRank(vector, query)).order_by('-rank')
    serialized = BookSerializer(books, many=True)
    return Response(serialized.data)


#
# rental operations
#

@csrf_exempt
@api_view(["GET"])
def rentalList(request):
    rentals = Rental.objects.filter(renter=request.user)
    serialized = RentalSerializer(rentals, many=True)
    return Response(serialized.data)

@csrf_exempt
@api_view(["GET"])
def rentalShow(request, rentalId):
    try:
        rental = Rental.objects.get(id=rentalId)
    except Rental.DoesNotExist:
        return Response({"error": "No such rental"}, status=status.HTTP_400_BAD_REQUEST)

    book = Book.objects.get(id=rental.book_id)
    owner = User.objects.get(id=Book.objects.get(id=rental.book_id).owner_id)
    ownerAddress = UserAddress.objects.get(user_id=owner.id)
    renter = User.objects.get(id=rental.renter_id)
    renterAddress = UserAddress.objects.get(user_id=renter.id)

    # check if user is either owner of the book or the renter
    if not request.user == owner or request.user == renter:
        return Response({"error": "Not renter or owner of rented book"}, status=status.HTTP_400_BAD_REQUEST)

    serialized = RentalShowSerializer(data={'from_date': rental.from_date,'to_date': rental.to_date,'book': book.__dict__, 'owner': owner.__dict__, 'ownerAddress': model_to_dict(ownerAddress), 'renter': renter.__dict__, 'renterAddress': model_to_dict(renterAddress)}, context={'request': request})

    if serialized.is_valid():
        return Response(serialized.data, status=status.HTTP_200_OK)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(["POST"])
def rentalCreate(request):
    try:
        book = Book.objects.get(id=request.data['book'])
    except Book.DoesNotExist:
        return Response({'error': 'Book does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    if book.owner == request.user:
        return Response({'error': 'Can not rent own book'}, status=status.HTTP_400_BAD_REQUEST)
    if Rental.objects.filter(book_id=book.id).filter(Q(from_date__gte=request.data['from_date'], from_date__lt=request.data['to_date']) | Q(to_date__gt=request.data['from_date'], to_date__lte=request.data['to_date'])).exists():
        return Response({'error': 'Book already rented for given date duration'}, status=status.HTTP_400_BAD_REQUEST)

    serialized = RentalSerializer(data=request.data, context={'request': request})
    if serialized.is_valid():
        serialized.save()
        return Response({"Success":"Successfully created"}, status=status.HTTP_201_CREATED)
    return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)