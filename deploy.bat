cd frontend
yarn build
rmdir -r ../build
mv -Force build ../build
cd ..
python .\manage.py collectstatic --no-input
git add .
git commit -am "minor chat rebuild"
git push origin main