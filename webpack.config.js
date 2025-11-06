/**
 * Custom Webpack Configuration for the 'plugin' Remote.
 *
 * This configuration is necessary to fix a Webpack 5+ module parsing error
 * when using the Native Federation builder in certain Angular CLI versions.
 * The error occurs because the Native Federation runtime files (which are
 * pure ES modules) are being incorrectly processed by Angular's default loaders.
 * * NOTE: The configuration is now exported as a function to ensure it's properly
 * loaded and merged by the Native Federation builder.
 */
module.exports = (config, options) => {
  console.log("--- DEBUG: Custom plugin/webpack.config.js is being loaded (Function Export) ---");

  // Add the specific rule to treat Native Federation runtime files as pure JavaScript modules.
  config.module.rules.push(
    {
      // Target JavaScript files inside the problematic Native Federation and SoftArc runtime packages.
      test: /\.js$/,
      include: [
        /node_modules[\\/]@angular-architects[\\/]native-federation/,
        /node_modules[\\/]@softarc[\\/]native-federation-runtime/
      ],
      // Tell Webpack to process these files as plain JavaScript modules,
      // which prevents the build pipeline from incorrectly attempting to parse
      // their ES module syntax (`import`/`export`) as a different module type.
      type: 'javascript/auto'
    }
  );

  return config;
};