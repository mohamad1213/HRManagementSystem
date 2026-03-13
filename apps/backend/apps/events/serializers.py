from rest_framework import serializers
from .models import Event, EventMember

class EventMemberSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.get_full_name', read_only=True)
    
    class Meta:
        model = EventMember
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    members = EventMemberSerializer(many=True, read_only=True)
    created_by_name = serializers.CharField(source='created_by.user.get_full_name', read_only=True)

    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['created_by']
