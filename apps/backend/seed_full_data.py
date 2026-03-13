import os
import django
import random
from datetime import timedelta, date, datetime
from django.utils import timezone

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.accounts.models import User
from apps.core.models import Employee, Department
from apps.recruitment.models import JobPosting, Candidate, InterviewSchedule
from apps.attendance.models import AttendanceRecord
from apps.leave.models import LeaveRequest
from apps.performance.models import PerformanceReview

def seed_data():
    print("Starting data seeding...")
    
    # 1. Departments
    depts_names = ['Technology', 'Marketing', 'Sales', 'HR', 'Finance', 'Design', 'Operations']
    depts = []
    for name in depts_names:
        dept, created = Department.objects.get_or_create(name=name, defaults={'description': f'{name} Department'})
        depts.append(dept)
    print(f"Seeded {len(depts)} departments.")

    # 2. Employees & Users
    first_names = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"]
    last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"]
    
    existing_emails = set(User.objects.values_list('email', flat=True))
    
    created_employees = []
    
    # Add some predefined roles
    roles_pool = [User.Role.EMPLOYEE] * 15 + [User.Role.MANAGER] * 3 + [User.Role.HR_MANAGER] * 2
    
    for i in range(20):
        email = f"user{i+1}@humanizen.com"
        if email in existing_emails:
            continue
            
        fn = random.choice(first_names)
        ln = random.choice(last_names)
        role = roles_pool[i % len(roles_pool)]
        
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'first_name': fn,
                'last_name': ln,
                'role': role,
                'is_staff': role in [User.Role.ADMIN, User.Role.HR_MANAGER]
            }
        )
        if created:
            user.set_password('password123')
            user.save()
        
        dept = random.choice(depts)
        emp_id = f"EMP-{1000 + i}"
        
        emp, emp_created = Employee.objects.get_or_create(
            user=user,
            defaults={
                'employee_id': emp_id,
                'department': dept,
                'position': f"{dept.name} Specialist",
                'join_date': date(2023, random.randint(1, 12), random.randint(1, 28)),
                'status': Employee.Status.ACTIVE,
                'phone': f"0812{random.randint(10000000, 99999999)}"
            }
        )
        if emp_created:
            created_employees.append(emp)
        
    print(f"Seeded {len(created_employees)} additional employees.")

    # 3. Job Postings
    job_titles = ["Software Engineer", "Senior Web Developer", "UI/UX Designer", "Marketing Manager", "Product Owner", "HR Specialist", "Accountant"]
    jobs = []
    for title in job_titles:
        dept = random.choice(depts)
        job, created = JobPosting.objects.get_or_create(
            title=title,
            department=dept,
            defaults={
                'description': f"Great opportunity for {title} in {dept.name}.",
                'requirements': "Skills, Experience, Passion.",
                'salary_min': random.randint(5000000, 10000000),
                'salary_max': random.randint(11000000, 20000000),
                'status': 'Open',
                'platform': random.choice(['LinkedIn', 'Indeed', 'Glassdoor', 'Website']),
                'tags': ['Remote', 'Full-time', 'React'] if 'Developer' in title else ['Design', 'UX']
            }
        )
        jobs.append(job)
    print(f"Seeded {len(jobs)} job postings.")

    # 4. Candidates
    for job in jobs:
        for j in range(random.randint(3, 8)):
            names = ["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona", "George", "Hannah"]
            name = random.choice(names) + " " + random.choice(last_names)
            Candidate.objects.get_or_create(
                email=f"{name.replace(' ', '.').lower()}@mail.com",
                defaults={
                    'name': name,
                    'job': job,
                    'pipeline_stage': random.choice(['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected']),
                    'phone': f"0878{random.randint(1000, 9999)}"
                }
            )
    print("Seeded candidates.")

    # 5. Attendance (Last 7 days)
    today = date.today()
    all_emps = list(Employee.objects.all())
    for d_offset in range(7):
        target_date = today - timedelta(days=d_offset)
        # Skip Sunday
        if target_date.weekday() == 6:
            continue
            
        for emp in all_emps:
            # 90% chance of being present
            if random.random() < 0.9:
                clock_in = datetime.combine(target_date, datetime.strptime(f"{random.randint(7, 9)}:{random.randint(0, 59)}", "%H:%M").time())
                clock_out = datetime.combine(target_date, datetime.strptime(f"{random.randint(16, 18)}:{random.randint(0, 59)}", "%H:%M").time())
                
                AttendanceRecord.objects.get_or_create(
                    employee=emp,
                    date=target_date,
                    defaults={
                        'clock_in': clock_in.time(),
                        'clock_out': clock_out.time(),
                        'status': 'Present' if clock_in.hour < 9 else 'Late'
                    }
                )
    print("Seeded attendance logs.")

    # 6. Leave Requests
    for emp in random.sample(all_emps, 5):
        LeaveRequest.objects.create(
            employee=emp,
            leave_type='Sick' if random.random() > 0.5 else 'Annual',
            start_date=today + timedelta(days=random.randint(1, 10)),
            end_date=today + timedelta(days=random.randint(11, 15)),
            reason="Personal reasons",
            status=random.choice(['Pending', 'Approved', 'Rejected'])
        )
    print("Seeded leave requests.")

    # 7. Performance Reviews
    for emp in random.sample(all_emps, 10):
        PerformanceReview.objects.create(
            employee=emp,
            reviewer=random.choice([e for e in all_emps if e.user.role in ['Admin', 'Manager', 'HR Manager'] and e != emp]),
            review_period="Q4 2025",
            score=random.uniform(3.5, 5.0),
            review_date=today - timedelta(days=random.randint(30, 90)),
            comments="Keep up the good work!",
            goals_met=random.randint(3, 5),
            goals_total=5
        )
    print("Seeded performance reviews.")

    print("Seeding complete.")

if __name__ == "__main__":
    seed_data()
