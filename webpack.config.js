const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/i,
        use: ["babel-loader"],
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  ["postcss-preset-env", { browsers: "last 2 versions" }],
                ],
              },
              sourceMap: true,
            },
          },
          "sass-loader",
        ],
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/i,
      //   loader: "file-loader",
      //   options: {
      //     outputPath: "img",
      //     name(imgFullName) {
      //       const dirRelativeToImg = path.relative(
      //         path.join(__dirname, "src", "img"),
      //         path.dirname(imgFullName)
      //       );
      //       return dirRelativeToImg
      //         ? `${dirRelativeToImg}/[name].[ext]`
      //         : "[name].[ext]";
      //     },
      //   },
      // },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.join(__dirname, "src", "img"),
    //       to: `img`,
    //     },
    //   ],
    // }),
  ],
  devServer: {
    // hot: true,
    overlay: true,
  },
};
