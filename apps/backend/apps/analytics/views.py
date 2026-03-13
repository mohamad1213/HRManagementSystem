from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Count
from django.utils import timezone
from apps.core.models import Employee, Department
from apps.attendance.models import AttendanceRecord
from apps.recruitment.models import JobPosting, Candidate
from apps.leave.models import LeaveRequest
from apps.payroll.models import PayrollRecord

class DashboardViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def summary(self, request):
        today = timezone.now().date()
        
        # Employee Statistics
        total_employees = Employee.objects.count()
        emp_types = Employee.objects.values('employment_type').annotate(count=Count('employment_type'))
        
        # Recruitment Statistics
        active_jobs = JobPosting.objects.filter(status='Open').count()
        pipeline = Candidate.objects.values('pipeline_stage').annotate(count=Count('pipeline_stage'))
        
        # Department Statistics
        dept_stats = Department.objects.annotate(employee_count=Count('employees')).values('name', 'employee_count')
        
        # Attendance Statistics
        present_employees = AttendanceRecord.objects.filter(date=today, status__in=['Present', 'Late']).count()
        
        return Response({
            'total_employees': total_employees,
            'employment_types': {item['employment_type']: item['count'] for item in emp_types},
            'department_stats': {item['name']: item['employee_count'] for item in dept_stats},
            'active_jobs': active_jobs,
            'recruitment_pipeline': {item['pipeline_stage']: item['count'] for item in pipeline},
            'present_employees': present_employees,
            'total_departments': Department.objects.count()
        })

from django.db.models import Count, Q
from django.db.models.functions import TruncMonth
import datetime

class AnalyticsViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def metrics(self, request):
        return Response({
            'total_employees': Employee.objects.count(),
            'new_hires_month': Employee.objects.filter(join_date__month=timezone.now().month, join_date__year=timezone.now().year).count(),
            'active_candidates': Candidate.objects.exclude(pipeline_stage__in=['Hired', 'Rejected']).count(),
        })

    @action(detail=False, methods=['get'])
    def dashboard(self, request):
        today = timezone.now().date()
        # Last 12 months
        start_date = today - datetime.timedelta(days=365)
        
        # 1. Total Metrics
        total_employees = Employee.objects.count()
        job_applications = Candidate.objects.count()
        new_hires_this_month = Employee.objects.filter(
            join_date__month=today.month, 
            join_date__year=today.year
        ).count()
        satisfaction_rate = "94.8%" # Placeholder or from specialized model

        # 2. Employee Movement Trend (New Hires by Month)
        # Assuming departures are not tracked by date yet, so we'll use 0 or placeholder
        movement = Employee.objects.filter(join_date__gte=start_date) \
            .annotate(month=TruncMonth('join_date')) \
            .values('month') \
            .annotate(new_hires=Count('id')) \
            .order_by('month')
        
        movement_data = []
        for item in movement:
            movement_data.append({
                'name': item['month'].strftime('%b'),
                'newHires': item['new_hires'],
                'departure': item['new_hires'] // 4 # Simulated for now until departure_date exists
            })

        # 3. Attendance Trend
        attendance = AttendanceRecord.objects.filter(date__gte=start_date) \
            .annotate(month=TruncMonth('date')) \
            .values('month') \
            .annotate(
                on_time=Count('id', filter=Q(status='Present')),
                late=Count('id', filter=Q(status='Late'))
            ) \
            .order_by('month')
        
        attendance_data = []
        for item in attendance:
            attendance_data.append({
                'name': item['month'].strftime('%b'),
                'onTime': item['on_time'],
                'late': item['late']
            })

        # 4. Department Composition
        depts = Department.objects.annotate(employee_count=Count('employees'))
        total_emp = sum(d.employee_count for d in depts) or 1
        
        dept_composition = []
        colors = ['#a855f7', '#ec4899', '#fb923c', '#d1d5db', '#6366f1', '#10b981']
        for i, d in enumerate(depts):
            dept_composition.append({
                'name': d.name,
                'value': d.employee_count,
                'color': colors[i % len(colors)]
            })

        dept_progress = []
        bg_colors = ['bg-purple-500', 'bg-sky-400', 'bg-yellow-400', 'bg-orange-400', 'bg-red-400', 'bg-pink-400']
        for i, d in enumerate(depts):
            dept_progress.append({
                'name': d.name,
                'value': int((d.employee_count / total_emp) * 100),
                'color': bg_colors[i % len(bg_colors)]
            })

        return Response({
            'metrics': [
                { 'label': 'Total Employee', 'value': f"{total_employees:,}".replace(',', '.'), 'icon': 'group', 'color': 'bg-purple-100 text-purple-600' },
                { 'label': 'Job Aplication', 'value': f"{job_applications:,}".replace(',', '.'), 'icon': 'work', 'color': 'bg-purple-100 text-purple-600' },
                { 'label': 'New Employee', 'value': str(new_hires_this_month), 'icon': 'person_add', 'color': 'bg-purple-100 text-purple-600' },
                { 'label': 'Satisfaction Rate', 'value': satisfaction_rate, 'icon': 'favorite', 'color': 'bg-purple-100 text-purple-600' },
            ],
            'movement_trend': movement_data,
            'attendance_trend': attendance_data,
            'department_composition': dept_composition,
            'department_progress': dept_progress
        })
