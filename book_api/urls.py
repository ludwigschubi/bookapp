from django.urls import path, include

from book_api.views import api_home

urlpatterns = [
    path('', api_home),
]