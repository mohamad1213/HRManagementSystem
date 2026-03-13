from rest_framework import serializers
from django.db import transaction
from .models import Department, Employee
from apps.accounts.serializers import UserSerializer, UserManagementSerializer
from apps.accounts.models import User

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserManagementSerializer()
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = Employee
        fields = '__all__'

    @transaction.atomic
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        # Ensure id is not passed to create
        user_data.pop('id', None)
        
        # Create user using create_user for proper password handling
        email = user_data.pop('email')
        password = user_data.pop('password', 'password123')
        
        user = User.objects.create_user(
            email=email,
            password=password,
            **user_data
        )
        
        # Now create the employee profile
        employee = Employee.objects.create(user=user, **validated_data)
        return employee

    @transaction.atomic
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user = instance.user
            # Clean up user_data
            user_data.pop('id', None)
            user_data.pop('email', None) # Email usually shouldn't be changed here unless intended
            
            for attr, value in user_data.items():
                setattr(user, attr, value)
            user.save()
        
        return super().update(instance, validated_data)
