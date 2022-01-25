cd frontend
yarn build:prod
cd ..
python .\manage.py collectstatic --no-input
git add .
git commit -am "%1"
git push origin main