# Drupal 8 Gulpfile

![Drupal 8 Gulpfile](https://github.com/nicoladl/drupal-8-gulpfile/blob/develop/logo.jpg)

Starter Gulpfile for a Drupal 8 project

## Folder structure

|- docroot
|- script
|- config
|- client
  |- scss
    style.scss
  |- js
    |- modules
    app.js
  |- images
  gulpfile.js
  package.json

### docroot
Drupal 8 index

### script
### config
Drupal scripts and config folders

### client
Assets and gulpfile folders

Gulpfile is placed in this folder and works with these assets. All compiled files is placed inside docroot folders

|- docroot
  |- themes
    |- custom
      |- [THEME_NAME]

## task

'gulp watch'
compile assets and watch for new edit on these files

'gulp default'
compile assets
