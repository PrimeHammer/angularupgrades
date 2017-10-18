const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');


/**
 * Inline external sources from html
 */
const inlineSources = (htmlSource, sources) => {
    let html = fs.readFileSync(htmlSource).toString();

    Object.entries(sources).forEach(entry => {
        const [key, value] = entry;
        html = html.replace(key, value)
    })


    fs.writeFileSync(htmlSource, html);
};


// fs utils

// returns only names (not absolute)
const _readDir = (name) => new Promise((resolve, reject) => {
    fs.readdir(name, (error, files) => {
        if (error) {
            return reject(error);
        }

        return resolve(files.map(f => f.toString()));
    });
});

const removeDir = name => fsExtra.remove(name);


/**
 * Copy everything inside the `from` folder to folder `to`
 * @param {String} from 
 * @param {String} to 
 */
const copySubdirectories = (from, to) => _readDir(from).then(fileNames => {
    const promises = fileNames
        .map(name => {
            const fullName = path.join(from, name);
            return fsExtra.copy(fullName, path.join(to, name));
        });

    return Promise.all(promises);
});




Object.assign(module.exports, {
    inlineSources,
    copySubdirectories,
    removeDir
});
