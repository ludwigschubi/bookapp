from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from book_api.serializers import UserSerializer, UserAddressSerializer, UserPaymentCreditCardSerializer, BookSerializer, RentalSerializer
from book.models import UserAddress, UserPaymentCreditCard, Book, Rental

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
    serialized = UserAddressSerializer(UserAddress.objects.get(user=request.user), data=request.data)

=======
    serialized = UserAddressSerializer(UserAddress.objects.get(user=request.user), data=request.data, context={'request': request})
>>>>>>> a174ff159231d88d0ab2a55b7b63e967e9ea4176
    if serialized.is_valid():
        serialized.save()
        return Response({"success": "Successfully updated"}, status=status.HTTP_200_OK)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


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
@api_view(["GET"])
def bookSearch(request):
    return Response({"error": "Not implemented yet"}, status=status.HTTP_400_BAD_REQUEST)