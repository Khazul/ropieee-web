"use strict";

//var fs = require('fs');
//var ini = require('ini');

//const SETTINGS_READ = process.env.NODE_SETTINGS || './settings.ini';
//const SETTINGS_WRITE = "./settings.ini.new";
const spawnSync = require('child_process').spawnSync;



module.exports = {

   get_next_update: function() {
      console.log('querying systemd for next update time...');
      var systemctl = spawnSync('/usr/bin/systemctl', ['list-timers', 'ropieee-update.timer']);

      var s = String(systemctl.stdout);
      console.log('systemctl output: ' + s );

//      return software;
    }
};

