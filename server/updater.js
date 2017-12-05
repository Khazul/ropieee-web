"use strict";

const spawnSync = require('child_process').spawnSync;
const spawn = require('child_process').spawn;
const fs = require('fs');
const UPDATE_INTERVAL = 60 * 60 * 1000; // check every hour when in manual mode
var state = {};



module.exports = {

   get_current_version: function() {
      try {
         var buffer = fs.readFileSync('/etc/ropieee_version', 'utf8').toString();
      } catch (err) {
         // something went wrong
	 console.log('version file not found!');
	 return;
      }

      state.version = buffer.slice(0, buffer.length - 1);
      //state.version = buffer;
      //console.log('current RoPieee version = ' + buffer);
   },

   get_updates: function(callback) {
      console.log("debug: get_updates...");

      const updates = spawn('/opt/RoPieee/sbin/run-updates', ['']);

      updates.stdout.on('data', (data) => {
         state.update_log += data;
      });

      updates.on('close', (code) => {
         console.log("get_updates finished with exit code: " + code);
	 callback(code);
      });
   },

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
   },

   check_for_updates: function() {
      console.log("debug: check_for_updates: " + state.update_interval);
      if (state.update_interval != 'manual') return;
      if (state.update_busy == true) return;

      const checker = spawn('/opt/RoPieee/lib/check_for_updates', ['']);

      checker.on('close', (code) => {
         console.log("check_for_updates finished with exit code: " + code);
         if (code == 0) state.update_available = true;
      });
   },

   init_updates: function(arg) {

      state = arg;

      // let's see what the current version is
      module.exports.get_current_version();
	
      // start timer for interval check
      setInterval(module.exports.check_for_updates, UPDATE_INTERVAL);

      // and do a first check
      module.exports.check_for_updates();
   }
};

