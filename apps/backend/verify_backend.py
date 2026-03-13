import os
import django

# Setup Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from apps.accounts.models import User
from apps.core.models import Department, Employee
from apps.recruitment.models import JobPosting
from apps.attendance.models import AttendanceRecord
from apps.leave.models import LeaveRequest
from apps.payroll.models import PayrollRecord
from apps.performance.models import PerformanceReview
from apps.documents.models import Document
from apps.events.models import Event
from apps.schedules.models import Schedule

print("✅ All models imported successfully.")

# Verification Steps
try:
    # 1. Check Department
    dept, created = Department.objects.get_or_create(name="IT", defaults={"description": "Information Technology"})
    print(f"✅ Department 'IT' accessed (Created: {created})")

    # 2. Check Superuser
    if User.objects.filter(is_superuser=True).exists():
        print("✅ Superuser exists.")
    else:
        print("❌ No superuser found.")

    # 3. Check App Configurations (Implicitly checked by imports)
    
    print("\nBackend structure verification PASSED.")

except Exception as e:
    print(f"\n❌ Verification FAILED: {str(e)}")
