from django.contrib import admin
from .models import Department, Employee

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('employee_id', 'user', 'department', 'position', 'status')
    list_filter = ('department', 'status', 'employment_type')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'employee_id')
