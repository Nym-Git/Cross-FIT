from django.urls import path, include

from .views import Allproducts, addTOcard, customerPROFILE,productsearch

from rest_framework.routers import DefaultRouter
from rest_framework import routers, viewsets

router = DefaultRouter()
router.register('products',Allproducts.product_card)
router.register('bestseller/products',Allproducts.product_bestseller_card)

urlpatterns = [    
    path('profile/<int:pk>/',customerPROFILE.profile.as_view()),    
    path('product/<str:searchedProduct>/',productsearch.GETproducts),    
    path('',include(router.urls)),

]