const path = require("path");

module.exports = {
	mode: "production",
	entry: path.resolve(__dirname + "/scripts", "app.js"),
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	devServer: {
		port: 3333,
		publicPath: "/dist/",
		compress: true,
	},
};
