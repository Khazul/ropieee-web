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

  write: function(hostname, reboottime) {
     var p = {}
     p.rp_hostname = hostname;
     p.rp_reboottime = reboottime;

     console.log('config:write: writing to ' + SETTINGS_WRITE);
     fs.writeFileSync(SETTINGS_WRITE, ini.stringify(p, {}));
  }
};
