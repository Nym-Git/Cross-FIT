from django.urls import path, include
from rest_framework.authtoken import views   #obtain_auth_token
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', include('apiAPP.products.urls')),
    path('user/', include('apiAPP.user.urls')),
    path('order/',include('apiAPP.orderANDpayments.urls')),   
    
    path('api-token-auth/',views.obtain_auth_token, name='api_token_auth'),    #not using  [django auto auth-token]
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
