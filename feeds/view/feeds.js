/**
 * @fileoverview getlatestfeeds
 * @author SeasonLi | season.chopsticks@gmail.com
 * @version 1.0 | 2016-03-19 | SeasonLi    // Initial version
 */

var engine = require('consolidate').mustache;


module.exports = function (req, res) {
  engine('view/page/index.html', {}, function (err, html) {
    res.send(html);
  });
};