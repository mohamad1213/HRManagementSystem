from django.db import models
from apps.core.models import Department, Employee

class JobPosting(models.Model):
    STATUS_CHOICES = [('Open', 'Open'), ('Closed', 'Closed'), ('Draft', 'Draft')]
    
    title = models.CharField(max_length=200)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='job_postings')
    description = models.TextField()
    requirements = models.TextField()
    salary_min = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    salary_max = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    posted_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft')
    platform = models.CharField(max_length=100, blank=True, help_text="e.g. LinkedIn, Indeed")
    tags = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.title

class Candidate(models.Model):
    PIPELINE_CHOICES = [
        ('Applied', 'Applied'),
        ('Screening', 'Screening'),
        ('Interview', 'Interview'),
        ('Offer', 'Offer'),
        ('Hired', 'Hired'),
        ('Rejected', 'Rejected'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    job = models.ForeignKey(JobPosting, on_delete=models.CASCADE, related_name='candidates')
    pipeline_stage = models.CharField(max_length=50, choices=PIPELINE_CHOICES, default='Applied')
    applied_date = models.DateField(auto_now_add=True)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    avatar = models.ImageField(upload_to='candidate_avatars/', null=True, blank=True)
    
    def __str__(self):
        return self.name

class InterviewSchedule(models.Model):
    STATUS_CHOICES = [('Scheduled', 'Scheduled'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled')]

    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE, related_name='interviews')
    interviewer = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, related_name='interviews_conducting')
    date = models.DateField()
    time = models.TimeField()
    platform = models.CharField(max_length=100, default='Google Meet')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Scheduled')
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Interview: {self.candidate} - {self.date}"
