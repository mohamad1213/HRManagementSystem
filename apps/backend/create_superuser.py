import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.accounts.models import User

# Email and Password for Superuser
EMAIL = 'admin@humanizen.co'
PASSWORD = 'admin123'

if not User.objects.filter(email=EMAIL).exists():
    # Use create_superuser which handles password hashing
    User.objects.create_superuser(email=EMAIL, password=PASSWORD)
    print(f'Superuser created: {EMAIL} / {PASSWORD}')
else:
    print('Superuser already exists')
