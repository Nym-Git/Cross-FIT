from django.contrib import admin
from .models import product,user_wishlist,user_profile

admin.site.register(product)
admin.site.register(user_wishlist)
admin.site.register(user_profile)