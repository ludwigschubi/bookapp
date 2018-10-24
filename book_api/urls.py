from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers

from book_api.views import Book, Customer

router = routers.SimpleRouter()

router.register(r'book', Book)
router.register(r'customer', Customer)

urlpatterns = [
    url('^', include(router.urls)),
]