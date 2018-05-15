"use strict";

var fs = require('fs');
var ini = require('ini');

const SETTINGS_READ = process.env.NODE_SETTINGS || './settings.ini';
const SETTINGS_WRITE = "./settings.ini.new";

module.exports = {
  read: function() {
     var out = {}
     console.log('config:read: reading from ' + SETTINGS_READ);
     out = ini.parse(fs.readFileSync(SETTINGS_READ, 'utf-8'));

     return out
  },

  write2: function(obj_settings) {
     var tmpfile = fs.mkdtempSync('/tmp/ropieee');

     console.log('tmpfile = ' + tmpfile);
     tmpfile = tmpfile + '/settings.ini';
     console.log('config:write: writing to ' + tmpfile);

     fs.writeFileSync(tmpfile, ini.stringify(obj_settings, {}));
     return tmpfile;
  },

  write_json: function(obj_settings) {
     var tmpfile = fs.mkdtempSync('/tmp/ropieee');

     console.log('tmpfile = ' + tmpfile);
     tmpfile = tmpfile + '/settings.json';
     console.log('config:write: writing to ' + tmpfile);

     fs.writeFileSync(tmpfile, JSON.stringify(obj_settings, null, 2), 'utf-8');
     return tmpfile;
  }
};

