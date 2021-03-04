'use strict';

const Logger = use('Logger');
const BaseExceptionHandler = use('BaseExceptionHandler');
const apm = use('apm-js');
const customExceptionList = [
  'BadRequestException',
  'NotFoundException',
  'UnauthorizedException',
];

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { request, response }) {
    if (customExceptionList.includes(error.name)) {
      return error.handle(error, { request, response });
    }

    return response.status(this.calculateStatus(error))
      .send({ success: false, message: error.message });
  }

  async report (error, { request }) {
    if (!customExceptionList.includes(error.name)) {
      const message = `[ERROR]: ${error.name},
        status => ${this.calculateStatus(error)},
        message => ${JSON.stringify(error.message)},
        stack => ${JSON.stringify(error.stack.replace(/\n|\r/g, ''))},
        request => ${JSON.stringify(this.getRequestData(request))},
        full => ${JSON.stringify(error)}`.replace(/\n/g, '');
      error.message = message;
      Logger.error(message);
      apm.noticeError(error);
    }
  }

  calculateStatus (error) {
    let status = error.statusCode || error.status;
    status = parseInt(status, 10) || 500;

    return status;
  }

  getRequestData (request) {
    const headers = request.headers();
    delete headers.authorization;

    return {
      qs: request.qs,
      body: request.body,
      url: request.url(),
      method: request.method(),
      ip: request.ip(),
      headers,
    };
  }
}

module.exports = ExceptionHandler;
