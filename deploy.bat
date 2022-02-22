cd frontend
yarn build
rmdir -r ../build
mv -Force build ../build
cd ..
python .\manage.py collectstatic --no-input
git add .
git commit -am "minor audio rebuild"
git checkout main
git merge
git push origin