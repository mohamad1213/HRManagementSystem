from rest_framework import serializers
from .models import User, UserPreference

class UserPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreference
        fields = ['dark_mode', 'theme_color', 'email_notifications', 'push_notifications']

class UserSerializer(serializers.ModelSerializer):
    preference = UserPreferenceSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'role', 'status', 'avatar', 'bio', 'preference']
        read_only_fields = ['role', 'status']  # Regular users can't change role/status via this

class UserManagementSerializer(serializers.ModelSerializer):
    """Serializer for administrative user management."""
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'role', 'status']
