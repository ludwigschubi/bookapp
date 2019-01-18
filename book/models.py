from django.db import models
from django.forms import ModelForm
from django.contrib.auth.models import User

    

class Book(models.Model):
    TOPICHOICES = (
        ("SE", "SE"),
        ("ID", "ID"),
        ("STS", "STS"),
        ("PM", "PM"),
        ("Other", "Other")
    )

    isbn = models.CharField(max_length=20)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    cover = models.URLField(max_length=300)
    topic = models.CharField(max_length=5, choices=TOPICHOICES)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Rental(models.Model):
    renter = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    from_date = models.DateField()
    to_date = models.DateField()