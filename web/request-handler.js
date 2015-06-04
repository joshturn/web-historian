var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === "GET" && req.url === "/") {
    fs.readFile(path.join(archive.paths.siteAssets, '/index.html'), function(err, data){
      if (err) {
        helpers.sendResponse(res, null, err);
      } else {
        helpers.sendResponse(res, data, 200);
      }
    });
  } else if (req.method === "GET") {
    fs.readFile(path.join(archive.paths.archivedSites, req.url), function(err, data) {
      if (err) {
        helpers.sendResponse(res, null, 404);
      } else {
        helpers.sendResponse(res, data, 200);
      }
    });
  } else if (req.method === "POST") {
    fs.readFile(path.join(archive.paths.siteAssets, '/loading.html'), function(err, data) {

      if (err) {
        helpers.sendResponse(res, null, err);
      } else {
        var dataString = '';

        req.on('data', function(data){
          dataString += data;
        });

        req.on('end', function(){

          archive.addUrlToList(dataString);

          // archive.addUrlToList(dataString);
          helpers.sendResponse(res, data, 302);
        });
      }

    });
  }

};
