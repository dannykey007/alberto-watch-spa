from django.urls import path
from .views import watch_api_list, home_view

urlpatterns = [
    path('', home_view, name='home'),
    path('api/watches/', watch_api_list, name='watch_api_list'),
]
