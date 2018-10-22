from django.db import models

class Country(models.Model):
    countryName = models.CharField(max_length=20)

class Customer(models.Model):
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    sex = models.SmallIntegerField()
    street = models.CharField(max_length=20)
    streetNumber = models.CharField(max_length=20)
    postalCode = models.SmallIntegerField()
    city = models.CharField(max_length=20)
    country = models.OneToOneField(Country, on_delete=models.CASCADE)
    telephone = models.CharField(max_length=20)
    email = models.EmailField()

class Book(models.Model):
    isbn = models.CharField(max_length=15)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    cover = models.ImageField()
    price = models.FloatField()
    owningCustomer = models.ForeignKey(Customer, on_delete=models.CASCADE)

class BookRental(models.Model):
    owningCustomer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='owner')
    rentingCustomer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='renter')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    fromDate = models.DateField()
    toDate = models.DateField()