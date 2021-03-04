'use strict';

const Logger = use('Logger');
const UnauthorizedException = use('App/Exceptions/UnauthorizedException');
const { appKey } = use('Adonis/Src/Config').get('app');

class AuthenticationMiddleware {
  async handle ({ request }, next) {
    const key = request.header('Authorization');

    if (key && key === appKey) {
      await next();
    } else {
      Logger.error('AuthenticationMiddleware - handle: [Authorization] undefined header');
      throw new UnauthorizedException();
    }
  }
}

module.exports = AuthenticationMiddleware;
