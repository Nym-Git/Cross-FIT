from django.db import models
from django.core.validators import MinLengthValidator
#from eth_utils import address

from ..user.models import CustomUser


class product(models.Model):
    product_name = models.CharField(max_length=1000000, validators=[MinLengthValidator(2)], blank=False)
    product_brand_name = models.CharField(max_length=1000000, default="Fitness Club")
    product_description = models.TextField(blank=True)
    product_aviablity = models.PositiveIntegerField()
    product_rate = models.PositiveIntegerField()
    product_payable_rate= models.PositiveIntegerField(default="1")
    product_image = models.ImageField(blank=True, upload_to='product_Images/')
    product_searchEngine = models.CharField(max_length=500, blank=False, default="GYM")

    def __str__(self):
        return self.product_name



class user_wishlist(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product_name = models.ForeignKey(product, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.product_name)

class user_profile(models.Model):
    user = models.CharField(max_length=300)
    full_name = models.CharField(max_length=500)
    email = models.EmailField()
    mobile = models.IntegerField(max_length=10, default=0)
    pincode = models.IntegerField(max_length=6, default=0)
    address = models.CharField(max_length=5000)

    def __str__(self):
        return self.full_name
