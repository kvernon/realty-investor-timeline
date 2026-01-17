module.exports = () => ({
  autoDetect: true,
  testFramework: {
    // the jest configuration file path
    // (relative to project root)
    configFile: './jest.integation.config.ts',
  },
  debug: true,
  trace: true,
});
