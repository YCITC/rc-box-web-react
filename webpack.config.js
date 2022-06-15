const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const APIServerConfig = require('./host.config');

let dist = "./dist";
module.exports = {
  mode: 'development', // or 'production'
  entry: {
    main: './src/jsx/index.jsx',
  },
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, dist),
  }, 
  // target: 'node',
  // fallback: {
  //   https: false,
  //   // https: require.resolve('https-browserify'),
  // },
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
          replace: APIServerConfig.development.url +':'+APIServerConfig.development.port,
        }
      }
    ]
  },
  //給devserver的設定
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    historyApiFallback: true,
    open: true,
    port: 8080
  },
  plugins: [ 
    new CopyPlugin({
      patterns:[
        // 這次的例子中copy to的目標path會基於output.path的路徑之下
        {from: './src/static/index.html', to: './'},
        {from: './src/static/sw.js', to: './'},
      ]
    })
  ],

};
