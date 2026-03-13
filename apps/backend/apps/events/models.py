from django.db import models
from apps.core.models import Employee

class Event(models.Model):
    PRIORITY_CHOICES = [('Important', 'Important'), ('High', 'High'), ('Normal', 'Normal')]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    event_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    platform = models.CharField(max_length=100, blank=True, default='Google Meet')
    platform_link = models.URLField(blank=True)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='Normal')
    created_by = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='created_events')
    
    def __str__(self):
        return self.title

class EventMember(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='members')
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='events_participating')

    class Meta:
        unique_together = ('event', 'employee')
