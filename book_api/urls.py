from django.urls import path, include
from django.conf.urls import url

from book_api.views import register, login, logout
from book_api.views import bookList, bookListOwn, bookShow, bookCreate, bookUpdate, bookDestroy, bookSearch
from book_api.views import rentalList, rentalShow, rentalCreate

urlpatterns = [
    path('auth/register/', register),
    path('auth/login/', login),
    path('auth/logout/', logout),
    path('book/list/', bookList),
    path('book/listOwn/', bookListOwn),
    path('book/show/<int:bookId>/', bookShow),
    path('book/create/', bookCreate),
    path('book/update/<int:bookId>/', bookUpdate),
    path('book/destroy/<int:bookId>/', bookDestroy),
    path('book/search/', bookSearch),
    path('rental/list/', rentalList),
    path('rental/show/<int:rentalId>/', rentalShow),
    path('rental/create/', rentalCreate)
]
