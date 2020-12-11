import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';
import pkg from './package.json';

// eslint-disable-next-line import/no-default-export
export default [
  {
    input: 'src/main.js',
    output: [
      {
        name: 'PhaserLoaderPlugin',
        file: pkg.browser,
        format: 'umd',
        globals: { phaser: 'Phaser' },
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    external: ['phaser'],
    plugins: [
      resolve(),
      commonjs(),
      buble({ exclude: ['node_modules/**'] })
    ]
  }
];
