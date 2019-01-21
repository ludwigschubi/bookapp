from django.urls import path

from book_api.views import UserProfile
from book_api.views import Book
from book_api.views import Search
from book_api.views import Loan
from book_api.views import LoanOwn

urlpatterns = [
    path('userProfile/', UserProfile.as_view()),
    path('book/', Book.as_view()),
    path('book/<int:id>/', Book.as_view()),
    path('search/<str:searchTerm>/', Search.as_view()),
    path('loan/', Loan.as_view()),
    path('loan/<int:id>/', Loan.as_view()),
    path('loanOwn/', LoanOwn.as_view()),
]