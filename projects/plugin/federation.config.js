const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'plugin',
  
  exposes: {
    './DownloadModule': './projects/plugin/src/app/download.module.ts',
    './Download': './projects/plugin/src/app/download.component.ts',
    './Upload': './projects/plugin/src/app/upload.component.ts'
  },

  // Fix for 'Cannot read properties of undefined (reading 'split')' error
  shared: {
    // Share all standard Angular dependencies with relaxed version checking for stability
    ...shareAll({
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    }),
  },

  skip: ['rxjs'],

  features: {
    // New feature for more performance and avoiding
    // issues with node libs. Comment this out to
    // get the traditional behavior:
    ignoreUnusedDeps: true
  }
  
});
