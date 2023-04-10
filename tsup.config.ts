import { Options } from 'tsup';

export const tsup: Options = {
  splitting: false,
  clean: true, // clean up the build folder
  dts: true, // generate dts files
  format: ['esm', 'cjs', 'iife'], // generate cjs and esm files
  bundle: true,
  skipNodeModulesBundle: true,
  entryPoints: ['src/index.ts'],
  target: 'es2020',
  outDir: 'build',
  entry: ['src/**/*.ts'], //include all files under src
};
