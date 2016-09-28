const testContext = require.context('../test', true, /\.*(browser|node).ts(x?)$/); // make sure you have your directory and regex test set correctly!
testContext.keys().map(testContext);