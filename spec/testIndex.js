const testContext = require.context('./', false, /^.*_test\.js$/);
testContext.keys().forEach(testContext);