/* eslint import/no-extraneous-dependencies: 0 */
const postcssCssnext = require('postcss-cssnext');
const postcssNested = require('postcss-nested');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-browser-reporter');
const styleLint = require('stylelint');
const config = require('./src/main/react/src/config/index.js').default;

module.exports = {
    plugins: [
        postcssImport({
            plugins: [
                styleLint(),
                postcssReporter({ clearWarnings: true }),
            ]
        }),

        postcssNested({}),

        postcssCssnext({
            features: {
                customProperties: {
                    variables: config.variables,
                    preserve: true,
                    appendVariables: true
                }
            },
            autoprefixer: {
                browsers: ['last 2 versions', '> 5%']
            }
        })
    ]
};


