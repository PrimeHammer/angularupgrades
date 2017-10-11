const CleanCSS = require('clean-css');
const path = require('path');
const fs = require('fs');


const cssFiles = [
    'bulma.css',
    'fonts.css',
    'main.css',
    'normalize.css'
].map(name => path.join(__dirname, 'css', name));


const minifyFiles = (names, output) => new CleanCSS({
        rebase: false,
        returnPromise: true
    }).minify(names)
    .then(data => {
        fs.writeFileSync(path.join(__dirname, 'css', output), data.styles);
    });


Promise.all([
    minifyFiles(cssFiles, 'build.min.css')
]).catch(error => {
    console.log('Error while minifying files', error);
})
