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

  write: function(hostname, reboottime, audio, audio_usb, timezone, touchscreen_detected, touchscreen_orientation, touchscreen_zone, auto_update) {
     var p = {}
     p.rp_hostname = hostname;
     p.rp_reboottime = reboottime;
     p.rp_auto_update = auto_update;
     p.rp_audio = audio;
     p.rp_audio_usb = audio_usb;
     p.rp_timezone = timezone;
     p.rp_touchscreen_detected = touchscreen_detected;
     p.rp_touchscreen_orientation = touchscreen_orientation;
     zone = '\'' + touchscreen_zone + '\'';
     p.rp_touchscreen_zone = zone;

     var tmpfile = fs.mkdtempSync('/tmp/ropieee');

     console.log('tmpfile = ' + tmpfile);
     tmpfile = tmpfile + '/settings.ini';
     console.log('config:write: writing to ' + tmpfile);

     fs.writeFileSync(tmpfile, ini.stringify(p, {}));

     return tmpfile;
  }
};
