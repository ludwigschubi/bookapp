from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers

from book_api.views import BookViewSet, CustomerViewSet

router = routers.SimpleRouter()

router.register(r'book', BookViewSet)
router.register(r'customer', CustomerViewSet)

urlpatterns = [
    url('^', include(router.urls)),
]