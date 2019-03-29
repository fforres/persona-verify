const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
  mode: 'production',
  entry: "./src/persona.ts",
  output: {
    filename: "persona.js",
    path: __dirname + "/dist",
    libraryTarget: "umd",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [
      new TsConfigPathsPlugin({
        tsconfig: 'tsconfig.json',
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /(\.jsx?|\.tsx?)$/,
        // Modules are run last to first, so this must be ahead of the typescript loader.
        loader: ['babel-loader', 'awesome-typescript-loader'],
        exclude: /node_modules/,
      },

      // Primarily for third party modules
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },
};
