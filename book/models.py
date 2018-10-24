from django.db import models
from django.forms import ModelForm

class Countries(models.Model):
    name = models.CharField(max_length=20)
    isoCode = models.CharField(max_length=2)
    isdCode = models.CharField(max_length=7, null=True)

class Customer(models.Model):
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    sex = models.SmallIntegerField()
    street = models.CharField(max_length=20)
    streetNumber = models.CharField(max_length=20)
    postalCode = models.SmallIntegerField()
    city = models.CharField(max_length=20)
    country = models.ForeignKey(Countries, on_delete=models.CASCADE)
    telephone = models.CharField(max_length=20)
    email = models.EmailField()

class CustomerForm(ModelForm):
    class Meta:
        model = Customer
        fields = ["firstName", "lastName", "sex", "street", "streetNumber", "postalCode", "city", "country", "telephone", "email"]

class Book(models.Model):
    isbn = models.CharField(max_length=15)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
<<<<<<< HEAD
    cover = models.URLField(max_length=200)
=======
    cover = models.ImageField(null=True)
>>>>>>> 91e61d9f227fcd6be8a502a65ba13038e1f4778a
    price = models.FloatField()
    owningCustomer = models.ForeignKey(Customer, on_delete=models.CASCADE)

class BookForm(ModelForm):
    class Meta:
        model = Book
        fields = ["isbn", "title", "author", "price", "owningCustomer"]

class BookRental(models.Model):
    owningCustomer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='owner')
    rentingCustomer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='renter')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    fromDate = models.DateField()
    toDate = models.DateField()
