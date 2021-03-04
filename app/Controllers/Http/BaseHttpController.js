'use strict';

const { OK } = use('http-status');

class BaseHttpController {
  constructor (Manager) {
    this.manager = Manager;
  }

  async index ({ request, response }) {
    const result = await this.manager.manage(request.all(), true);

    return response.status(OK).send(result);
  }
}

module.exports = BaseHttpController;
