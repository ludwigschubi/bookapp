from django.urls import path, include
from django.conf.urls import url

from book_api.views import bookList, bookShow, bookSearch
from book_api.views import rentalList, rentalShow, rentalCreate

urlpatterns = [
    path('book/list/', bookList),
    path('book/show/<int:bookId>/', bookShow),
    path('book/search/', bookSearch),
    path('rental/list/', rentalList),
    path('rental/show/<int:rentalId>/', rentalShow),
    path('rental/create/', rentalCreate)
]
