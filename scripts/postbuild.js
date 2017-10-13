const path = require('path');
const fs = require('fs');

const utils = require('./utils');

const {
    inlineSources,
    copySubdirectories,
    removeDir
} = utils;

const BUILD_DIR = path.join(__dirname, '..', 'build');
const PUBLIC_DIR = path.join(__dirname, '..');

const HTML_FILE_SOURCE = path.join(BUILD_DIR, 'index.html');
const CORE_CSS_SOURCE = path.join(BUILD_DIR, 'css', 'core.min.css');


// inline core css to speed up the paint time
const options = {
    '<core-styles/>': `<style>${fs.readFileSync(CORE_CSS_SOURCE).toString()}</style>`
};

console.log('post build process');
inlineSources(HTML_FILE_SOURCE, options);

// move build files from build folder to public polder
console.log('Moving build files into public folder.');
copySubdirectories(BUILD_DIR, PUBLIC_DIR)
    .then(() => {
        console.log('Removing build folder');
        return removeDir(BUILD_DIR);
    })
    .then(() => console.log('postbuild DONE'))
    .catch(error => console.log('Error while moving build files', error));
