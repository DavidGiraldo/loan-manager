'use strict';

const Route = use('Route');
const { appName } = use('Adonis/Src/Config').get('app');
const prefixRoot = `api/${appName}`;

Route.get('/health-check', ({ response }) => {
  response.send({ status: 'ok' });
}).prefix(prefixRoot);

Route.post('process-loan-request', 'LoanRequestController.index').validator('LoanRequestValidator')
  .prefix('/ops/')
  .prefix(prefixRoot)
  .middleware('AuthenticationMiddleware');
