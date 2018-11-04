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

class UserPaymentCreditCard(models.Model):
    EXPIRE_DATE_MONTH_CHOICES = (
        ('01', '01'),
        ('02', '02'),
        ('03', '03'),
        ('04', '04'),
        ('05', '05'),
        ('06', '06'),
        ('07', '07'),
        ('08', '08'),
        ('09', '09'),
        ('10', '10'),
        ('11', '11'),
        ('12', '12')
    )

    EXPIRE_DATE_YEAR_CHOICES = (
        ('2018', '2018'),
        ('2019', '2019'),
        ('2020', '2020'),
        ('2021', '2021'),
        ('2022', '2022'),
        ('2023', '2023')
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    card_company = models.CharField(max_length=40)
    card_number = models.CharField(max_length=20)
    card_holder_name = models.CharField(max_length=20)
    expire_date_month = models.CharField(max_length=2, choices=EXPIRE_DATE_MONTH_CHOICES)
    expire_date_year = models.CharField(max_length=4, choices=EXPIRE_DATE_YEAR_CHOICES)
    cvv = models.CharField(max_length=4)

class Book(models.Model):
    isbn = models.CharField(max_length=20)
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    cover = models.URLField(max_length=200)
    price = models.FloatField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Rental(models.Model):
    renter = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    from_date = models.DateField()
    to_date = models.DateField()