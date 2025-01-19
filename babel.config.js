module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@': './src',
      },
    }],
    'inline-dotenv',
    'react-native-reanimated/plugin',
  ],
};
