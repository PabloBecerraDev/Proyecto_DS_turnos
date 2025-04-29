from rest_framework import permissions
from .models import Worker

class IsWorker(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            hasattr(request.user, 'worker')
        )