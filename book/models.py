from django.db import models
from django.forms import ModelForm
from django.contrib.auth.models import User

class UserAddressCountries(models.Model):
    name = models.CharField(max_length=20)
    iso_code = models.CharField(max_length=2)
    isd_code = models.CharField(max_length=7, null=True)

class UserAddress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    sex = models.SmallIntegerField()
    street = models.CharField(max_length=20)
    street_number = models.CharField(max_length=20)
    postal_code = models.SmallIntegerField()
    city = models.CharField(max_length=20)
    country = models.ForeignKey(UserAddressCountries, on_delete=models.CASCADE)
    telephone = models.CharField(max_length=20)

class Book(models.Model):
    isbn = models.CharField(max_length=20)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    cover = models.URLField(max_length=300)
    price = models.FloatField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Rental(models.Model):
    renter = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    from_date = models.DateField()
    to_date = models.DateField()
