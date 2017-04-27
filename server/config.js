var fs = require('fs');
var ini = require('ini');

const SETTINGS_READ = process.env.NODE_SETTINGS || './settings.ini';
const SETTINGS_WRITE = "./settings.ini.new";

module.exports = {
  read: function() {
     var out = {}
     console.log('config:read: reading from ' + SETTINGS_READ);
     out = ini.parse(fs.readFileSync(SETTINGS_READ, 'utf-8'));
     console.dir(Object.keys(out));

     return out
  },

  write: function(hostname, reboottime, audio) {
     var p = {}
     p.rp_hostname = hostname;
     p.rp_reboottime = reboottime;
     p.rp_audio = audio;

     var tmpfile = fs.mkdtempSync('/tmp/ropieee');

     console.log('tmpfile = ' + tmpfile);
     tmpfile = tmpfile + '/settings.ini';
     console.log('config:write: writing to ' + tmpfile);

     fs.writeFileSync(tmpfile, ini.stringify(p, {}));

     return tmpfile;
  }
};
