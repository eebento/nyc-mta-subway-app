const
  fs = require('fs'),
  path = require('path'),
  rootPath = path.join(__dirname, '/..'),
  FileUtil = {};

/**
 * Asynchronous file reader
 * @param filename the name of the file to be read
 */
FileUtil.readFile = function (filename) {

  return new Promise(function (resolve, reject) {

    fs.readFile(path.join(rootPath, filename), 'utf8', function (err, data) {

      if (err) {

        reject(err);

      } else {

        resolve(data);

      }
    });

  });
}

module.exports = FileUtil;
