from django.contrib import admin
from .models import PerformanceReview

@admin.register(PerformanceReview)
class PerformanceReviewAdmin(admin.ModelAdmin):
    list_display = ('employee', 'reviewer', 'review_period', 'score', 'review_date')
    list_filter = ('review_period', 'review_date')
    search_fields = ('employee__user__email',)
