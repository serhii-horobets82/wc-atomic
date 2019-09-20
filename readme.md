




publish to registry:
npm publish




{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            'useBuiltIns': 'entry',
                            targets: {ie: '11'}
                        }]]
                    }
                }
            }

npm install --no-bin-links