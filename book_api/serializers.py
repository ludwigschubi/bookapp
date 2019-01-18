from rest_framework import serializers

from django.contrib.auth.models import User
from django.db.models import Q

from book.models import Book, Rental

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'password', 'email')

    def create(self, validated_data):
        print(str(validated_data["email"]).split("@"))
        if(str(validated_data["email"]).split("@")[1] == "code.berlin"):
            user = super(UserSerializer, self).create(validated_data)
            user.set_password(validated_data['password'])
            user.save()
            return user

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'isbn', 'title', 'author', 'cover', 'topic', 'owner')
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
        fields = ('isbn', 'title', 'author', 'cover', 'topic')

class RentalShowOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

class RentalShowRenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

class RentalShowSerializer(serializers.Serializer):
    from_date = serializers.DateField()
    to_date = serializers.DateField()
    book = RentalShowBookSerializer()
    owner = RentalShowOwnerSerializer()
    renter = RentalShowRenterSerializer()