from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ActorViewSet, WorkerViewSet, CustomTokenObtainPairView, LogoutView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user') 
router.register(r'actors', ActorViewSet, basename='actor')
router.register(r'workers', WorkerViewSet, basename='worker')


urlpatterns = [
    path('', include(router.urls)),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name="logout")
]