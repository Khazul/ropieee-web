"use strict";

//var fs = require('fs');
//var ini = require('ini');

//const SETTINGS_READ = process.env.NODE_SETTINGS || './settings.ini';
//const SETTINGS_WRITE = "./settings.ini.new";
const spawnSync = require('child_process').spawnSync;



module.exports = {

   get_next_update: function() {
      var ret_str='';
      var systemctl = spawnSync('/usr/bin/systemctl', ['list-timers', 'ropieee-update.timer']);

      var s = String(systemctl.stdout);
      var arr = s.split('\n').map(function (val) {
         if (val.indexOf('ropieee-update.timer') > -1) {
	    var next_time = val.split('  ');
	    //console.log("debug: " + next_time[0]);
	    return next_time[0];
	 }
      });

      if (arr[1] != undefined) ret_str = arr[1];
      //console.log("ok en hier dan: " + ret_str);

      return ret_str;
   }
};

