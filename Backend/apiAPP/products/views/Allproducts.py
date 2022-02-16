from django.shortcuts import render
from ..serializers import productSerializer
from ..models import product

from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters      


# VIEWsets class-based logics 
class product_card(viewsets.ModelViewSet):
    queryset  = product.objects.all()
    serializer_class = productSerializer
    search_fields = ['^product_searchEngine','$product_name']
    filter_backends = [filters.SearchFilter]  


class product_bestseller_card(viewsets.ReadOnlyModelViewSet):
    queryset  = product.objects.all().order_by('-id')
    serializer_class = productSerializer


           
                

