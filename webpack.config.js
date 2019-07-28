{
    entry: {
        app'./src/main.ts'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
            alias: {
            '@': resolve('src');
        }
    },
    module: {
        rules: {
            {
                test: /\.ts$/,
                    exclude: /node_modules/,
                        enforce: 'pre',
                            loader: 'tslint-loader'
            },
            {
                test: /\.tsx?$/,
                    loader: 'ts-loader',
                        exclude: /node_modules/,
                            options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            }
        }
    }
}