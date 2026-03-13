from django.contrib import admin
from .models import PayrollRecord, PayrollElement

class PayrollElementInline(admin.TabularInline):
    model = PayrollElement
    extra = 0

@admin.register(PayrollRecord)
class PayrollRecordAdmin(admin.ModelAdmin):
    list_display = ('employee', 'period_month', 'period_year', 'net_pay', 'status')
    list_filter = ('status', 'period_year', 'period_month')
    search_fields = ('employee__user__email',)
    inlines = [PayrollElementInline]
