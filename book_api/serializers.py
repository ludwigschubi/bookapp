from rest_framework import serializers

from book.models import Book

class BookListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ('isbn', 'title', 'author', 'cover', 'price')