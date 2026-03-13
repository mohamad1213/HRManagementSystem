import random
from datetime import timedelta, date, time
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.contrib.auth import get_user_model
from apps.core.models import Department, Employee
from apps.recruitment.models import JobPosting, Candidate, InterviewSchedule
from apps.attendance.models import AttendanceRecord
from apps.leave.models import LeaveRequest, LeaveBalance
from apps.payroll.models import PayrollRecord, PayrollElement
from apps.performance.models import PerformanceReview
from apps.documents.models import Document
from apps.events.models import Event, EventMember
from apps.schedules.models import Schedule

User = get_user_model()

class Command(BaseCommand):
    help = 'Populates the database with dummy data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating dummy data...')
        
        # 1. Departments
        depts = ['Human Resources', 'IT', 'Finance', 'Marketing', 'Operations']
        dept_objs = []
        for d in depts:
            obj, _ = Department.objects.get_or_create(name=d, defaults={'description': f'{d} Department'})
            dept_objs.append(obj)
        self.stdout.write(f'Created {len(dept_objs)} departments.')

        # 2. Users & Employees
        first_names = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
        last_names = ['Doe', 'Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore']
        
        employees = []
        for i in range(10):
            first = random.choice(first_names)
            last = random.choice(last_names)
            email = f'{first.lower()}.{last.lower()}{i}@humanizen.co'
            
            if not User.objects.filter(email=email).exists():
                user = User.objects.create_user(
                    email=email,
                    password='password123',
                    first_name=first,
                    last_name=last,
                    role=random.choice(['Manager', 'Employee', 'HR Manager']),
                    status='Active'
                )
                
                dept = random.choice(dept_objs)
                emp_id = f'EMP{i+100:03d}'
                if not Employee.objects.filter(employee_id=emp_id).exists():
                    emp = Employee.objects.create(
                        user=user,
                        department=dept,
                        employee_id=emp_id,
                        position=f'Senior {dept.name} Specialist',
                        employment_type='Full-time',
                        status='Active',
                        join_date=date.today() - timedelta(days=random.randint(30, 1000)),
                        phone=f'555-010{i}',
                        address=f'{random.randint(100, 999)} Main St'
                    )
                    employees.append(emp)
                else:
                    employees.append(Employee.objects.get(employee_id=emp_id))
        
        # Ensure we have employees directly if none created this run (e.g. repeated runs)
        if not employees:
            employees = list(Employee.objects.all())

        self.stdout.write(f'Ensured {len(employees)} employees exist.')
        
        if not employees:
            self.stdout.write(self.style.WARNING('No employees found to attach records to. Exiting.'))
            return

        # 3. Recruitment
        job_titles = ['Software Engineer', 'HR Generalist', 'Accountant', 'Marketing Specialist']
        for title in job_titles:
             JobPosting.objects.get_or_create(
                 title=title,
                 defaults={
                     'department': random.choice(dept_objs),
                     'description': 'Exciting opportunity...',
                     'requirements': 'Bachelor degree...',
                     'salary_min': 50000,
                     'salary_max': 80000,
                     'status': random.choice(['Open', 'Closed']),
                     'platform': 'LinkedIn'
                 }
             )
        
        jobs = JobPosting.objects.all()
        if jobs.exists():
            for i in range(5):
                Candidate.objects.create(
                    name=f'Candidate {i}',
                    email=f'candidate{i}@email.com',
                    job=random.choice(jobs),
                    pipeline_stage=random.choice(['Applied', 'Interview', 'Offer'])
                )

        # 4. Attendance (Last 7 days)
        today = timezone.now().date()
        for i in range(7):
            day = today - timedelta(days=i)
            # Skip weekends logic simplified
            if day.weekday() < 5: 
                for emp in employees[:5]: # Generate for first 5 emps
                    if not AttendanceRecord.objects.filter(employee=emp, date=day).exists():
                        AttendanceRecord.objects.create(
                            employee=emp,
                            date=day,
                            clock_in=time(9, random.randint(0, 30)),
                            clock_out=time(17, random.randint(0, 30)),
                            status='Present'
                        )

        # 5. Leave
        for emp in employees[:3]:
            if not LeaveBalance.objects.filter(employee=emp, year=today.year).exists():
                LeaveBalance.objects.create(employee=emp, year=today.year, total_days=12, used_days=2)
            
            LeaveRequest.objects.create(
                employee=emp,
                leave_type='Annual',
                start_date=today + timedelta(days=random.randint(1, 10)),
                end_date=today + timedelta(days=random.randint(11, 12)),
                reason='Vacation',
                status='Pending'
            )

        # 6. Payroll (Last Month)
        last_month = today.replace(day=1) - timedelta(days=1)
        for emp in employees[:5]:
             PayrollRecord.objects.get_or_create(
                 employee=emp,
                 period_month=last_month.month,
                 period_year=last_month.year,
                 defaults={
                     'gross_salary': 5000,
                     'net_pay': 4500,
                     'status': 'Paid'
                 }
             )

        # 7. Performance
        for emp in employees[:3]:
            PerformanceReview.objects.create(
                employee=emp,
                reviewer=random.choice(employees), # Self-review or peer for mock
                review_period='Q4 2025',
                score=85.5,
                review_date=today,
                comments='Good job!'
            )

        # 8. Events
        Event.objects.create(
            title='Town Hall',
            event_date=today + timedelta(days=5),
            start_time=time(10, 0),
            end_time=time(11, 0),
            created_by=employees[0]
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated dummy data!'))
