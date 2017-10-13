const CleanCSS = require('clean-css');
const uncss = require('uncss');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const cssFiles = [
    'bulma.css',
    'fonts.css',
    'normalize.css',
    'main.css'
].map(name => path.join(PUBLIC_DIR, 'css', name));


const cleanStyles = css => new CleanCSS({
    rebase: false,
    returnPromise: true
}).minify(css);

const asyncUncss = (html, options) => new Promise((resolve, reject) => {
    return uncss(html, options, (error, output) => {
        if (error) {
            return reject(error);
        }

        return resolve(output);
    })
});

const minifyFiles = (names, output) => cleanStyles(names)
    .then(data => {
        fs.writeFileSync(path.join(PUBLIC_DIR, 'css', output), data.styles);
        return data.styles;
    });

const createCriticalCSS = (rawHTML, cssFilenames) => asyncUncss(html, {
        stylesheets: cssFilenames
    }).then(cleanStyles)
    .then(data => data.styles);


minifyFiles(cssFiles, 'build.min.css')
    .then(styles => {
        const htmlFile = path.join(PUBLIC_DIR, 'index.html');
        const cssFile = path.join(PUBLIC_DIR, 'css', 'build.min.css');
        const rawHTML = fs.readFileSync(htmlFile).toString();

        return createCriticalCSS(rawHTML, [cssFile]);
    })
    .then(criticalStyles => {
        fs.writeFileSync(path.join(PUBLIC_DIR, 'css', 'core.min.css'), criticalStyles)
    })
    .catch(error => {
        console.log('Error while minifying files', error);
    });
