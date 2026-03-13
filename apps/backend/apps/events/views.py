from rest_framework import viewsets, permissions
from .models import Event
from .serializers import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['priority', 'event_date']
    search_fields = ['title']

    def perform_create(self, serializer):
        if hasattr(self.request.user, 'employee_profile'):
             serializer.save(created_by=self.request.user.employee_profile)
