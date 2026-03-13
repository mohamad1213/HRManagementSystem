from rest_framework import viewsets, permissions
from .models import PerformanceReview
from .serializers import PerformanceReviewSerializer

class PerformanceReviewViewSet(viewsets.ModelViewSet):
    queryset = PerformanceReview.objects.all()
    serializer_class = PerformanceReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['review_period', 'score']
    ordering_fields = ['review_date', 'score']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'Employee':
            if hasattr(user, 'employee_profile'):
                return PerformanceReview.objects.filter(employee=user.employee_profile)
            return PerformanceReview.objects.none()
        return PerformanceReview.objects.all()
