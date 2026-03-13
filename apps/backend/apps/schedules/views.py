from rest_framework import viewsets, permissions
from .models import Schedule
from .serializers import ScheduleSerializer

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['date', 'status', 'shift_type']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'Employee':
            if hasattr(user, 'employee_profile'):
                return Schedule.objects.filter(employee=user.employee_profile)
            return Schedule.objects.none()
        return Schedule.objects.all()
