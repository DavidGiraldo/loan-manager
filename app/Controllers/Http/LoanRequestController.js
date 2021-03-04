'use strict';

const BaseHttpController = use('App/Controllers/Http/BaseHttpController');

class LoanRequestController extends BaseHttpController {
  static get inject () {
    return ['App/Managers/LoanRequestManager'];
  }
}

module.exports = LoanRequestController;
