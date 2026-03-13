from django.contrib import admin
from .models import JobPosting, Candidate, InterviewSchedule

@admin.register(JobPosting)
class JobPostingAdmin(admin.ModelAdmin):
    list_display = ('title', 'department', 'status', 'posted_date')
    list_filter = ('status', 'department')
    search_fields = ('title',)

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ('name', 'job', 'pipeline_stage', 'applied_date')
    list_filter = ('pipeline_stage', 'job')
    search_fields = ('name', 'email')

@admin.register(InterviewSchedule)
class InterviewScheduleAdmin(admin.ModelAdmin):
    list_display = ('candidate', 'interviewer', 'date', 'time', 'status')
    list_filter = ('status', 'date')
