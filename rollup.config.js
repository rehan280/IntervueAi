/** @type {import('rollup').RollupOptions} */
export default {
  external: ['@rollup/rollup-linux-x64-gnu'],
  onwarn(warning, warn) {
    // Suppress warnings about missing optional dependencies
    if (warning.code === 'UNRESOLVED_IMPORT' && 
        warning.source && 
        warning.source.includes('@rollup/rollup-linux-x64-gnu')) {
      return;
    }
    warn(warning);
  }
}; 