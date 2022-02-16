from django.shortcuts import render

from rest_framework import viewsets,generics
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.views.decorators.cache import cache_page
from django.core.cache import cache
from project.settings import CACHE_TTL

CACHE_TTL = getattr(settings,'CACHE_TTL', DEFAULT_TIMEOUT)

# Genrics based views
