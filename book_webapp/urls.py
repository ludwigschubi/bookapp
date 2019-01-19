from django.urls import path, include

from book_webapp.views import home, login

urlpatterns = [
    path('', home),
]