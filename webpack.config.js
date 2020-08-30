const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = (env) => {
	const isProduction = env === "production";

	return {
		entry: ["./src/app.js"],
		output: {
			path: path.join(__dirname, "public", "dist"),
			filename: "bundle.js"
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: "babel-loader",
					exclude: /node_modules/
				},
				{
					test: /\.(png|svg)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]",
								useRelativePaths: true
							}
						}
					]
				},
				{
					test: /\.s?css$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader
						},
						{
							loader: "css-loader",
							options: {
								sourceMap: true
							}
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap: true
							}
						}
					]
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "styles.css"
			})
			// new CompressionPlugin({
			// 	filename: "[path].gz[query]"
			// }),
			// new UglifyJsPlugin()
		],
		devtool: isProduction ? "source-map" : "inline-source-map",
		devServer: {
			contentBase: path.join(__dirname, "public"),
			historyApiFallback: true,
			publicPath: "/dist/"
		},
		resolve: {
			alias: {
				"jquery-ui": "jquery-ui-dist/jquery-ui.js"
			}
		}
		// optimization: {
		// 	minimize: true,
		// 	minimizer: [
		// 		new UglifyJsPlugin({
		// 			include: /\.min\.js$/
		// 		})
		// 	]
		// minimize: true
		// splitChunks: {
		// 	cacheGroups: {
		// 		commons: {
		// 			test: /[\\/]node_modules[\\/]/,
		// 			name: "vendors",
		// 			chunks: "all"
		// 		}
		// 	}
		// }
		// }
	};
};
