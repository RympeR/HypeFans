cd frontend
yarn build
rmdir -r ../build
mv -Force build ../build
cd ..
git add .
git commit -am "rebuild"
git push origin N/frontend
git checkout main
git pull origin N/frontend
venv/Scripts/activate
python .\manage.py collectstatic --no-input
git add .
git commit -am "main branch rebuild"
git push origin
