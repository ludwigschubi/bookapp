from django.shortcuts import render
from django.template.loader import get_template
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from book.bookmodel import Book, BookForm


def signup(request):
	if request.method == 'POST':
		form = UserCreationForm(request.POST)
		if form.is_valid():
			# Save the user to the DB
			form.save()
			messages.success(request, 'Account created successfully')
	else:
		form = UserCreationForm()

	return render(request, 'registration/signup.html', {'form': form})

def home(request):
	return render(request, 'home.html')

def gsignin(request):
	return render(request, "g-signin.html")

def books(request):
	if request.method == "POST":
		form = BookForm(request.POST)
		books = Book.objects.all()
		if form.is_valid():
			form.save()
	else: 
		form = BookForm()
		books = Book.objects.all()

	return render(request, "books.html", {"books": books, "form": form})
