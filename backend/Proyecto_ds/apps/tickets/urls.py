# backend/Proyecto_ds/apps/tickets/urls.py - VERSIÓN CORREGIDA

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet

router = DefaultRouter()

# --- CAMBIO AQUÍ ---
# Registra el ViewSet en la raíz ('') de este router, no bajo 'tickets'
router.register(r'', TicketViewSet, basename='ticket')
# --- FIN CAMBIO ---

urlpatterns = [
    # Incluye las URLs del router (ahora el ViewSet está en la raíz)
    path('', include(router.urls)),
]