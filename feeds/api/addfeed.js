/**
 * @fileoverview getlatestfeeds
 * @author SeasonLi | season.chopsticks@gmail.com
 * @version 1.0 | 2015-02-19 | SeasonLi    // Initial version
 */

var mysqlCon = require('../../dbCon/mysqlCon.js'),
  timeFormater = require('folivora/util/timeFormater.js');


module.exports = function (req, res) {
  var content = req.body.content || '',
    type = /1|2/.test(req.body.type) ? req.body.type : 1,
    occurtime = '';

  if (content) {
    var conditionArr = [];
    conditionArr.push('content = "' + content + '"');
    conditionArr.push('type = ' + type);

    var conditionStr = conditionArr.join(' , ');

    var query = 'INSERT INTO kittyseason_feeds SET ' + conditionStr + ';';

    mysqlCon.query(query, function (err, rows, fields) {
      if (err) {
        throw err;
      }
      var resData = {
        errno: 0
      };
      res.json(resData);
    });
  } else {
    res.json({
      errno: 10001,
      errMsg: 'Illigal params'
    });
  }
};