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

from book_api.serializers import UserSerializer, UserAddressSerializer, UserAddressCountriesSerializer, UserPaymentCreditCardSerializer, BookSerializer, RentalSerializer, RentalShowSerializer
from book.models import UserAddress, UserAddressCountries, UserPaymentCreditCard, Book, Rental

#
# user registration/login/logout operations
#

@api_view(['POST'])
@permission_classes((AllowAny,))
def register(request):
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        serialized.save()
        return Response({'success': 'User successfully created'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_404_NOT_FOUND)
    
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key}, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(["POST"])
def logout(request):
    request.user.auth_token.delete()
    return Response({"success":"Successfully logged out"}, status=status.HTTP_200_OK)


#
# user address
#

@csrf_exempt
@api_view(["GET"])
def userAddressShow(request):
    try:
        queryset = UserAddress.objects.get(user=request.user)
    except UserAddress.DoesNotExist:
        return Response({"error": "No such address"}, status=status.HTTP_400_BAD_REQUEST)
    serializer = UserAddressSerializer(queryset)
    return Response(serializer.data)

@csrf_exempt
@api_view(["POST"])
def userAddressCreate(request):
    if UserAddress.objects.filter(user=request.user).exists():
        return Response({"error": "Address already exists"}, status=status.HTTP_400_BAD_REQUEST)

    serialized = UserAddressSerializer(data=request.data, context={'request': request})
    if serialized.is_valid():
        serialized.save()
        return Response({"success": "Successfully created"}, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(["PUT"])
def userAddressUpdate(request):
    if not UserAddress.objects.filter(user=request.user).exists():
        return Response({"error": "Address does not exist"}, status=status.HTTP_400_BAD_REQUEST)
<<<<<<< HEAD
    
=======

>>>>>>> 5a2fa587ab0b1f516aec845ca76c8fbb78047686
    serialized = UserAddressSerializer(UserAddress.objects.get(user=request.user), data=request.data, context={'request': request})
    if serialized.is_valid():
        serialized.save()
        return Response({"success": "Successfully updated"}, status=status.HTTP_200_OK)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(["GET"])
def userAddressCountriesList(request):
    countries = UserAddressCountries.objects.all()
    serialized = UserAddressCountriesSerializer(countries, many=True)
    return Response(serialized.data)

#
# user payment methods
#

@csrf_exempt
@api_view(["GET"])
def userPaymentCreditCardShow(request):
    try:
        queryset = UserPaymentCreditCard.objects.get(user=request.user)
    except UserPaymentCreditCard.DoesNotExist:
        return Response({"error": "No such payment method"}, status=status.HTTP_400_BAD_REQUEST)
    serializer = UserPaymentCreditCardSerializer(queryset)
    return Response(serializer.data)

@csrf_exempt
@api_view(["POST"])
def userPaymentCreditCardCreate(request):
    if UserPaymentCreditCard.objects.filter(user=request.user).exists():
        return Response({"error": "Payment method already exists"}, status=status.HTTP_400_BAD_REQUEST)

    serialized = UserPaymentCreditCardSerializer(data=request.data, context={'request': request})
    if serialized.is_valid():
        serialized.save()
        return Response({"success": "Successfully created"}, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(["PUT"])
def userPaymentCreditCardUpdate(request):
    if not UserPaymentCreditCard.objects.filter(user=request.user).exists():
        return Response({"error": "Payment method does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    
    serialized = UserPaymentCreditCardSerializer(UserPaymentCreditCard.objects.get(user=request.user), data=request.data, context={'request': request})
    if serialized.is_valid():
        serialized.save()
        return Response({"success": "Successfully updated"}, status=status.HTTP_200_OK)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


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
def bookListOwn(request):
    books = Book.objects.filter(owner=request.user)
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
def bookCreate(request):
    serialized = BookSerializer(data=request.data, context={'request': request})
    if serialized.is_valid():
        serialized.save()
        return Response({"success": "Successfully created"}, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(["PUT"])
def bookUpdate(request, bookId):
    try:
        book = Book.objects.get(id=bookId)
    except Book.DoesNotExist:
        return Response({"error": "No such object"}, status=status.HTTP_400_BAD_REQUEST)
    if not book.owner == request.user:
        return Response({"error": "Not owner of the book"}, status=status.HTTP_400_BAD_REQUEST)

    serialized = BookSerializer(book, data=request.data, context={'request': request})
    if serialized.is_valid():
        serialized.save()
        return Response({"success": "Successfully updated"}, status=status.HTTP_200_OK)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(["GET"])
def bookDestroy(request, bookId):
    try:
        book = Book.objects.get(id=bookId)
    except Book.DoesNotExist:
        return Response({"error": "No such object"}, status=status.HTTP_400_BAD_REQUEST)
    if not book.owner == request.user:
        return Response({"error": "Not owner of the book"}, status=status.HTTP_400_BAD_REQUEST)
    book.delete()
    return Response({"success": "Successfully deleted"}, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(["POST"])
def bookSearch(request):
<<<<<<< HEAD
    vector = SearchVector('title', 'author', 'isbn')
    query = SearchQuery(request.data['query'])
    books = Book.objects.annotate(rank=SearchRank(vector, query)).order_by('-rank')
    serialized = BookSerializer(books, many=True)
    return Response(serialized.data)

    #return Response({"error": "Not implemented yet"}, status=status.HTTP_400_BAD_REQUEST)
=======
    return Response({"error": "Not implemented yet"}, status=status.HTTP_400_BAD_REQUEST)


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

    serialized = RentalShowSerializer(data={
        'rental_from_date': rental.from_date,
        'rental_to_date': rental.to_date,
        'book_title': book.title,
        'book_author': book.author,
        'book_isbn': book.isbn,
        'book_cover': book.cover,
        'book_price': book.price,
        'owner_firstname': owner.first_name,
        'owner_lastname': owner.last_name,
        'owner_street': ownerAddress.street,
        'owner_street_number': ownerAddress.street_number,
        'owner_postal_code': ownerAddress.postal_code,
        'owner_city': ownerAddress.city,
        'owner_telephone': ownerAddress.telephone,
        'owner_email': owner.email,
        'renter_firstname': renter.first_name,
        'renter_lastname': renter.last_name,
        'renter_street': renterAddress.street,
        'renter_street_number': renterAddress.street_number,
        'renter_postal_code': renterAddress.postal_code,
        'renter_city': renterAddress.city,
        'renter_telephone': renterAddress.telephone,
        'renter_email': renter.email
        }
    )
    if serialized.is_valid():
        return Response(serialized.data, status=status.HTTP_200_OK)
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
>>>>>>> 5a2fa587ab0b1f516aec845ca76c8fbb78047686
