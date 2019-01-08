module.exports = {
    mode: 'development',
        resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {test: /\.ts$/, use: [{loader: 'ts-loader'}]}
        ]
    }
}