from django.urls import path, include
from django.conf.urls import url

from book_api.views import register, login, logout
from book_api.views import userAddressList, userAddressCreate, userAddressUpdate
from book_api.views import bookList, bookListOwn, bookCreate, bookUpdate, bookDestroy, bookSearch

urlpatterns = [
    url('auth/register', register),
    url('auth/login', login),
    url('auth/logout', logout),
    url('userAddress/list', userAddressList),
    url('userAddress/create', userAddressCreate),
    url('userAddress/update', userAddressUpdate),
    url('book/list', bookList),
    url('book/listOwn', bookListOwn),
    url('book/create', bookCreate),
    url('book/update', bookUpdate),
    url('book/destroy', bookDestroy),
    url('book/search', bookSearch),
]