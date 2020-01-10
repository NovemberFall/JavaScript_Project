const path = require('path');

module.exports = {
    entry: './scripts/ui.js',
    output: {
        path: path.resolve(__dirname, 'dist/assets/'),
        filename: 'uiAfter.js'
    }
};