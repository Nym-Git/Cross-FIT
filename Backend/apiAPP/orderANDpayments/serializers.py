from rest_framework import serializers
from .models import order

class orderSerializer(serializers.ModelSerializer):
    class Meta:
        model = order
        fields = ['id','user','product_names','product_rate','total_products','purchased_time']