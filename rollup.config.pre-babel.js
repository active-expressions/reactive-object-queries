import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
//import * as path from 'path';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
    entry: 'test/**/*.spec.js',
    dest: 'test/temp/pre-babel.js',
    external: ['aexpr-source-transformation-propagation', 'contextjs'],
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs(),
        multiEntry()
    ]
};
