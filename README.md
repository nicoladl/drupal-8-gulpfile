# Drupal 8 Gulpfile

![Drupal 8 Gulpfile](https://github.com/nicoladl/drupal-8-gulpfile/blob/develop/logo.jpg)

Starter Gulpfile for a Drupal 8 project

## Folder structure

```
├── docroot
├── script
├── config
└── client
    ├── scss
    |   └── style.scss
    |   └── components
    |       └── components.scss
    ├── js
    |    ├── app.js
    |    └── modules
    |        └── components.js
    |
    └── images
    └── gulpfile.js
    └── package.json
```


**docroot** contains Drupal 8 index.

**script** and **config** contians Drupal 8 scripts and config folders.

**client** contains Assets and gulpfile folders.

Gulpfile is placed in this folder and works with these assets. All compiled files is placed inside docroot folders

```
└── docroot
    └── themes
        └── custom
            └── [THEME_NAME]
```

## task

```gulp watch```
compile assets and watch for new edit on these files

```gulp default```
compile assets
