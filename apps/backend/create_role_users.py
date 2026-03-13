import os
import django
from django.utils import timezone

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.accounts.models import User
from apps.core.models import Employee, Department

def create_users():
    # Ensure a department exists
    dept, _ = Department.objects.get_or_create(name='Technology', defaults={'description': 'IT and Software Development'})

    roles = [
        ('Admin', 'admin@humanizen.com', 'Admin', 'User'),
        ('HR Manager', 'hr@humanizen.com', 'HR', 'Manager'),
        ('Manager', 'manager@humanizen.com', 'General', 'Manager'),
        ('Employee', 'employee@humanizen.com', 'Regular', 'Employee'),
    ]

    password = 'password123'

    for role_val, email, first_name, last_name in roles:
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'first_name': first_name,
                'last_name': last_name,
                'role': role_val,
                'is_staff': role_val in ['Admin', 'HR Manager'],
                'is_superuser': role_val == 'Admin',
            }
        )
        if created:
            user.set_password(password)
            user.save()
            print(f"Created user: {email} with role {role_val}")
        else:
            print(f"User {email} already exists")

        # Create employee profile
        emp_id = f"EMP-{email.split('@')[0].upper()}"
        employee, emp_created = Employee.objects.get_or_create(
            user=user,
            defaults={
                'employee_id': emp_id,
                'department': dept,
                'position': f"{role_val} position",
                'join_date': timezone.now().date(),
                'status': Employee.Status.ACTIVE,
            }
        )
        if emp_created:
            print(f"Created employee profile for {email} with ID {emp_id}")

if __name__ == "__main__":
    create_users()
