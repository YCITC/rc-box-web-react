const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const APIServerConfig = require('./host.config');

let dist = "../iot-server/client";
module.exports = {
  mode: 'production',
  entry: {
    main: './src/jsx/index.jsx',
  },
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, dist),
  }, 
  //將loader的設定寫在module的rules屬性中
  module: {
    //rules的值是一個陣列可以存放多個loader物件
    rules: [
      { 
        test: /.jsx$/, 
        exclude: /node_modules/, 
        use: { 
          loader: 'babel-loader', 
          options: { 
            presets: [
              '@babel/preset-react',
              '@babel/preset-env',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          } 
        } 
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx$/,
        loader: 'string-replace-loader',
        options: {
          search: '$API',
          replace: APIServerConfig.production.url +':'+APIServerConfig.production.port,
        }
      }

    ]
  },
  plugins: [ 
    new CopyPlugin({
      patterns:[
        // 這次的例子中copy to的目標path會基於output.path的路徑之下
        {from: './src/html/index.html', to: './'},
      ]
    })
  ],

};
