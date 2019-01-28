from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import serializers

from book.models import Book, BookAuthor, BookPublisher, BookCategory, BookTopic, BookLanguage, BookCopies, Loan


#
# user
#

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email')


#
# book
#

class BookAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookAuthor
        fields = ('first_name', 'last_name')

class BookPublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookPublisher
        fields = ('name',)

class BookCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookCategory
        fields = ('name',)

class BookTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookTopic
        fields = ('name',)

class BookLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookLanguage
        fields = ('name',)

class BookCopiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookCopies
        fields = ('id', 'book', 'date_added')

class BookSerializer(serializers.ModelSerializer):
    #author = BookAuthorSerializer(many=True, read_only=True)
    #publisher = BookPublisherSerializer(read_only=True)
    #category = BookCategorySerializer(read_only=True)
    #topic = BookTopicSerializer(read_only=True)
    #language = BookLanguageSerializer(read_only=True)
    #copies = serializers.SerializerMethodField()

    def get_copies(self, obj):
        serialized = BookCopiesSerializer(BookCopies.objects.filter(book=obj.id), many=True)
        return  serialized.data

    class Meta:
        model = Book
        fields = ('id', 'isbn', 'title', 'author', 'publisher', 'cover', 'category', 'topic', 'edition', 'release_date', 'language')


#
# loan
#

class LoanSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    id = serializers.ReadOnlyField()

    class Meta:
        model = Loan
        fields = ('id', 'user', 'book', 'from_date', 'to_date')

class LoanOwnSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Loan
        fields = ('id', 'book', 'from_date', 'to_date')
