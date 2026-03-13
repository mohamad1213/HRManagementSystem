from rest_framework import serializers
from .models import AttendanceRecord, AttendanceSegment

class AttendanceSegmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceSegment
        fields = '__all__'

class AttendanceRecordSerializer(serializers.ModelSerializer):
    segments = AttendanceSegmentSerializer(many=True, read_only=True)
    employee_name = serializers.CharField(source='employee.user.get_full_name', read_only=True)
    department_name = serializers.CharField(source='employee.department.name', read_only=True)

    class Meta:
        model = AttendanceRecord
        fields = '__all__'
