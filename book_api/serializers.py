from rest_framework import serializers

from django.contrib.auth.models import User

from book.models import UserAddress, Book, Rental

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'password', 'email')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ('user', 'sex', 'street', 'street_number', 'postal_code', 'city', 'country', 'telephone')

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'isbn', 'title', 'author', 'cover', 'price', 'owner')

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = ('renter', 'book', 'from_data', 'to_date')