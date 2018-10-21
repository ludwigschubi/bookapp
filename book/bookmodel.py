from django.db import models
from django.forms import ModelForm

class Book(models.Model):
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)

    def getName(self):
        return self.name
    
    def getAuthor(self):
        return self.author

class BookForm(ModelForm):
    class Meta:
        model = Book
        fields = ["name", "author"]