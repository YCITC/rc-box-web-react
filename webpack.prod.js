const path = require('path');
const devConfig = require('./webpack.config.js')

let dist = "../iot-server/frontend";
module.exports = {
  ...devConfig,
  mode: 'production',
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, dist),
  },
};
