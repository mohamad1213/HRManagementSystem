from django.contrib import admin
from .models import Document

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'status', 'uploaded_by', 'uploaded_date')
    list_filter = ('status', 'category')
