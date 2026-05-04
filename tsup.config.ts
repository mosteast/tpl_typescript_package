import { defineConfig } from 'tsup';

export default defineConfig({
  splitting: false,
  clean: true,
  dts: true,
  format: ['esm', 'cjs', 'iife'],
  bundle: true,
  skipNodeModulesBundle: true,
  entry: ['src/index.ts'],
  target: 'es2021',
  outDir: 'build',
});
