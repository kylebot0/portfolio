const path = require('path');

module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            // load which style file you want to import globally
            patterns: [path.resolve(__dirname, './src/styles/_variables.scss')],
        },
    },
    // pages: {
    //     'index': {
    //         entry: './src/pages/Home/main.js',
    //         template: 'public/index.html',
    //         title: 'Home',
    //         chunks: ['chunk-vendors', 'chunk-common', 'index']
    //     },
    //     'about': {
    //         entry: './src/pages/About/main.js',
    //         template: 'public/index.html',
    //         title: 'About',
    //         chunks: ['chunk-vendors', 'chunk-common', 'about']
    //     },
    //     'projects': {
    //         entry: './src/pages/Projects/main.js',
    //         template: 'public/index.html',
    //         title: 'Projects',
    //         chunks: ['chunk-vendors', 'chunk-common', 'about']
    //     }
    // }
};