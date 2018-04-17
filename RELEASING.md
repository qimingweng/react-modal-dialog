# This file documents how to release this package to npm, it is for internal use but can also be somewhat interesting

1. Make sure we are on the master branch
  1. git checkout master
1. Try building the site
  1. Go cd react-modal-dialog/site
  1. npm install && npm start
1. Try building the component
  1. npm start
1. Update version with proper semver
  1. npm version (major|minor|patch)
1. Publish
  1. npm publish
1. Push to Github
  1. git push
1. Update website
  1. Make sure dependencies exist for updating the website (a second repo in the same parent folder, etc...)
  1. npm run github
