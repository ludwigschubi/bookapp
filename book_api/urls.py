from django.urls import path, include
from django.conf.urls import url

from book_api.views import register, login, logout
from book_api.views import userAddressShow, userAddressCreate, userAddressUpdate
from book_api.views import bookList, bookListOwn, bookShow, bookCreate, bookUpdate, bookDestroy, bookSearch
from book_api.views import userPaymentCreditCardShow, userPaymentCreditCardCreate, userPaymentCreditCardUpdate

urlpatterns = [
    path('auth/register/', register),
    path('auth/login/', login),
    path('auth/logout/', logout),
    path('userAddress/show/', userAddressShow),
    path('userAddress/create/', userAddressCreate),
    path('userAddress/update/', userAddressUpdate),
    path('book/list/', bookList),
    path('book/listOwn/', bookListOwn),
    path('book/show/<int:bookId>/', bookShow),
    path('book/create/', bookCreate),
    path('book/update/<int:bookId>/', bookUpdate),
    path('book/destroy/<int:bookId>/', bookDestroy),
    path('book/search/', bookSearch),
    path('payment/creditCard/show/', userPaymentCreditCardShow),
    path('payment/creditCard/create/', userPaymentCreditCardCreate),
    path('payment/creditCard/update/', userPaymentCreditCardUpdate)
]
