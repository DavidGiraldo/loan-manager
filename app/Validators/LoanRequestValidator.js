'use strict';

class LoanRequestValidator {
  get rules () {
    return {
      tax_id: 'required|string',
      business_name: 'required|string',
      requested_amount: 'required|integer',
    };
  }
}

module.exports = LoanRequestValidator;
