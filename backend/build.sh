#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --noinput
python manage.py migrate

# Load demo data once (if products table is empty)
python manage.py shell -c "from products.models import Product; from django.core.management import call_command; import sys; sys.exit(0) if Product.objects.exists() else call_command('loaddata','demo.json')"
