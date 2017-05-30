import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'test/temp/post-babel.js',
    dest: 'test/temp/out.js',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs({
            // non-CommonJS modules will be ignored, but you can also
            // specifically include/exclude files
            include: 'node_modules/**',  // Default: undefined
            exclude: [ 'node_modules/aexpr-source-transformation-propagation/**' ],  // Default: undefined

            namedExports: { './module.js': ['foo', 'bar' ] }  // Default: undefined
        })
    ],
    format: 'iife'
};
