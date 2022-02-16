from unittest import result
from django.shortcuts import render
from django.http import response, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

from .uservalidation import validate_user_session
import braintree


gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="3r485jyvr9kwkdmc",
        public_key="vptczbbpzfvwtncs",
        private_key="1da66afc19d31fcaf270d3e157b3d0da"
    )
)


@csrf_exempt
def generate_token(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'invalid session, plase login'})
    
    return JsonResponse({'client_token': gateway.client_token.generate(),'success': True})


@csrf_exempt
def process_payment(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'invalid session, plase login'})
    
    nonce_from_the_client = request.POST["paymentMethodNonce"]
    amount_from_the_client = request.POST["amount"]
    
    result = gateway.transaction.sale({
        "amount": amount_from_the_client,
        "payment_method_nonce":  nonce_from_the_client,
        "options":{
            "submit_for_settlement": True
        }
    })
    
    if result.is_success:
        return JsonResponse({
            "sucess": result.is_success,
            'transaction':{'id':result.transaction.id, 'amount':result.transaction.amount}})

    else:
        return JsonResponse({'error': True, 'success': False})