'use strict';

const { ioc } = require('@adonisjs/fold');

const Logger = use('Logger');
const basicLoanRules = use('App/Rules/BasicLoanRules');

class LoanRequestManager {
  constructor () {
    this.rulesEngineRunner = ioc.make('App/Utilities/RulesEngineRunner');
  }

  async manage (loanRequestData) {
    Logger.info(`LoanRequestManager - manage: Managing loan request → ${JSON.stringify(loanRequestData)}`);

    const {
      tax_id: taxId, business_name: businessName, requested_amount: requestedAmount,
    } = loanRequestData;
    const managedLoanResult = await this.rulesEngineRunner.rulesEngineRunner(
      basicLoanRules, { requestedAmount },
    );

    Logger.warning(`LoanRequestManager - manage: Loan request manage result → ${JSON.stringify(managedLoanResult)}`);

    return {
      tax_id: taxId,
      business_name: businessName,
      requested_amount: requestedAmount,
      managed_loan_result: managedLoanResult,
    };
  }
}

module.exports = LoanRequestManager;
