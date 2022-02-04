cd frontend
yarn build
rmdir -r ../build
mv -Force build ../build
cd ..
python .\manage.py collectstatic --no-input