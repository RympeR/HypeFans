cd frontend
@REM yarn build:prod
rmdir -r ../build
mv -Force build ../build
cd ..
python .\manage.py collectstatic --no-input