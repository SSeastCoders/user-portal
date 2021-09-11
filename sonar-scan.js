const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://ec2-35-169-117-4.compute-1.amazonaws.com:9000",
    token: "91bbacecf268c7a07fe7877f121cbd942fcf1942",
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "**/__tests__/**",
      //"sonar.tests": "./src/__tests__", // set up leter with dev team
      "sonar.test.inclusions": "./src/__tests__/**/*.test.tsx,./src/__tests__/**/*.test.ts",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "reports/test-report.xml",
    },
  },
  () => {},
);