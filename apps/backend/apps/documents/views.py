from rest_framework import viewsets, permissions
from .models import Document
from .serializers import DocumentSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['status', 'category']
    search_fields = ['name']

    def perform_create(self, serializer):
        file_obj = self.request.data.get('file')
        
        # Auto-fill metadata if not provided
        ext = file_obj.name.split('.')[-1].lower() if file_obj else ''
        filename = file_obj.name if file_obj else ''
        size_bytes = file_obj.size if file_obj else 0
        
        # Human readable size
        if size_bytes < 1024:
            size_str = f"{size_bytes} B"
        elif size_bytes < 1024 * 1024:
            size_str = f"{size_bytes / 1024:.1f} KB"
        else:
            size_str = f"{size_bytes / (1024 * 1024):.1f} MB"

        extra_kwargs = {}
        if not self.request.data.get('filename'):
            extra_kwargs['filename'] = filename
        if not self.request.data.get('file_type'):
            extra_kwargs['file_type'] = ext
        if not self.request.data.get('size'):
            extra_kwargs['size'] = size_str

        if hasattr(self.request.user, 'employee_profile'):
            serializer.save(uploaded_by=self.request.user.employee_profile, **extra_kwargs)
        else:
            serializer.save(**extra_kwargs)
