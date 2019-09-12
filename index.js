const NodeEnvironment = require('jest-environment-node');
const Allure = require("allure-js-commons");
const stripAnsi = require("strip-ansi")

function formatErrors(allure) {
    allure.suites.forEach(suite => {
        suite.testcases.forEach(test => {
            if (test.failure != undefined) {
                test.failure.message = stripAnsi(test.failure.message)
                test.failure["stack-trace"] = stripAnsi(test.failure["stack-trace"])           
            }
        })
    })
}

class AllureEnvironment extends NodeEnvironment {
    constructor(config, context) {
        super(config, context)
        
    }
    
    async setup() {
        await super.setup();
        this.allure = new Allure();
    }

    async teardown() {
        await super.teardown();
    }

    runscript(script) {
        return super.runScript(script)
    }

    handleTestEvent(event, state) {
        switch (event.name) {
            case 'finish_describe_definition':
                this.allure.startSuite(event.blockName);
                break;
            case 'test_fn_start':
                this.allure.startCase(event.test.name)
                break;
            case 'test_fn_success':
                this.allure.endCase('passed')
                break;
            case 'test_fn_failure':
                this.allure.endCase('failed', event.error)
                break
            case 'run_describe_finish':
                formatErrors(this.allure);
                // Catch error thrown by second describe finish
                try {
                    this.allure.endSuite();
                } catch (error) {
                    if (error.message != "Cannot read property 'end' of undefined") {
                        throw error
                    }
                }
                break
            default:
                break;
        }
    }
}

module.exports = AllureEnvironment
