from django.db import models
from ..user.models import CustomUser

class order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    
    transaction_id = models.CharField(max_length=100000,default='NULL')

    product_names = models.CharField(max_length=100000)
    total_products = models.PositiveIntegerField()
    product_rate = models.PositiveIntegerField()
    
    purchased_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.user)
