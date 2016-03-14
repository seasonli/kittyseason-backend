/**
 * @fileoverview mysqlCon.js
 * @author SeasonLi | season.chopsticks@gmail.com
 * @version 1.0 | 2015-02-19 | SeasonLi    // Initial version
 */

var mysql = require('mysql');


var mysqlCon = mysql.createConnection(global.conf.mysql);


module.exports = mysqlCon;