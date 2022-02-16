from urllib import request
from django.shortcuts import render
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.views.decorators.cache import cache_page
from django.core.cache import cache
from ..models import *
from ..serializers import productSerializer


from django.http import JsonResponse, response
from rest_framework.response import Response
from rest_framework.decorators import api_view

CACHE_TTL = getattr(settings,'CACHE_TTL', DEFAULT_TIMEOUT)

@api_view(['GET'])
def GETproducts(request,searchedProduct):
    if request.method == 'GET':
        filtered_products = product.objects.filter(product_searchEngine__icontains = searchedProduct) #.filter(product_name__icontains = searchedProduct).filter(product_brand_name__icontains =searchedProduct)
        serializer = productSerializer(filtered_products, many=True)
        return Response(serializer.data)