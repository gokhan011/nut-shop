"""
WSGI config for nutshop project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nutshop.settings')

# Auto-run migrations and load demo data on startup when enabled.
# This avoids needing a shell on free hosts like Render.
if os.environ.get('AUTO_MIGRATE', '1') == '1':
    try:
        import django
        django.setup()
        from django.core.management import call_command
        call_command('migrate', interactive=False)

        from products.models import Product
        if not Product.objects.exists():
            call_command('loaddata', 'demo.json')
    except Exception as exc:
        # Don't block startup; log and continue.
        print(f'Auto-migrate failed: {exc}')

application = get_wsgi_application()
