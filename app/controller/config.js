const Controller = require('egg').Controller;
const Promise = require("bluebird");
const Database = require("../common/database");
const Response = require("../common/response");

class ConfigController extends Controller {

  async get() {
    let user = this.ctx.session.user;
    if (!user) {
      this.ctx.body = Response.error("");
      return;
    }
    let db = new Database();
    await db.connect();
    let query = this.ctx.query;
    if (JSON.stringify(query) != "{}") {
      db.run("update config set base_url=?,branch=?,author=?,format=?,version=? where id=? and user_id=?", [
        query.baseUrl,
        query.branch,
        query.author,
        query.format,
        query.version,
        query.id,
        user.id]);
    }

    let result = await db.get("select * from config where user_id=?", [user.id]);
    this.ctx.body = Response.success(result);
  }

  async update() {
    let user = this.ctx.session.user;
    if (!user) {
      this.ctx.redirect('/login');
      return;
    }
    let db = new Database();
    await db.connect();
    let query = this.ctx.query;
    if (JSON.stringify(query) != "{}") {
      db.run("update config set base_url=?,branch=?,author=?,format=?,version=? where id=? and user_id=?", [
        query.baseUrl,
        query.branch,
        query.author,
        query.format,
        query.version,
        query.id,
        user.id]);
    }

    let result = await db.get("select * from config where user_id=?", [user.id]);
    this.ctx.body = { config: result, user: user };
  }
}

module.exports = ConfigController;