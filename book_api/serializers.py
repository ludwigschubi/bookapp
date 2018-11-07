from rest_framework import serializers

from django.contrib.auth.models import User
from django.db.models import Q

from book.models import UserAddress, UserPaymentCreditCard, Book, Rental

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
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

class UserPaymentCreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPaymentCreditCard
        fields = ('user', 'card_company', 'card_number', 'card_holder_name', 'expire_date_month', 'expire_date_year', 'cvv')
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'isbn', 'title', 'author', 'cover', 'price', 'owner')
    owner = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = ('renter', 'book', 'from_date', 'to_date')
    renter = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

class RentalShowSerializer(serializers.Serializer):
    rental_from_date = serializers.DateField()
    rental_to_date = serializers.DateField()
    book_title = serializers.CharField()
    book_author = serializers.CharField()
    book_isbn = serializers.CharField()
    book_cover = serializers.URLField()
    book_price = serializers.FloatField()
    owner_firstname = serializers.CharField()
    owner_lastname = serializers.CharField()
    owner_street = serializers.CharField()
    owner_street_number = serializers.CharField()
    owner_postal_code = serializers.IntegerField()
    owner_city = serializers.CharField()
    owner_telephone = serializers.CharField()
    owner_email = serializers.EmailField()
    renter_firstname = serializers.CharField()
    renter_lastname = serializers.CharField()
    renter_street = serializers.CharField()
    renter_street_number = serializers.CharField()
    renter_postal_code = serializers.IntegerField()
    renter_city = serializers.CharField()
    renter_telephone = serializers.CharField()
    renter_email = serializers.EmailField()