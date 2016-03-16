/**
 * @fileoverview Entrance function
 * @author SeasonLi | season.chopsticks@gmail.com
 * @version 1.0 | 2015-01-27 | SeasonLi    // Initial version
 * @version 1.1 | 2015-02-23 | SeasonLi    // Config for different environment
 */

// Core module
var Express = require('express'),
  server = new Express();


// Business module
// Router
var router = require('./router/router.js');


// Do business
// Set global variety
switch (process.argv[3]) {
  case '--local':
    global.conf = {
      web: {
        port: 18080
      },
      mysql: {
        host: 'localhost',
        user: 'root',
        database: 'kittyseason'
      }
    }
    break;
  default:
    global.conf = {
      web: {
        port: 18080
      },
      mysql: {
        host: 'mysql56.rdsmyisnr4q7llx.rds.bj.baidubce.com',
        port: 3306,
        user: 'season',
        password: 'nrqzdhlsc',
        database: 'kittyseason'
      }
    }
    break;
}

// Router middleware
router(server);

// Listen to port
server.listen(global.conf.web.port);