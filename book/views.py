from django.shortcuts import render
from django.template.loader import get_template
from django.contrib import messages

def gsignin(request):
	return render(request, "g-signin.html")
