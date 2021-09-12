const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://ec2-18-215-174-254.compute-1.amazonaws.com:9000",
    token: "a25ec7ad1ab1febb47678bd47d4785000d29d0e8",
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "**/__tests__/**",
      //"sonar.tests": "./src/__tests__", // set up leter with dev team
      "sonar.test.inclusions": "./src/__tests__/**/*.test.tsx,./src/__tests__/**/*.test.ts",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "./reports/test-report.xml",
    },
  },
  () => {},
);