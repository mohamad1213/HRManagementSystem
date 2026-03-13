from django.contrib import admin
from .models import Event, EventMember

class EventMemberInline(admin.TabularInline):
    model = EventMember
    extra = 1

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'event_date', 'start_time', 'priority')
    list_filter = ('priority', 'event_date')
    inlines = [EventMemberInline]
