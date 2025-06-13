import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['cli/src'],
  outDir: 'dist',
  format: ['esm'],
  target: 'esnext',
  clean: true,
  sourcemap: true,
  tsconfig: './tsconfig.json',
})
