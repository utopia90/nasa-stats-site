const { withModuleFederation } = require('@module-federation/nextjs-mf');

module.exports = withModuleFederation()({
  name: 'app',
  filename: 'static/runtime/remoteEntry.js',
  exposes: {
    webpack5: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'analytics', 
      filename: 'remoteEntry.js', // Output file for the federated module
      exposes: {
        './Analytics': './federated/analytics.js', // Path to the federated module file
      },
    }),
  ],

  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
});
