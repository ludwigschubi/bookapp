from django.shortcuts import render
from django.template.loader import get_template
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth.views import login, logout

def signup(request):
	if request.method == 'POST':
		f = UserCreationForm(request.POST)
		if f.is_valid():
			f.save()
			messages.success(request, 'Account created successfully')
			return redirect('register')
	else:
		f = UserCreationForm()

	return render(request, 'registration/signup.html', {'form': f})

def home(request):
	t = get_template('home.html')
	return render(request, 'home.html')