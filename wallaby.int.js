module.exports = () => ({
  autoDetect: true,
  testFramework: {
    // the jest configuration file path
    // (relative to project root)
    configFile: './jest.integation.config.cts',
  },
  debug: true,
  trace: true,
});
