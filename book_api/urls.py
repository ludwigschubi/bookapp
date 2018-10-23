from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers

from book_api.views import BookList

router = routers.SimpleRouter()

router.register(r'book/list', BookList)

urlpatterns = [
    url('^', include(router.urls)),
]