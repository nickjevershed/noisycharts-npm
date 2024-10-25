import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'NoisyChart'
  },
  plugins: [
    commonjs(),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    serve({
      open: true,
      contentBase: ['dist', 'test']
    }),
    livereload({
      watch: ['dist', 'test']
    })
  ]
};