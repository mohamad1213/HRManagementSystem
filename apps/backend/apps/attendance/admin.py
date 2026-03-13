from django.contrib import admin
from .models import AttendanceRecord, AttendanceSegment

class AttendanceSegmentInline(admin.TabularInline):
    model = AttendanceSegment
    extra = 0

@admin.register(AttendanceRecord)
class AttendanceRecordAdmin(admin.ModelAdmin):
    list_display = ('employee', 'date', 'status', 'clock_in', 'clock_out')
    list_filter = ('status', 'date')
    inlines = [AttendanceSegmentInline]
