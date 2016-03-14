/**
 * @fileoverview Router
 * @author SeasonLi | season.chopsticks@gmail.com
 * @version 1.0 | 2015-01-27 | SeasonLi    // Initial version
 * @version 1.1 | 2015-02-23 | SeasonLi    // Set static router
 * @version 1.2 | 2015-02-24 | SeasonLi    // Handle not 2xx router
 */

// Core module
var fs = require('fs'),
  express = require('express'),
  router = express.Router();


// Exports
module.exports = function(server) {
  fs.readFile('./router/router.conf', 'utf-8', function(err, data) {
    // Get rules
    var rules_unformated = data.split('\n'),
      rules = {
        get: []
      };

    // Formate rules
    for (var i in rules_unformated) {
      var rule = rules_unformated[i].match(/\S+/g);
      switch (rule[0]) {
        case 'get':
          rules.get['/' + rule[1] + '/'] = rule[2];
          break;
      }
    }

    // Router
    for (var idx in rules.get) {
      // Eval express
      var exp = eval(idx);

      // Route
      router.get(exp, function(req, res, next) {
        // Get sub-module path
        var subModPath = req.path.replace(req.route.path, rules.get[req.route.path]) + '.js';
        if (fs.existsSync(subModPath)) {
          var app = require('../' + subModPath);
          app(req, res);
        } else {
          next();
        }
      });
    }

    // Static router
    router.get(/^\/static\/|^\/module\//, function(req, res, next) {
      var filePath = process.cwd() + '/view' + req.path;
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        next();
      }
    });

    // Handle 404
    router.get(/\/\S*/, function(req, res, next) {
      res.status(404).sendFile(process.cwd() + '/view/page/layout/404.html');
    });

    // Use router
    server.use(router);
  });
};