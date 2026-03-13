from django.contrib import admin
from .models import Schedule

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('employee', 'date', 'shift_type', 'status')
    list_filter = ('shift_type', 'status', 'date')
