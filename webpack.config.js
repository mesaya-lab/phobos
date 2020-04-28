const path = require('path')

module.exports = {
	entry: path.resolve(__dirname, 'resources/scripts/index.js'),
	mode: 'production',
	output: {
		filename: 'phobos.js',
		path: path.resolve(__dirname, 'distribution')
	},
	target: 'node',
	watch: true
}
