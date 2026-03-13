from django.db import models
from apps.core.models import Employee

class PerformanceReview(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, related_name='reviews_given')
    review_period = models.CharField(max_length=50) # e.g. "Q4 2025"
    score = models.DecimalField(max_digits=5, decimal_places=2) # 0-100 or 0-5
    review_date = models.DateField()
    comments = models.TextField(blank=True)
    goals_met = models.IntegerField(default=0)
    goals_total = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-review_date']

    def __str__(self):
        return f"{self.employee} - {self.review_period}"
