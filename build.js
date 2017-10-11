const CleanCSS = require('clean-css');
const path = require('path');
const fs = require('fs');


const cssFiles = [
    'bulma.css',
    'fonts.css',
    'main.css',
    'normalize.css'
].map(name => path.join(__dirname, 'css', name));


// minify css files
new CleanCSS({
    rebase: false
}).minify(cssFiles, (error, data) => {
    if (error) {
        console.log('e', error);
        return;
    }

    fs.writeFileSync(path.join(__dirname, 'css', 'build.min.css'), data.styles);
});
