'use strict';

const { LogicalException } = require('@adonisjs/generic-exceptions');

const Logger = use('Logger');
const { BAD_REQUEST } = use('http-status');
const { appName } = use('Adonis/Src/Config').get('app');
const { LOGGEABLE } = use('App/Constants/ExceptionsCodesConstants');

class BaseException extends LogicalException {
  constructor (incomingData, statusCode = BAD_REQUEST, component) {
    let stringifiedData = incomingData;

    if (typeof incomingData === 'object') {
      stringifiedData = JSON.stringify(incomingData);
    }
    super(stringifiedData, statusCode, component);

    if (LOGGEABLE[statusCode]) {
      Logger.error(`${appName} - component: ${component}, Error BaseException, messages => ${stringifiedData}`);
    }
  }
}

module.exports = BaseException;
