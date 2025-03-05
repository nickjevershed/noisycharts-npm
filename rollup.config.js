import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from "@rollup/plugin-terser";

const isDev = !!process.env.ROLLUP_WATCH;
const isProd = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/index.js',
    format: 'umd',
    name: 'NoisyChart'
  },
  {
    file: "dist/index.mjs",
    format: "es" // Generates an ES module file
  }
],
plugins: [
  commonjs(),
  resolve(),
  babel({
    exclude: "node_modules/**"
  }),
  isDev &&
    serve({
      open: true,
      contentBase: ["dist", "test"]
    }),
  isDev &&
    livereload({
      watch: ["dist", "test"]
    }),
    isProd && terser()
].filter(Boolean) // Removes false values from the array
};