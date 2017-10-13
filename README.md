# angularupgrades.com

Simple css website.

## Before you start implementing

Clone this repository, go to the target folder, run `npm install` and make sure you have node supporting Promises and arrow functions.

We use github pages and **everything in this repository is PUBLIC**.

## New public features

Everything public (images, css, js, ...) should be located in the `public` folder. Custom JS should be located in the `public/js/main.js` file.
(Soon we may move custom JS into the `src` folder)


**Commit your changes alone**, then run `npm run build` and send **build files in a different commit** and write "[build]" into the commit message.
For now, we are commiting and pushing build files, but it would be better if the build files were created at the server machine.


## Build process and optimization

Custom build process, minifying and calculating the core css is done in the `scripts` folder.

## Other folders and files

Every other folder (from `scripts`, `public`, `src`, `node_modules`) is a build copy of the content located in `public` folder.

Files like index.html in the main folder will be replaced at the build time. Please do not modify similar files as you may lost your worken
after you run `npm run build`

## Changing the build folder

This folder structure is messy and we may move to a better solution. If you want to change the build folder change the 
`PUBLIC_DIR` variable in the `scripts/postbuild.js` file. It would be much better and cleaner if it was possible to
change the web public folder to for example `./build`. For now everything is public and `index.html` needs to be located in `.` folder.