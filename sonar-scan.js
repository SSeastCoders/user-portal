const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://54.173.205.226:9000",
    token: "4683c4d964c8f4f8b063b862ea8bcd29114895c2",
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "**/__tests__/**",
      //"sonar.tests": "./src/__tests__", // set up leter with dev team
      "sonar.test.inclusions": "./src/__tests__/**/*.test.tsx,./src/__tests__/**/*.test.ts",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "reports/test-report.xml",
      "sonar.coverage.jacoco.xmlReportPaths": "reports/test-report.xml"
    },
  },
  () => {},
);