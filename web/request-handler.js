var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === "GET" && req.url === "/") {
    fs.readFile('/Users/student/2015-05-web-historian/web/public/index.html', function(err, data){
      if (err) {
        helpers.sendResponse(res, null, err);
      } else {
        helpers.sendResponse(res, data, 200);
      }
    });
  } else {
    fs.readFile(path.join(archive.paths.archivedSites, req.url), function(err,data) {
      if (err) {
        helpers.sendResponse(res, null, err);
      } else {
        helpers.sendResponse(res, data, 200);
      }
    });
  }
  // res.end(archive.paths.list);
};
