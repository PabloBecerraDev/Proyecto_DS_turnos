from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ActorViewSet, WorkerViewSet, CustomTokenObtainPairView, LogoutView, get_user_by_id, SendEmailAPIView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user') 
router.register(r'actors', ActorViewSet, basename='actor')
router.register(r'workers', WorkerViewSet, basename='worker')


urlpatterns = [
    path('', include(router.urls)),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('get/<int:user_id>/', get_user_by_id, name='get_user_by_id'),
    path('logout/', LogoutView.as_view(), name="logout"),
    path("send_email/", SendEmailAPIView.as_view(), name="send_email"),
]