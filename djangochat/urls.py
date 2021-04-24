from django.urls import path
from django.conf.urls import include
from django.conf.urls.static import static
from . import views
from Chatroom import settings


urlpatterns = [
    path('', views.index, name='index'),
    path('chat/', views.index, name='index'),
    # path('<str:room_name>/', views.room, name='room'),
]
