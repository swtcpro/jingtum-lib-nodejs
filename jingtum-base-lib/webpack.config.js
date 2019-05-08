const path = require('path');
const pkg = require('./package.json');

module.exports = {
	mode: "development",
	cache: false,
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true
	},
	entry: "./index.js",
	output: {
		library: "jingtum_base_lib",
		path: path.resolve(__dirname, "dist"),
		filename: ["jingtum-base-", ".js"].join(pkg.version)
	}
};
