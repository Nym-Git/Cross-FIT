from django.urls import path, include
from .views import Orders, payments

from rest_framework.routers import DefaultRouter
from rest_framework import routers, viewsets

router = DefaultRouter()
router.register('',Orders.OrderViewSet)

urlpatterns = [    
    path('',include(router.urls)),
    path('addorder/<str:id>/<str:token>/', Orders.add, name="order.add"),
    path('gettoken/<str:id>/<str:token>/',payments.generate_token, name="token.genrate"),
    path('process/<str:id>/<str:token>/',payments.process_payment, name="payment.process"),
]