var path = require('path');

module.exports = {
    cache: true,
    entry: './index.jsx',
    output: {
        filename: 'browser-bundle.js'
    },
    module: {
        loaders: [
          {
              test: /(\.jsx|\.js)/,
              loader: 'babel-loader',
              exclude: /(node_modules|bower_components)/,
          }
        ]
    }//,
    //externals: {
    //    'react': 'React',
    //    'react/addons': 'React'
    //}
};

