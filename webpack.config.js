const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        test: /\.svg$/,
        type: "asset/resource",
      },
    ]
  },
  //給devserver的設定
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    historyApiFallback: true,
    // open: true,
    port: 8080,
    proxy: {
      '/api/auth/createUser': 'http://34.80.129.4',
      '/api/auth/login': 'http://localhost:3000',
      '/api/push': 'http://localhost:3000',
      '/api/log': 'http://localhost:3000'
    }
  },
  plugins: [ 
    new CopyPlugin({
      patterns:[
        // 這次的例子中copy to的目標path會基於output.path的路徑之下
        {from: './src/static/index.html', to: './'},

        {from: './src/static/sw.js', to: './'},
        {from: './src/static/favicon.ico', to: './'},

        // 認證domain name 用的
        {from: './src/static/269C527184CD60B9DED8D85751EB32D5.txt', to: './'},
      ]
    })
  ],

};
