const { composePlugins, withNx } = require('@nx/webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), config => {
	// Update the webpack config as needed here.
	// e.g. `config.plugins.push(new MyPlugin())`
	config.entry = './src/main.ts';
	config.devtool = 'inline-source-map';
	return config;
});
