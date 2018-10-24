from rest_framework import viewsets

from book_api.serializers import BookSerializer, CustomerSerializer
from book.models import Book, Customer

class Book(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def create(self, request):
        # check if user is allowed to add new books
        # check if the attributes are valid
        # add book
        pass

    def update(self, request, pk=None):
        # check if user is the owner of a book
        # check if the attributes are valid
        # update book
        pass

    def partial_update(self, request, pk=None):
        # check if user is the owner of a book
        # check if the attributes are valid
        # update book
        pass

    def destroy(self, request, pk=None):
        # check if user is the owner of a book
        # check if there are no pending rentals
        # delete book
        pass

    def search(self, request):
        pass

class Customer(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer