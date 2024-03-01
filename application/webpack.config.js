var commonConfig = require('./../common/webpack.config');
var merge = require('webpack-merge');

module.exports = (env, argv) => (
    merge.merge(commonConfig(env, argv), {
    })
);
