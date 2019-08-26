module.exports = {
    entry: "./app.js",
    output: {
        path: 'D:\\etl_website\\etl_front_vue_cli\\dist',
        filename: '/static/js/[name].[contenthash:8].js',
        publicPath: '/',
        chunkFilename: '/static/js/[name].[contenthash:8].js'
    },
    plugins: [new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery',
        Tether: 'tether'
    })]
}