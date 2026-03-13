from rest_framework import viewsets, permissions
from .models import LeaveRequest, LeaveBalance
from .serializers import LeaveRequestSerializer, LeaveBalanceSerializer

class LeaveRequestViewSet(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['status', 'leave_type']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'Employee':
            if hasattr(user, 'employee_profile'):
                return LeaveRequest.objects.filter(employee=user.employee_profile)
            return LeaveRequest.objects.none()
        return LeaveRequest.objects.all()

    def perform_create(self, serializer):
        if hasattr(self.request.user, 'employee_profile'):
            serializer.save(employee=self.request.user.employee_profile)

class LeaveBalanceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LeaveBalance.objects.all()
    serializer_class = LeaveBalanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'Employee':
            if hasattr(user, 'employee_profile'):
                return LeaveBalance.objects.filter(employee=user.employee_profile)
            return LeaveBalance.objects.none()
        return LeaveBalance.objects.all()
