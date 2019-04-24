
class CommonUtils {
  static htmlDecode(value) {
    return unescape(value.replace(/\\u/g, "%u")).replace(/&#(x)?(\w+);/g, ($, $1, $2) => {
      return String.fromCharCode(parseInt($2, $1 ? 16 : 10));
    });
  }
}

module.exports = CommonUtils