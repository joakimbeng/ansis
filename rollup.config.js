import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';
import dts from 'rollup-plugin-dts';

// last ECMA version compatible with node.js 12
const ecma = 2019;

export default [
  {
    input: 'src/index.js',
    output: [
      {
        intro: '/* Auto generated by rollup.\nUse `npm run build` to create new version. */',
        exports: 'named',
        file: './dist/index.js',
        format: 'cjs',
      },
    ],
    plugins: [
      terser({
        ecma,
        compress: {
          ecma,
          passes: 2,
        },
        toplevel: true,
      }),
      copy({
        targets: [
          { src: 'package/package.json', dest: 'dist/' },
          { src: 'README.md', dest: 'dist/' },
          { src: 'LICENSE', dest: 'dist/' },
        ],
      }),
    ],
  },

  {
    input: 'src/index.d.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [
      dts(),
    ],
  },
];
