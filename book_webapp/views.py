from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

@login_required()
def webapp_home(request):
    html = "<html><body>home_webapp</body></html>"
    return HttpResponse(html)