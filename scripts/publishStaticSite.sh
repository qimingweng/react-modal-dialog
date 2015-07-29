cd site
rm -rf build
npm run build-prod

cd .. # root
cd .. # development

cd react-modal-dialog-site
git checkout gh-pages
rm -rf .
cp -R ../react-modal-dialog/site/build/ .

git add -A
git commit -m "Update website"
git push origin gh-pages
