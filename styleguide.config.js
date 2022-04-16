module.exports = {
    // set your styleguidist configuration here
    title: 'Vue Components',
    pagePerSection: true,
    tocMode: 'collapse',
    version: '0.1.0',
    usageMode: 'expand',
    sections: [{
            name: 'Components',
            components: 'src/components/**/*.vue'
        },
        {
            name: 'Test',
            content: 'tests/unit/README.md'
        }
    ],
    webpackConfig: {
        // custom config goes here
    },
}