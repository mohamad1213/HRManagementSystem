from django.db import models
from apps.core.models import Employee

class AttendanceRecord(models.Model):
    STATUS_CHOICES = [
        ('Present', 'Present'),
        ('Late', 'Late'),
        ('Absent', 'Absent'),
        ('Time Off', 'Time Off'),
        ('Half Day', 'Half Day'),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField()
    clock_in = models.TimeField(null=True, blank=True)
    clock_out = models.TimeField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True) # Computed
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Absent')
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ('employee', 'date')

    def __str__(self):
        return f"{self.employee} - {self.date}"

class AttendanceSegment(models.Model):
    TYPE_CHOICES = [
        ('Work', 'Work'),
        ('Break', 'Break'),
        ('Overtime', 'Overtime'),
        ('Time Off', 'Time Off'),
    ]

    attendance = models.ForeignKey(AttendanceRecord, on_delete=models.CASCADE, related_name='segments')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='Work')
    start_time = models.TimeField()
    end_time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.type} ({self.start_time} - {self.end_time})"
