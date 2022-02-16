from rest_framework import serializers
from .models import product, user_profile


class productSerializer(serializers.ModelSerializer):
    product_image = serializers.ImageField(max_length=None, allow_empty_file=True, allow_null=True, required=False)
    class Meta:
        model = product
        fields = ['id','product_name','product_description','product_brand_name','product_aviablity','product_rate','product_image']


class user_profileSerializer(serializers.ModelSerializer):
    class Meta:
        model = user_profile
        fields = ['id','user','full_name','email','mobile','pincode','address']