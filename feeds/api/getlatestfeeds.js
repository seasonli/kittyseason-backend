/**
 * @fileoverview getlatestfeeds
 * @author SeasonLi | season.chopsticks@gmail.com
 * @version 1.0 | 2015-02-19 | SeasonLi    // Initial version
 * @version 1.1 | 2015-02-24 | SeasonLi    // Deprecate req.query()
 */

var mysqlCon = require('../../dbCon/mysqlCon.js'),
  timeFormater = require('folivora/util/timeFormater.js');


module.exports = function (req, res) {
  var startTime = req.query.startTime || '20160101',
    count = req.query.count || 10;

  if (startTime || count) {
    var conditionArr = [];

    conditionArr.push('createtime > ' + startTime);

    var conditionStr = conditionArr.join(' AND ');

    var query = 'SELECT * FROM kittyseason_feeds WHERE ' + conditionStr + ' ORDER BY createtime DESC LIMIT ' + count + ';';

    mysqlCon.query(query, function (err, rows, fields) {
      if (err) {
        throw err;
      }
      var resData = {
        errno: 0,
        data: {
          length: rows.length,
          feeds: (function () {
            for (var i in rows) {
              rows[i].createtime = timeFormater.format(rows[i].createtime, 'yyyy-MM-dd HH:mm:ss', 'en');
              rows[i].occurtime = timeFormater.format(rows[i].createtime, 'yyyy-MM-dd HH:mm:ss', 'en');
            }
            return rows;
          })()
        }
      };
      res.json(resData);
    });
  } else {
    res.send({
      errno: 10001,
      errMsg: 'Illigal params',
      data: {
        length: 0,
        feeds: []
      }
    });
  }
};