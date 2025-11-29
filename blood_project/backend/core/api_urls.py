from rest_framework.routers import DefaultRouter
from django.urls import path
from .api_views import DonorViewSet, BloodRequestViewSet, api_login, api_logout
router = DefaultRouter()
router.register('donors', DonorViewSet, basename='donors')
router.register('requests', BloodRequestViewSet, basename='requests')
urlpatterns = router.urls + [path('auth/login/', api_login), path('auth/logout/', api_logout)]
