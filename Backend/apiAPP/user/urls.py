from subprocess import REALTIME_PRIORITY_CLASS
from rest_framework import routers
from django.urls import path, include
from .import views

router = routers.DefaultRouter()
router.register(r'',views.UserViewSet)

urlpatterns = [
    path('login/',views.signin),    
    path('logout/<int:id>/',views.signout),
    path('',include(router.urls)),    
]

'''
django Q orm
pree fetch 
rate limit ip: 

'''