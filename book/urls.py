from django.urls import path, include
from django.contrib import admin
from django.contrib.auth import logout
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('social_django.urls', namespace='social')),
    path('api/', include('book_api.urls')),
    path('login/', RedirectView.as_view(url='/auth/login/google-oauth2/', permanent=False), name='login'),
    path('logout/', logout, name='logout'),
    path('', include('book_webapp.urls'), name='home')
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)