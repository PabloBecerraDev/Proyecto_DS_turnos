from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AccessPointViewSet, AccessPointActorViewSet

router = DefaultRouter()
router.register(r'accesspoints', AccessPointViewSet, basename="accesspoint")
router.register(r'access-records', AccessPointActorViewSet, basename="access-record")

urlpatterns = [
    path('', include(router.urls)),
]