from django.shortcuts import render
from django.template.loader import get_template
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

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

def gsignin(request):
	return render(request, "g-signin.html")
