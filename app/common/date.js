const WEEKS = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

class GeneralDate {
  constructor(date) {
    this.date = date ? new Date(date) : new Date();
  }

  isToday() {
    return new Date().toLocaleDateString() == this.date.toLocaleDateString()
  }

  getDate() {
    let month = this.date.getMonth() + 1;
    month = (month < 10 ? '0' : '') + month;
    let day = this.date.getDate();
    day = (day < 10 ? '0' : '') + day;
    return `${this.date.getFullYear()}-${month}-${day}`;
  }

  getTime() {
    return this.date.toLocaleTimeString();
  }

  getWeek(){
    return WEEKS[this.date.getDay()];
  }

  getWeekNumber(){
    return this.date.getDay();
  }

  toLocal() {
    return this.getDate() + " " + this.date.toLocaleTimeString();
  }
}

module.exports = GeneralDate;