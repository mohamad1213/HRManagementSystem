from rest_framework import serializers
from .models import PayrollRecord, PayrollElement

class PayrollElementSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayrollElement
        fields = '__all__'

class PayrollRecordSerializer(serializers.ModelSerializer):
    elements = PayrollElementSerializer(many=True, read_only=True)
    employee_name = serializers.CharField(source='employee.user.get_full_name', read_only=True)
    employee_id = serializers.CharField(source='employee.employee_id', read_only=True)
    department = serializers.CharField(source='employee.department.name', read_only=True)

    class Meta:
        model = PayrollRecord
        fields = '__all__'
