/* eslint-disable */

var path = require('path')
var cooking = require('cooking')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var config = {
    entry: {
        app: './src/index.js',
        vendor: [ 'react', 'react-addons-css-transition-group', 'react-dom', 'dva', './src/polyfill']
    },
    dist: './dist/static',
    template: [{
        filename: 'index.html',
        template: 'src/template/index.html'
    }],
    externals: {
        'jquery': 'jQuery'
    },
    devServer: {
        port: 8080,
        publicPath: '/',
        proxy: {
            '/api/**': {
                target: 'http://localhost:3000/',
                secure: false,
                changeOrigin: true
            }
        }
    },

    // production
    clean: true,
    hash: true,
    sourceMap: false,
    publicPath: '/static/',
    assetsPath: 'images',
    urlLoaderLimit: 10000,
    extractCSS: 'css/[name].[contenthash:7].css',
    extends: ['react', 'babel', 'less', ]
}

if (process.env.NODE_ENV === 'production') {
    config.template = [{
        filename: '../index.html',
        template: 'src/template/index.html',
        chunks: ['manifest', 'vendor', 'app']
    }]
} else {
    config.template = [{
        filename: 'index.html',
        template: 'src/template/index.html',
        chunks: ['vendor', 'app']
    }]
}

cooking.set(config)

cooking.add('resolve.alias', {
    'src': path.join(__dirname, 'src'),
    "alias-store": path.join(__dirname, "src/store"),
    "alias-store-actions": path.join(__dirname, "src/store/actions"),
    "alias-store-reducers": path.join(__dirname, "src/store/reducers"),
    "alias-api": path.join(__dirname, "src/api")
})
cooking.add('resolve.extensions', ['.js', '.jsx'])
cooking.add('plugin.ProvidePlugin', new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'}))

if (process.env.NODE_ENV === 'production') {
    cooking.add('output.filename', 'js/[name].[chunkhash:7].js')
    cooking.add('output.chunkFilename', 'js/[id].[chunkhash:7].js')
    cooking.add('plugin.CommonsChunk1', new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module, count) {
            return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf('node_modules') > 0)
        }
    }))
    cooking.add('plugin.CommonsChunk2', new webpack.optimize.CommonsChunkPlugin({name: 'manifest', chunks: ['vendor']}))
    cooking.add('plugin.CopyWebpackPlugin', new CopyWebpackPlugin([{
        from: 'favicon.ico',
        to: path.join(__dirname, 'dist')
    }, {
        from: 'static/editor.md/**/*',
        to: path.join(__dirname, 'dist')
    }]))
} else {
    cooking.add('plugin.CommonsChunk', new webpack.optimize.CommonsChunkPlugin({
        names: ["vendor"]
    }))
}

module.exports = cooking.resolve()
