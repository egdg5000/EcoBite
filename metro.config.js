
const { getDefaultConfig } = require('expo/metro-config');

const DefaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
