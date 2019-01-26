from django.db import models
from django.contrib.auth.models import User

#
# book
#

class BookAuthor(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)

class BookPublisher(models.Model):
    name = models.CharField(max_length=20)

class BookCategory(models.Model):
    name = models.CharField(max_length=5)

class BookTopic(models.Model):
    name = models.CharField(max_length=40)

class BookLanguage(models.Model):
    name = models.CharField(max_length=50)

class Book(models.Model):
    isbn = models.CharField(max_length=20)
    title = models.CharField(max_length=100)
    author = models.ManyToManyField(BookAuthor)
    publisher = models.ForeignKey(BookPublisher, on_delete=models.CASCADE)
    cover = models.BinaryField()
    category = models.ForeignKey(BookCategory, on_delete=models.CASCADE)
    topic = models.ForeignKey(BookTopic, on_delete=models.CASCADE)
    edition = models.IntegerField()
    release_date = models.DateField()
    language = models.ForeignKey(BookLanguage, on_delete=models.CASCADE)

class BookCopies(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    date_added = models.DateField()


#
# rental
#

class Loan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(BookCopies, on_delete=models.CASCADE)
    from_date = models.DateField()
    to_date = models.DateField()