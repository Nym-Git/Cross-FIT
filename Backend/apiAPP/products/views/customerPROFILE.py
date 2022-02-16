from ..models import user_profile
from ..serializers import productSerializer, user_profileSerializer

from rest_framework.views import APIView
from rest_framework import generics, mixins
from rest_framework.response import Response

# mixind based
class profile(mixins.RetrieveModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin,generics.GenericAPIView):
    queryset = user_profile.objects.all()
    serializer_class = user_profileSerializer

    def get(self,request,pk):
        return self.retrieve(request,pk)
    
    def put(self,request,pk):
        return self.update(request,pk)

    def delete(self,request,pk):
        return self.destroy(request,pk)