from django.shortcuts import render

def webapp_home(request):
    return render(request, 'webapp_home.html')