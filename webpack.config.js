const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
	const isProduction = env === "production";

	// "./src/app.js"
	// "./src/playground/playground.js"
	return {
		entry: ["./src/playground/d3-dijkstra.js"],
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
					test: /\.s?css$/,
					use: [
						MiniCssExtractPlugin.loader,
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
		],
		devtool: isProduction ? "source-map" : "inline-source-map",
		devServer: {
			contentBase: path.join(__dirname, "public"),
			historyApiFallback: true,
			publicPath: "/dist/"
		}
	};
};
