from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import AttendanceRecord, AttendanceSegment
from .serializers import AttendanceRecordSerializer

class AttendanceRecordViewSet(viewsets.ModelViewSet):
    queryset = AttendanceRecord.objects.all()
    serializer_class = AttendanceRecordSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['date', 'status']

    def get_queryset(self):
        user = self.request.user
        # Admin/HR/Manager see all (simplified), Employee sees own
        if user.role == 'Employee':
            if hasattr(user, 'employee_profile'):
               return AttendanceRecord.objects.filter(employee=user.employee_profile)
            return AttendanceRecord.objects.none()
        return AttendanceRecord.objects.all()

    @action(detail=False, methods=['post'])
    def clock_in(self, request):
        if not hasattr(request.user, 'employee_profile'):
             return Response({'error': 'User is not an employee'}, status=status.HTTP_400_BAD_REQUEST)

        employee = request.user.employee_profile
        today = timezone.now().date()
        
        if AttendanceRecord.objects.filter(employee=employee, date=today).exists():
            return Response({'error': 'Already clocked in today'}, status=status.HTTP_400_BAD_REQUEST)
        
        record = AttendanceRecord.objects.create(
            employee=employee,
            date=today,
            clock_in=timezone.now().time(),
            status='Present'
        )
        # Create initial work segment
        AttendanceSegment.objects.create(
            attendance=record,
            type='Work',
            start_time=record.clock_in
        )
        return Response(AttendanceRecordSerializer(record).data)

    @action(detail=False, methods=['post'])
    def clock_out(self, request):
        if not hasattr(request.user, 'employee_profile'):
             return Response({'error': 'User is not an employee'}, status=status.HTTP_400_BAD_REQUEST)

        employee = request.user.employee_profile
        today = timezone.now().date()
        
        try:
            record = AttendanceRecord.objects.get(employee=employee, date=today)
            record.clock_out = timezone.now().time()
            record.save()
            
            # Close any open segments
            open_segment = record.segments.filter(end_time__isnull=True).last()
            if open_segment:
                open_segment.end_time = record.clock_out
                open_segment.save()
                
            return Response(AttendanceRecordSerializer(record).data)
        except AttendanceRecord.DoesNotExist:
            return Response({'error': 'No attendance record found for today'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def start_break(self, request):
        if not hasattr(request.user, 'employee_profile'):
             return Response({'error': 'User is not an employee'}, status=status.HTTP_400_BAD_REQUEST)

        employee = request.user.employee_profile
        today = timezone.now().date()
        
        try:
            record = AttendanceRecord.objects.get(employee=employee, date=today)
            if record.segments.filter(type='Break', end_time__isnull=True).exists():
                return Response({'error': 'Break already in progress'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Close current work segment
            current_work = record.segments.filter(type='Work', end_time__isnull=True).last()
            now = timezone.now().time()
            if current_work:
                current_work.end_time = now
                current_work.save()
            
            AttendanceSegment.objects.create(
                attendance=record,
                type='Break',
                start_time=now
            )
            return Response(AttendanceRecordSerializer(record).data)
        except AttendanceRecord.DoesNotExist:
            return Response({'error': 'No attendance record found for today. Clock in first.'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def end_break(self, request):
        if not hasattr(request.user, 'employee_profile'):
             return Response({'error': 'User is not an employee'}, status=status.HTTP_400_BAD_REQUEST)

        employee = request.user.employee_profile
        today = timezone.now().date()
        
        try:
            record = AttendanceRecord.objects.get(employee=employee, date=today)
            break_seg = record.segments.filter(type='Break', end_time__isnull=True).last()
            if not break_seg:
                return Response({'error': 'No ongoing break found'}, status=status.HTTP_400_BAD_REQUEST)
            
            now = timezone.now().time()
            break_seg.end_time = now
            break_seg.save()
            
            # Resume work segment
            AttendanceSegment.objects.create(
                attendance=record,
                type='Work',
                start_time=now
            )
            return Response(AttendanceRecordSerializer(record).data)
        except AttendanceRecord.DoesNotExist:
            return Response({'error': 'No attendance record found for today'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def metrics(self, request):
        if not hasattr(request.user, 'employee_profile'):
             return Response({'error': 'User is not an employee'}, status=status.HTTP_400_BAD_REQUEST)

        employee = request.user.employee_profile
        today = timezone.now().date()
        this_month = today.month
        this_year = today.year
        
        records = AttendanceRecord.objects.filter(employee=employee, date__month=this_month, date__year=this_year)
        
        total_present = records.filter(status='Present').count()
        total_late = records.filter(status='Late').count()
        total_absent = records.filter(status='Absent').count()
        
        return Response({
            'days_present': total_present,
            'days_late': total_late,
            'days_absent': total_absent,
            'total_hours': "0h", # Placeholder
            'overtime': "0h"
        })
