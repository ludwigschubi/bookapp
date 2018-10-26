from django.db import models
from django.forms import ModelForm

class Countries(models.Model):
    name = models.CharField(max_length=20)
    iso_code = models.CharField(max_length=2)
    isd_code = models.CharField(max_length=7, null=True)

class Customer(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    sex = models.SmallIntegerField()
    street = models.CharField(max_length=20)
    street_number = models.CharField(max_length=20)
    postal_code = models.SmallIntegerField()
    city = models.CharField(max_length=20)
    country = models.ForeignKey(Countries, on_delete=models.CASCADE)
    telephone = models.CharField(max_length=20)
    email = models.EmailField()

class CustomerForm(ModelForm):
    class Meta:
        model = Customer
        fields = ["first_name", "last_name", "sex", "street", "street_number", "postal_code", "city", "country", "telephone", "email"]

class Book(models.Model):
    isbn = models.CharField(max_length=20)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    cover = models.URLField(max_length=200)
    price = models.FloatField()
    owning_customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

class BookForm(ModelForm):
    class Meta:
        model = Book
        fields = ["isbn", "title", "author", "price", "owning_customer"]

class BookRental(models.Model):
    owning_customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='owner')
    renting_customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='renter')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    from_date = models.DateField()
    to_date = models.DateField()
