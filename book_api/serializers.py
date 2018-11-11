from rest_framework import serializers

from django.contrib.auth.models import User
from django.db.models import Q

from book.models import UserAddress, UserAddressCountries, UserPaymentCreditCard, Book, Rental

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

class UserAddressCountriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddressCountries
        fields = ('id', 'name', 'iso_code', 'isd_code')

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

#
# rental
#

class RentalShowBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('isbn', 'title', 'author', 'cover', 'price')

class RentalShowOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

class RentalShowOwnerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ('sex', 'street', 'street_number', 'postal_code', 'city', 'country', 'telephone')

class RentalShowRenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

class RentalShowRenterAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ('sex', 'street', 'street_number', 'postal_code', 'city', 'country', 'telephone')

class RentalShowSerializer(serializers.Serializer):
    from_date = serializers.DateField()
    to_date = serializers.DateField()
    book = RentalShowBookSerializer()
    owner = RentalShowOwnerSerializer()
    ownerAddress = RentalShowOwnerAddressSerializer()
    renter = RentalShowRenterSerializer()
    renterAddress = RentalShowRenterAddressSerializer()