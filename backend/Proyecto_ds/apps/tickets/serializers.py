from rest_framework import serializers
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    class Meta():
        model = Ticket
        fields = '__all__'
    
    def create(self, validated_data):
        ticket = Ticket.objects.create(
            number = validated_data['number'],
            actor = validated_data['actor'],
            ticket_vencido = validated_data['ticket_vencido']
        )
        return ticket
        
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance