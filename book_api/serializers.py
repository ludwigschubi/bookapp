from rest_framework import serializers

from book.models import Book, Customer

class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ('isbn', 'title', 'author', 'cover', 'price', 'owningCustomer_id')

class CustomerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'email')