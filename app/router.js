'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.admin.index);

  router.post('/api/login', controller.login.login);
  router.post('/api/sign', controller.login.sign);
  router.get('/api/test', controller.login.test);
};