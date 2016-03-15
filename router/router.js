/**
 * @fileoverview Router
 * @author SeasonLi | season.chopsticks@gmail.com
 * @version 1.0 | 2015-01-27 | SeasonLi    // Initial version
 * @version 1.1 | 2015-02-23 | SeasonLi    // Set static router
 * @version 1.2 | 2015-02-24 | SeasonLi    // Handle not 2xx router
 */

// Import core module
var fs = require('fs'),
  express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});


// Exports
module.exports = function (server) {
  fs.readFile('./router/router.conf', 'utf-8', function (err, data) {
    // Route app
    var rules_unformated = data.split('\n'),
      rules = {};
    for (var i in rules_unformated) {
      var rule = rules_unformated[i].match(/\S+/g);
      rules['/' + rule[0] + '/'] = rule[1];
    }
    for (var idx in rules) {
      // Eval express
      var exp = eval(idx);

      // Route
      router.all(exp, function (req, res, next) {
        // sub-module path
        var subModPath = req.path.replace(req.route.path, rules[req.route.path]) + '.js';
        if (fs.existsSync(subModPath)) {
          var app = require('../' + subModPath);
          app(req, res);
        } else {
          next();
        }
      });
    }

    // Route static
    router.all(/^\/static\/|^\/module\//, function (req, res, next) {
      var filePath = process.cwd() + '/view' + req.path;
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        next();
      }
    });

    // Route 404
    router.all(/\/\S*/, function (req, res, next) {
      res.status(404).sendFile(process.cwd() + '/view/page/layout/404.html');
    });

    // Route App
    server.use(urlencodedParser);
    server.use(router);
  });
};