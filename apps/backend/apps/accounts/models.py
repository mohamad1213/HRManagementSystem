from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'Admin', _('Admin')
        HR_MANAGER = 'HR Manager', _('HR Manager')
        MANAGER = 'Manager', _('Manager')
        EMPLOYEE = 'Employee', _('Employee')

    class Status(models.TextChoices):
        ACTIVE = 'Active', _('Active')
        INACTIVE = 'Inactive', _('Inactive')

    username = None  # Remove username field
    email = models.EmailField(_('email address'), unique=True)
    
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.EMPLOYEE)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    two_factor_enabled = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class UserPreference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='preference')
    dark_mode = models.BooleanField(default=False)
    theme_color = models.CharField(max_length=20, default='purple')
    email_notifications = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=False)

    def __str__(self):
        return f"Preferences for {self.user.email}"
