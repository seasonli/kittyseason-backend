/**
 * @fileoverview Logger
 * @author SeasonLi | season.chopsticks@gmail.com
 * @version 1.0 | 2015-02-23 | SeasonLi    // Initial version
 */

var log4js = require('log4js');


log4js.configure({
  appenders: [{
    type: 'console'
  }],
  replaceConsole: true
});


module.exports = log4js.getLogger('logger');