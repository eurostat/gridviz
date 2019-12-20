const karmaConfig = require('@eui/tools/karma/karma.conf');

module.exports = function (config) {
    config.set(
        karmaConfig.get(config)
    );
}
