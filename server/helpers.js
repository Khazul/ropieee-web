"use strict";

const spawnSync = require('child_process').spawnSync;



module.exports = {
   isEmpty: function(value) {
      return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null || value === 'null';
   },

   get_hardware_model: function() {
      var ret_str='';
      var proc = spawnSync('/opt/RoPieee/lib/get_hardware_model', ['']);

      var s = String(proc.stdout);
	   
      if (module.exports.isEmpty(s)) s = 'unknown';
      return s.trim();
   },


   get_wifi_networks: function(wifi) {
      var ret_str='';
      var proc = spawnSync('/opt/RoPieee/lib/get_wifi_networks', ['']);

      var s = String(proc.stdout);
      var splits = s.split("\n");
      var j = 0;

      for (var i = 0; i < splits.length; i++) {
         if (splits[i].trim() != '') wifi.networks[j++] = splits[i];
      }

      console.log("wifi networks discovered: " + wifi.networks);

      //wifi.networks = splits;
      //var myArray = splits
      //wifi.networks = Array(splits.split(","));
      //console.log("wifi networks 0: " + wifi.networks[0]);
	   
     // if (module.exports.isEmpty(s)) s = 'unknown';
     // return s.trim();
   }


};

