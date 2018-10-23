from rest_framework import viewsets

from book_api.serializers import BookListSerializer
from book.models import Book

class BookList(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookListSerializer