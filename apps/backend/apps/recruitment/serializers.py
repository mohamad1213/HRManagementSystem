from rest_framework import serializers
from .models import JobPosting, Candidate, InterviewSchedule

class JobPostingSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    
    class Meta:
        model = JobPosting
        fields = '__all__'

class CandidateSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)

    class Meta:
        model = Candidate
        fields = '__all__'

class InterviewScheduleSerializer(serializers.ModelSerializer):
    candidate_name = serializers.CharField(source='candidate.name', read_only=True)
    # Handle optional interviewer gracefully if not present
    interviewer_name = serializers.SerializerMethodField()

    class Meta:
        model = InterviewSchedule
        fields = '__all__'
    
    def get_interviewer_name(self, obj):
        if obj.interviewer and obj.interviewer.user:
            return obj.interviewer.user.get_full_name()
        return None
