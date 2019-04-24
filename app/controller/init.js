const Controller = require('egg').Controller;
const Database = require("../common/database");

class InitController extends Controller {
  async index() {
    let db = new Database();
    
    await db.connect();
    
    await db.run(`CREATE TABLE config (
      id integer PRIMARY KEY autoincrement,
      user_id integer not null,
      base_url text not null,
      branch text not null,
      author text not null,
      format text not null
    )`);

    await db.run(`CREATE TABLE user (
      id integer PRIMARY KEY autoincrement,
      username text not null
    )`);

    this.ctx.body = "Initialization...";
  }
}

module.exports = InitController;