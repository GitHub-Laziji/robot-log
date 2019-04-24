const Controller = require('egg').Controller;
const request = require("superagent");
const cheerio = require('cheerio');
const Promise = require("bluebird");
const vm = require('vm');
const Database = require("../common/database");
const GeneralDate = require("../common/date");
const CommonUtils = require("../common/utils");

const Segment = require('segment');
const segment = new Segment();
segment.useDefault();


const ELEMENT_FLAG = {
  "1.0": {
    commits: "li[class='commit flex-row js-toggle-container']",
    title: "a[class='commit-row-message item-title']",
    time: "time[class='js-timeago']",
    author: "a[class='commit-author-link has-tooltip']"
  },
  "2.0": {
    commits: "li[class='commit flex-row js-toggle-container']",
    title: "a[class='commit-row-message item-title']",
    time: "time[class='js-timeago']",
    author: "a[class='commit-author-link js-user-link']"
  }
};

const DEFAULT_VERSION = "2.0";



class HomeController extends Controller {


  async day() {
    if (!this.ctx.session.user) {
      this.ctx.redirect('/login');
      return;
    }
    let logs = await this.getCommits(0, this.ctx.query.limit || 40);
    await this.ctx.render('day-log.tpl', {
      logs: logs,
      user: this.ctx.session.user
    });
  }

  async week() {
    if (!this.ctx.session.user) {
      this.ctx.redirect('/login');
      return;
    }

    let dayLogs = await this.getCommits(0, this.ctx.query.limit || 40);
    let logs = [];
    let today = new GeneralDate();
    for (let dayLog of dayLogs) {
      if (dayLog.weekNumber < today.getWeekNumber() && dayLog.date < today.getDate()) {
        logs.push(...dayLog.list);
      }
    }
    // console.log(segment.doSegment(CommonUtils.htmlDecode(item.title)));
    await this.ctx.render('week-log.tpl', {
      endDate: today.getDate(),
      startDate: new GeneralDate(new Date().getTime() - today.getWeekNumber() * 60 * 60 * 24 * 1000).getDate(),
      logs: logs,
      user: this.ctx.session.user
    });
  }

  async getCommits(offset = 0, limit = 40) {
    let db = new Database();
    await db.connect();
    let result = await db.get("select * from config where user_id=?", [this.ctx.session.user.id]);
    return new Promise((resolve, reject) => {
      request.get(`${result.base_url}/commits/${result.branch}?limit=${limit}&offset=${offset}`).end((_, res) => {

        const $ = cheerio.load(res.text);
        const elementFlag = ELEMENT_FLAG[result.version] || ELEMENT_FLAG[DEFAULT_VERSION];
        let commits = $(elementFlag.commits);
        let tempList = [];
        for (let i = 0; i < commits.length; i++) {
          let li = $(commits[i]);
          let title = $(li.find(elementFlag.title)[0]);
          let time = $(li.find(elementFlag.time)[0]);
          let author = $(li.find(elementFlag.author)[0]);
          tempList.push({
            title: title.html(),
            time: new GeneralDate(time.attr("datetime")),
            author: author.text()
          });
        }
        tempList = tempList.sort((a, b) => {
          return a.time.toLocal() > b.time.toLocal() ? -1 : 1;
        });
        let list = [];
        for (let item of tempList) {
          if (/^Merge /.test(item.title)) {
            continue;
          }
          if (result.author !== '*' && item.author !== result.author) {
            continue;
          }
          let length = list.length;
          if (length && item.title == list[length - 1].title) {
            continue;
          }

          let data = {
            startDate: null,
            startTime: null,
            endDate: item.time.getDate(),
            endTime: item.time.getTime(),
            title: item.title,
            author: item.author
          }
          if (length && list[length - 1].endDate === data.endDate) {
            list[length - 1].startDate = data.endDate;
            list[length - 1].startTime = data.endTime;
          }
          list.push(data);

        }
        let tempLogs = {};

        for (let item of list) {
          if (!tempLogs[item.endDate]) {
            tempLogs[item.endDate] = [];
          }
          tempLogs[item.endDate].push({
            data: item,
            value: this.getValue(item, result.format)
          });
        }

        let logs = [];
        for (let key in tempLogs) {
          tempLogs[key] = tempLogs[key].sort((a, b) => {
            return a.data.endTime < b.data.endTime ? -1 : 1;
          });
        }
        for (let key in tempLogs) {
          let date = new GeneralDate(key);
          logs.push({
            date: key,
            week: date.getWeek(),
            weekNumber: date.getWeekNumber(),
            list: tempLogs[key]
          })
        }
        resolve(logs);
      });
    });
  }

  getValue(data, format) {
    vm.createContext(data);
    return vm.runInContext("`" + format + "`", data);
  }
}

module.exports = HomeController;
