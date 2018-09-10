var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: './js/main.js',
     output: {
         path: path.resolve(__dirname, 'public/build'),
         filename: 'main.bundle.js'
     },
     watch : true,
     module: {
         rules: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['@babel/preset-env']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };