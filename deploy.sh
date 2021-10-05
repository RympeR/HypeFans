cd /var/www/HypeFans/
source venv/bin/activate
git pull
python manage.py makemigrations
python manage.py migrate.py
supervisorctl restart all