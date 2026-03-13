from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

class Department(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Employee(models.Model):
    class EmploymentType(models.TextChoices):
        FULL_TIME = 'Full-time', _('Full-time')
        PART_TIME = 'Part-time', _('Part-time')
        CONTRACT = 'Contract', _('Contract')
        INTERNSHIP = 'Internship', _('Internship')

    class Status(models.TextChoices):
        ACTIVE = 'Active', _('Active')
        INACTIVE = 'Inactive', _('Inactive')
        ON_LEAVE = 'On Leave', _('On Leave')

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='employee_profile')
    employee_id = models.CharField(max_length=20, unique=True, help_text="e.g. EMP-001")
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, related_name='employees')
    position = models.CharField(max_length=100)
    employment_type = models.CharField(max_length=20, choices=EmploymentType.choices, default=EmploymentType.FULL_TIME)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    join_date = models.DateField()
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.user.get_full_name()} ({self.employee_id})" if self.user.get_full_name() else self.employee_id
