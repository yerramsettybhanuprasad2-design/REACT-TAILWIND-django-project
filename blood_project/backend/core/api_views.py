from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .models import Donor, BloodRequest
from .serializers import DonorSerializer, BloodRequestSerializer

class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all().order_by('-created_at')
    serializer_class = DonorSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        blood = self.request.query_params.get('blood_type')
        city = self.request.query_params.get('city')
        if blood: qs = qs.filter(blood_type__iexact=blood)
        if city: qs = qs.filter(city__icontains=city)
        return qs

class BloodRequestViewSet(viewsets.ModelViewSet):
    queryset = BloodRequest.objects.all().order_by('-created_at')
    serializer_class = BloodRequestSerializer
    # restrict list/retrieve to admin; creation allowed to anyone
    def get_permissions(self):
        if self.action in ['list','retrieve','destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None and user.is_active and user.is_staff:
        login(request, user)
        return Response({'detail':'ok'})
    return Response({'detail':'invalid'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def api_logout(request):
    logout(request)
    return Response({'detail':'logged out'})
