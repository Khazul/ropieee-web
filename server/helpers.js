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
      return s;
   }

};

