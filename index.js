'use strict';

const Mocha = require('mocha');
var Base = require('mocha/lib/reporters/base');

const {
    EVENT_RUN_END,
} = Mocha.Runner.constants;

class AssertionCountReporter {
    constructor(runner, options) {
        options = options || {};
        options = options.reporterOptions || {};
        const minAssertionCount = options.minimumAssertionNumber ? options.minimumAssertionNumber : 1;
        const stats = runner.stats;

        runner
            .once(EVENT_RUN_END, () => {
                if (stats.passes < minAssertionCount) {
                    console.log(Base.color('fail', `Project expects at least ${minAssertionCount} assertions! Did you forget a .only somewhere?`));
                    console.log();
                    process.exit(1);
                } else {
                    console.log(`Number of assertions (${stats.passes}) greater than expected (${minAssertionCount})`);
                    console.log()
                }
            });
    }
}

module.exports = AssertionCountReporter;
