from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

@login_required(login_url="/accounts/signup")
def api_home(request):
    html = "<html><body>home_api</body></html>"
    return HttpResponse(html)