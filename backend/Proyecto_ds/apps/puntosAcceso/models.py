from django.db import models
from apps.users.models import Worker, Actor

class AccessPoint(models.Model):
    is_priority = models.BooleanField(default=False)
    horario_apertura = models.TimeField(null=True)
    horario_cierre = models.TimeField(null=True)
    worker = models.ForeignKey(Worker, on_delete=models.SET_NULL, null=True)

class AccessPointActor(models.Model):
    access_point = models.ForeignKey(AccessPoint, on_delete=models.CASCADE)
    actor = models.ForeignKey(Actor, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)