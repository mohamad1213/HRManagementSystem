from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UserPreference

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['email', 'role', 'status', 'is_staff', 'is_active']
    list_filter = ['role', 'status', 'is_staff', 'is_active']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role', 'status', 'two_factor_enabled', 'avatar', 'bio')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('role', 'status', 'email')}),
    )
    ordering = ['email']

admin.site.register(User, CustomUserAdmin)
admin.site.register(UserPreference)
