module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        '@babel/preset-env',
        '@babel/preset-typescript',
    ],
    'env': {
        'test': {
            'presets': [
                [
                    '@babel/preset-env',
                    {
                        'targets': {
                            'node': 8,
                        },
                    }
                ],
            ]
        }
    }
}