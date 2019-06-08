'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.admin.index);

  router.post('/api/login', controller.login.login);
  router.post('/api/logout', controller.login.logout);
  router.post('/api/sign', controller.login.sign);
  router.get('/api/dayLog', controller.home.day);
  router.get('/api/user', controller.login.user);
  router.get('/api/config', controller.config.get);
  router.post("/api/config", controller.config.update);
  router.put("/api/config", controller.config.update);
};