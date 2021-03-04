'use strict';

const Logger = use('Logger');
const { UNAUTHORIZED } = use('http-status');
const { LogicalException } = use('@adonisjs/generic-exceptions');
const { appName } = use('Adonis/Src/Config').get('app');

class UnauthorizedException extends LogicalException {
  handle (error, { response, request }) {
    Logger.error(
      '%s - UnauthorizedException - handle: Error %s, data => %j',
      appName, error, request.all(),
    );
    response.status(UNAUTHORIZED).send(error);
  }
}

module.exports = UnauthorizedException;
