module.exports = {
    bail: 1,
    testEnvironment: "node",
    testMatch: ["**/tests/**/*.test.ts"],
    clearMocks: true,
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom: ["src/entities/**/*.ts"],
    coverageDirectory: "tests/coverage"
};