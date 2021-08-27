cd /var/www/HypeFans/
source venv/bin/activate
python manage.py makemigrations
python manage.py migrate.py
supervisorctl restart all