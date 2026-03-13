from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from django.http import HttpResponse
from .models import PayrollRecord
from .serializers import PayrollRecordSerializer
from .utils import render_to_pdf

class PayrollRecordViewSet(viewsets.ModelViewSet):
    queryset = PayrollRecord.objects.all()
    serializer_class = PayrollRecordSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['status', 'period_month', 'period_year']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'Employee':
            if hasattr(user, 'employee_profile'):
                return PayrollRecord.objects.filter(employee=user.employee_profile)
            return PayrollRecord.objects.none()
        return PayrollRecord.objects.all()

    @action(detail=False, methods=['get'], url_path='my-latest-payslip')
    def my_latest_payslip(self, request):
        """
        Get the latest payslip for the current user.
        """
        if not hasattr(request.user, 'employee_profile'):
             return Response({'error': 'User is not an employee'}, status=status.HTTP_400_BAD_REQUEST)
        
        latest_payslip = PayrollRecord.objects.filter(employee=request.user.employee_profile).order_by('-period_year', '-period_month').first()
        if not latest_payslip:
            return Response({'error': 'No payslip found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.get_serializer(latest_payslip)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def download_payslip(self, request, pk=None):
        payroll = self.get_object()
        context = {
            'period_month': payroll.period_month,
            'period_year': payroll.period_year,
            'employee_name': f"{payroll.employee.user.first_name} {payroll.employee.user.last_name}",
            'employee_id': payroll.employee.id,
            'department': payroll.employee.department.name if payroll.employee.department else '-',
            'designation': payroll.employee.designation,
            'payment_date': payroll.payment_date,
            'status': payroll.status,
            'elements': payroll.elements.all(),
            'gross_salary': payroll.gross_salary,
            'net_salary': payroll.net_pay,
        }
        return render_to_pdf('payslip.html', context)
