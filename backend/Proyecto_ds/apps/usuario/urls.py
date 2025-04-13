from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import ListCreateUsuarios, CustomTokenObtainPairView

from .views import *
router = DefaultRouter()
router.register(r'', ListCreateUsuarios)

urlpatterns = [
  path('', include(router.urls)),
  path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('logout/', ListCreateUsuarios.as_view({'post': 'logout'}), name='logout'),
]

#urlpatterns = format_suffix_patterns(urlpatterns)