from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from ..serializers import orderSerializer
from ..models import order
from .uservalidation import validate_user_session
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def add(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'please re-login', 'code':'1'})

    if request.method == "post":
        user_id = id
        transaction_id = request.post['transaction_id']
        amount = request.post['product_rate']
        products = request.post['product_names']

        total_pro = len(products.split(',')[:-1])

        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User dones not exist'})

        ordr = order(user=user, product_names=products, total_products=total_pro, transaction_id=transaction_id, product_rate=amount)
        ordr.save()
        return JsonResponse({'success':True, 'error':False, 'msg':'order placed successfully'})


class OrderViewSet(viewsets.ModelViewSet):
    queryset = order.objects.all()
    serializer_class = orderSerializer
