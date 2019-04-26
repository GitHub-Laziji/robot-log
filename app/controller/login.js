const Controller = require('egg').Controller;
const Promise = require("bluebird");
const Database = require("../common/database");
const Response = require("../common/response");

class LoginController extends Controller {

  async login() {
    const form = this.ctx.request.body;
    if (!form.username) {
      this.ctx.body = Response.error("用户名为空");
      return;
    }
    const db = new Database();
    await db.connect();
    const user = await db.get('select * from user where username=?', form.username);
    if (!user) {
      this.ctx.body = Response.error("用户不存在");
      return;
    }
    this.ctx.session.user = user;
    this.ctx.body = Response.success(user);
  }

  async sign() {
    const form = this.ctx.request.body;
    if (!form.username) {
      this.ctx.body = Response.error("用户名为空");
      return;
    }
    const db = new Database();
    await db.connect();
    const result = await db.get("select count(*) c from user where username=?", form.username);
    if (result.c) {
      this.ctx.body = Response.error("用户已存在");
      return;
    }
    await db.run("insert into user(username) values(?)", form.username);
    const user = await db.get("select * from user where username=?", form.username);
    await db.run("insert into config(user_id,base_url,branch,author,format) values(?,?,?,?,?)", [
      user.id,
      "https://gitlab.com/xxx/xxx/",
      "master",
      "*",
      "${startTime} ~ ${endTime} ${title}"]);
    this.ctx.session.user = user;
    this.ctx.body = Response.success();
  }
}

module.exports = LoginController;