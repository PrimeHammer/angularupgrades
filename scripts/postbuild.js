const path = require('path');
const fs = require('fs');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const HTML_FILE_SOURCE = path.join(BUILD_DIR, 'index.html');
const CORE_CSS_SOURCE = path.join(BUILD_DIR, 'css', 'core.min.css');
const IDENTIFIER = '<core-styles></core-styles>';

const html = fs.readFileSync(HTML_FILE_SOURCE).toString();
const css = fs.readFileSync(CORE_CSS_SOURCE).toString();

const createStyleTag = body => `<style>${body}</style>`;

fs.writeFileSync(HTML_FILE_SOURCE, html.replace(IDENTIFIER, createStyleTag(css)));
