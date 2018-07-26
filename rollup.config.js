export default {
  input: 'dist/index.js',
  dest: 'dist/bundles/cd-timer.umd.js',
  sourceMap: true,
  format: 'umd',
  moduleName: 'cd.timer',
  experimentalCodeSplitting: true,
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common'
  }
};