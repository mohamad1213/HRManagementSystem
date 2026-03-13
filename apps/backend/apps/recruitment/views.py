from rest_framework import viewsets, permissions
from .models import JobPosting, Candidate, InterviewSchedule
from .serializers import JobPostingSerializer, CandidateSerializer, InterviewScheduleSerializer

class JobPostingViewSet(viewsets.ModelViewSet):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['status', 'department']
    search_fields = ['title', 'description']

class CandidateViewSet(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['job', 'pipeline_stage']
    search_fields = ['name', 'email']

class InterviewScheduleViewSet(viewsets.ModelViewSet):
    queryset = InterviewSchedule.objects.all()
    serializer_class = InterviewScheduleSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['status', 'date']
