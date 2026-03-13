from django.db import models
from apps.core.models import Employee

class Document(models.Model):
    STATUS_CHOICES = [
        ('Approved', 'Approved'),
        ('Awaiting', 'Awaiting'),
        ('Rejected', 'Rejected'),
    ]

    name = models.CharField(max_length=200)
    filename = models.CharField(max_length=200, blank=True)
    file = models.FileField(upload_to='documents/')
    category = models.CharField(max_length=100) # e.g. "Company Policy", "Legal"
    file_type = models.CharField(max_length=20, blank=True) # pdf, docx
    size = models.CharField(max_length=20, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Awaiting')
    uploaded_by = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='uploaded_documents')
    uploaded_date = models.DateField(auto_now_add=True)
    review_notes = models.TextField(blank=True)
    reviewed_by = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_documents')

    def __str__(self):
        return self.name
