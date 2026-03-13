from django.db import models
from apps.core.models import Employee

class Schedule(models.Model):
    SHIFT_CHOICES = [('Morning', 'Morning'), ('Afternoon', 'Afternoon'), ('Night', 'Night')]
    STATUS_CHOICES = [('Scheduled', 'Scheduled'), ('Completed', 'Completed'), ('Absent', 'Absent')]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='schedules')
    date = models.DateField()
    shift_start = models.TimeField()
    shift_end = models.TimeField()
    shift_type = models.CharField(max_length=20, choices=SHIFT_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Scheduled')

    class Meta:
        ordering = ['date', 'shift_start']

    def __str__(self):
        return f"{self.employee} - {self.date}"
