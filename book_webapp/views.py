from django.shortcuts import render
#from book.models import Book, BookForm

def home(request):
	return render(request, "home.html")

def login(request):
	return render(request, "login.html")