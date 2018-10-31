from rest_framework import status

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from book_api.serializers import UserSerializer, UserAddressSerializer, BookSerializer, RentalSerializer
from book.models import UserAddress, Book, Rental

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
def userAddressList(request):
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

    serialized = UserAddressSerializer(data=request.data)
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
    
        serialized = UserAddressSerializer(UserAddress.objects.get(user=request.user), data=request.data)

    if serialized.is_valid():
        serialized.save()
        return Response({"success": "Successfully updated"}, status=status.HTTP_200_OK)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


#
# user payment methods
#



#
# book operations
#

def bookList(request):
    pass

def bookListOwn(request):
    pass

def bookCreate(request):
    pass

def bookUpdate(request):
    # check if user is the owner of a book
    # check if the attributes are valid
    # update book
    pass

def bookDestroy(request):
    # check if user is the owner of a book
    # check if there are no pending rentals
    # delete book
    pass

def bookSearch(request):
    pass