from django.urls import path, include

from book_webapp.views import webapp_home

urlpatterns = [
    path('', webapp_home),
]