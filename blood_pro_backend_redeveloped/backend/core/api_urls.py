from rest_framework.routers import DefaultRouter
from django.urls import path
from .api_views import DonorViewSet, BloodRequestViewSet, api_login, api_logout, get_csrf

router = DefaultRouter()
router.register('donors', DonorViewSet, basename='donors')
router.register('requests', BloodRequestViewSet, basename='requests')

urlpatterns = router.urls + [
    path('auth/login/', api_login, name='api_login'),
    path('auth/logout/', api_logout, name='api_logout'),
    path('auth/csrf/', get_csrf, name='api_csrf'),
]
