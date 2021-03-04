'use strict';

const { Engine } = require('json-rules-engine');

const engine = new Engine();
const Logger = use('Logger');
const _ = use('lodash');

class RulesEngineRunner {
  async rulesEngineRunner (loanRule, facts) {
    let engineEvaluationResult = {};

    try {
      loanRule.forEach(rule => engine.addRule(rule));
      engineEvaluationResult = await engine.run(facts);
    } catch (err) {
      Logger.warning(`RulesEngineRunnerr: Error executing the rules engine due to → '${err.stack}`);
    }

    return _.get(_.get(engineEvaluationResult, 'events', []).shift(), 'params', {});
  }
}

module.exports = RulesEngineRunner;
