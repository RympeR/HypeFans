cd frontend
yarn build
rmdir -r ../build
rmdir ../build
mv -Force ./build ../build
cd ..
venv\Scripts\activate
python .\manage.py collectstatic --no-input
git add .
git commit -am "main branch rebuild"
git push origin
