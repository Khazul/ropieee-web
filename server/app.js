"use strict";

const hostname = '0.0.0.0';
const port = process.env.NODE_PORT || 3000;
const env = process.env;
const spawn = require('child_process').spawn;
const spawnSync = require('child_process').spawnSync;
const os = require('os');
const crypto = require('crypto');
const path = require('path');

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var moment = require('moment-timezone');
var clone = require('clone');
var config = require('./config');
var updater = require('./updater');
var helpers = require('./helpers');
var settings = {};

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(morgan('combined'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {

  // first kick off some stuff
  if (wifi.enabled)
     helpers.get_wifi_networks(wifi)

  res.render('general', {
     title: 'Welcome',
     config_rp_hostname: settings.rp_hostname,
     config_rp_reboottime: settings.rp_reboottime,
     config_rp_auto_update: settings.rp_auto_update,
     config_rp_audio: settings.rp_audio,
     config_rp_audio_usb: settings.rp_audio_usb,
     config_rp_hats: hats,
     config_rp_kernel: info.kernel,
     config_rp_this_hostname: info.hostname,
     config_rp_timezone: info.timezone,
     config_rp_timezone_set: settings.rp_timezone,
     config_rp_touchscreen_detected: settings.rp_touchscreen_detected,
     config_rp_touchscreen_orientation: settings.rp_touchscreen_orientation,
     config_rp_touchscreen_zone: settings.rp_touchscreen_zone,
     config_rp_repo: settings.rp_repo,
     config_rp_needs_reboot: state.needs_reboot,
     config_rp_update_available: state.update_available,
     config_rp_update_busy: state.update_busy,
     config_rp_version: state.version
  });
});

app.get('/display', function(req, res) {
  res.render('display', {
     title: 'Welcome',
     config_rp_hostname: settings.rp_hostname,
     config_rp_reboottime: settings.rp_reboottime,
     config_rp_auto_update: settings.rp_auto_update,
     config_rp_audio: settings.rp_audio,
     config_rp_audio_usb: settings.rp_audio_usb,
     config_rp_hats: hats,
     config_rp_kernel: info.kernel,
     config_rp_this_hostname: info.hostname,
     config_rp_timezone: info.timezone,
     config_rp_timezone_set: settings.rp_timezone,
     config_rp_touchscreen_detected: settings.rp_touchscreen_detected,
     config_rp_touchscreen_orientation: settings.rp_touchscreen_orientation,
     config_rp_touchscreen_zone: settings.rp_touchscreen_zone,
     config_rp_repo: settings.rp_repo,
     config_rp_needs_reboot: state.needs_reboot,
     config_rp_update_available: state.update_available,
     config_rp_update_busy: state.update_busy,
     config_rp_version: state.version
  });
});

app.get('/network', function(req, res) {
	
  // first kick off some stuff
  if (wifi.enabled)
     helpers.get_wifi_networks(wifi)

  res.render('network', {
     title: 'Welcome',
     config_rp_hostname: settings.rp_hostname,
     config_rp_reboottime: settings.rp_reboottime,
     config_rp_auto_update: settings.rp_auto_update,
     config_rp_audio: settings.rp_audio,
     config_rp_audio_usb: settings.rp_audio_usb,
     config_rp_hats: hats,
     config_rp_kernel: info.kernel,
     config_rp_this_hostname: info.hostname,
     config_rp_timezone: info.timezone,
     config_rp_timezone_set: settings.rp_timezone,
     config_rp_touchscreen_detected: settings.rp_touchscreen_detected,
     config_rp_touchscreen_orientation: settings.rp_touchscreen_orientation,
     config_rp_touchscreen_zone: settings.rp_touchscreen_zone,
     config_rp_repo: settings.rp_repo,
     config_rp_needs_reboot: state.needs_reboot,
     config_rp_update_available: state.update_available,
     config_rp_network_wired_method: settings.rp_network_wired_method,
     config_rp_network_wired_ipaddr: settings.rp_network_wired_ipaddr,
     config_rp_network_wired_netmask: settings.rp_network_wired_netmask,
     config_rp_network_wired_gateway: settings.rp_network_wired_gateway,
     config_rp_network_wireless_enabled: settings.rp_network_wireless_enabled,
     config_rp_network_wireless_essid: settings.rp_network_wireless_essid,
     config_rp_network_wireless_psk: settings.rp_network_wireless_psk,
     config_rp_network_wireless_networks: wifi.networks,
     config_rp_update_busy: state.update_busy,
     config_rp_version: state.version,
     config_rp_hardware: state.hardware
  });
});

app.get('/advanced', function(req, res) {

  // first get the next update time
  var next_update_time = updater.get_next_update();

  res.render('advanced', {
     title: 'Welcome',
     config_rp_hostname: settings.rp_hostname,
     config_rp_reboottime: settings.rp_reboottime,
     config_rp_auto_update: settings.rp_auto_update,
     config_rp_audio: settings.rp_audio,
     config_rp_audio_usb: settings.rp_audio_usb,
     config_rp_hats: hats,
     config_rp_kernel: info.kernel,
     config_rp_this_hostname: info.hostname,
     config_rp_timezone: info.timezone,
     config_rp_timezone_set: settings.rp_timezone,
     config_rp_touchscreen_detected: settings.rp_touchscreen_detected,
     config_rp_touchscreen_orientation: settings.rp_touchscreen_orientation,
     config_rp_touchscreen_zone: settings.rp_touchscreen_zone,
     config_rp_repo: settings.rp_repo,
     config_rp_needs_reboot: state.needs_reboot,
     config_rp_update_available: state.update_available,
     config_rp_next_update_time: next_update_time,
     config_rp_update_busy: state.update_busy,
     config_rp_version: state.version
  });
});

app.get('/start_update', function(req, res) {
   console.log("START UPDATE");
   updater.get_updates(cb_update_finished);
   state.update_busy = true;
   res.redirect('/');
});

app.get('/updater', function(req, res) {
   console.log("DEBUG UPDATER: " + state.update_log);

   if (state.update_interval != 'manual') return;
  
   if (state.update_busy == false) {
      // let's go!
      state.update_busy = true;
   }

   res.render('updater', {
     title: 'Welcome',
     config_rp_this_hostname: info.hostname,
     output_log: state.update_log,
     state: state.update_busy
   });
});

function cb_update_finished(return_code) {
   console.log('update process finished!');

   // we're done.
   state.update_busy = false;

   // when an update is manual, we require a reboot
   state.needs_reboot = true;
}

function query_pacman() {
  console.log('querying pacman for info...');
  var pacman = spawnSync('/usr/bin/pacman', ['-Q']);

  var s = String(pacman.stdout);
  var splits = s.split("\n");

  var software = {};
  var j = 0;
  for (var i = 0; i < splits.length; ++i) {
     if (splits[i].length > 0) {
        var splits2 = splits[i].split(" ");
        software[splits2[0]] = splits2[1];
     }
  }

  return software;
}

app.get('/info', function(req, res) {
  var software_installed = query_pacman();
  var software_list = {};
  software_list['ropieee']               = software_installed['ropieee'];
  software_list['ropieee-version']       = software_installed['ropieee-version'];
  software_list['ropieee-web']           = software_installed['ropieee-web'];
  software_list['linux-raspberrypi-dsd'] = software_installed['linux-raspberrypi-dsd'];

  if (software_installed['qt5-base-ropieee'])        software_list['qt5-base-ropieee']=software_installed['qt5-base-ropieee'];
  if (software_installed['qt5-declarative-ropieee']) software_list['qt5-declarative-ropieee']=software_installed['qt5-declarative-ropieee'];
  if (software_installed['ropieee-remote'])          software_list['ropieee-remote']=software_installed['ropieee-remote'];
  if (software_installed['ropieee-touchui'])         software_list['ropieee-touchui']=software_installed['ropieee-touchui'];

  res.render('info', {
     title: 'Welcome',
     config_rp_touchscreen_detected: settings.rp_touchscreen_detected,
     config_rp_this_hostname: info.hostname,
     config_rp_software: software_list,
     config_rp_needs_reboot: state.needs_reboot,
     config_rp_update_available: state.update_available,
     config_rp_update_busy: state.update_busy,
     config_rp_version: state.version
  });
});

app.post('/submit', function(req, res) {
  console.log('submitting changes for: ' + req.query.config);

  if (typeof req.body.audio_usb === 'undefined') req.body.audio_usb='off'
  if (typeof req.body.wireless_enabled === 'undefined') req.body.wireless_enabled='off'

  if (req.query.config == 'general') {
     console.log('summary for: general');
     console.log('summary:audio: ' + req.body.audio);
     res.render('summary', {
	toggle_rp: 'general',
        config_rp_hostname: req.body.hostname,
	config_rp_audio: req.body.audio,
	config_rp_audio_usb: req.body.audio_usb,
	config_rp_reboottime: req.body.reboottime,
	config_rp_timezone: req.body.timezone,
        config_rp_hat: hats[req.body.audio],
        config_rp_this_hostname: info.hostname

     });
  }

  if (req.query.config == 'display') {
     console.log('summary for: display');
     console.log('summary:orientation: ' + req.body.orientation);
     console.log('summary:zone: ' + req.body.zone);
     res.render('summary', {
	toggle_rp: 'display',
        config_rp_touchscreen_orientation: req.body.orientation,
	config_rp_touchscreen_zone: req.body.zone,
        config_rp_this_hostname: info.hostname
     });
  }

  if (req.query.config == 'network') {
     console.log('summary for: network');
     res.render('summary_network', {
	toggle_rp: 'network',
        config_rp_network_wired_method: req.body.wired_method,
        config_rp_network_wired_ipaddr: req.body.wired_ip_addr,
        config_rp_network_wired_netmask: req.body.wired_netmask,
        config_rp_network_wired_gateway: req.body.wired_gateway,
        config_rp_this_hostname: info.hostname,
        config_rp_hardware: state.hardware,
	config_rp_network_wireless_enabled: req.body.wireless_enabled,
	config_rp_network_wireless_essid: req.body.wireless_essid,
	config_rp_network_wireless_psk: req.body.wireless_psk
     });
  }

  if (req.query.config == 'advanced') {
     console.log('summary for: advanced');
     console.log('summary:advanced: ' + req.body.repo);
     res.render('summary', {
	toggle_rp: 'advanced',
        config_rp_repo: req.body.repo,
        config_rp_auto_update: req.body.auto_update,
        config_rp_this_hostname: info.hostname
     });
  }
});

app.post('/commit', function( req, res) {
   var copy_settings = {};
   console.log('committing changes for: ' + req.query.config);

   // overrule settings for section general
   if (req.query.config == 'general') {
      settings.rp_hostname   = req.body.hostname
      settings.rp_audio      = req.body.audio
      settings.rp_audio_usb  = req.body.audio_usb 
      settings.rp_reboottime = req.body.reboottime 
      settings.rp_timezone   = req.body.timezone 
 
      state.needs_reboot = true;
   }

   // overrule settings for section display
   if (req.query.config == 'display') {
      settings.rp_touchscreen_orientation = req.body.orientation 
      settings.rp_touchscreen_zone = req.body.zone 

      state.needs_reboot = true;
   }

   // overrule settings for section network
   if (req.query.config == 'network') {

      if (typeof req.body.wireless_enabled === 'undefined') req.body.wireless_enabled='off'

      settings.rp_network_wired_method = req.body.wired_method
      settings.rp_network_wired_ipaddr = req.body.wired_ipaddr
      settings.rp_network_wired_netmask = req.body.wired_netmask
      settings.rp_network_wired_gateway = req.body.wired_gateway

      settings.rp_network_wireless_enabled = req.body.wireless_enabled;
      settings.rp_network_wireless_essid = req.body.wireless_essid;
      settings.rp_network_wireless_psk = req.body.wireless_psk;
      wifi.enabled = settings.rp_network_wireless_enabled;

      state.needs_reboot = true;
   }

   // overrule settings for section advanced
   if (req.query.config == 'advanced') {
      settings.rp_repo = req.body.repo
      settings.rp_auto_update = state.update_interval = req.body.update
   }

   // first normalize some stuff
   if (settings.rp_audio_usb == 'on')  settings.rp_audio_usb=1
   if (settings.rp_audio_usb == 'off') settings.rp_audio_usb=0
   if (settings.rp_network_wireless_enabled == 'on')  settings.rp_network_wireless_enabled=1
   if (settings.rp_network_wireless_enabled == 'off') settings.rp_network_wireless_enabled=0

   // make a copy
   copy_settings = clone(settings);
   copy_settings.rp_touchscreen_zone = '\'' + settings.rp_touchscreen_zone + '\'';

   var tmpfile = config.write_json( settings );
   console.log('config (json) written to: ' + tmpfile);

   var tmpfile2 = config.write2( copy_settings );
   console.log('config (ini) written to: ' + tmpfile2);

   // now call configure
   const configure = spawn('/opt/RoPieee/sbin/configure', [tmpfile2, 'no_reboot']);

   configure.stdout.on('data', (data) => {
       console.log(`stdout: ${data}`);
    });

   configure.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
   });

   // and go back home
   res.redirect('/');
});

app.get('/shutdown', function(req, res) {
   console.log('shutting down...');
   res.render('shutdown', {
      config_rp_this_hostname: info.hostname
   });
});

app.get('/reboot', function(req, res) {
   console.log('rebooting...');
   res.render('reboot', {
      config_rp_this_hostname: info.hostname
   });
});

app.get('/update', function(req, res) {
   console.log('updating...');
   res.render('update', {
      config_rp_this_hostname: info.hostname
   });
});

app.get('/feedback', function(req, res) {
   res.render('feedback', {
      config_rp_this_hostname: info.hostname
   });
});

app.get('/sendfeedback', function(req, res) {
   var d = new Date();
   var str = d.getTime() + os.hostname() + os.uptime();
   var hash = crypto.createHash('sha256');
   hash.update(str);
   var unique = hash.digest('hex').substr(0,16);

   console.log('sending feedback...: ' + unique);
   var feedback = spawn('systemctl', ['start', 'ropieee-feedback@' + unique]);

   feedback.stdout.on('data', (data) => {
       console.log(`stdout: ${data}`);
    });

   feedback.stderr.on('data', (data) => {
       console.log(`stderr: ${data}`);
    });

   res.redirect('/feedback_sent?unique=' + unique);
});

app.get('/feedback_sent', function(req, res) {
   console.log('feedback sent with unique id: ' + req.query.unique);
   res.render('feedback_sent', {
      config_rp_this_hostname: info.hostname,
      unique: req.query.unique });
});

app.get('/godown', function(req, res) {
   console.log('down down down');
   console.log('type: ' + req.query.reboot);
   var godown;

   res.redirect('/');

   if (req.query.reboot) {
      console.log('REBOOT');
      godown = spawn('systemctl', ['reboot']);
   }
   else {
      console.log('SHUTDOWN');
      godown = spawn('systemctl', ['poweroff', '-i']);
   }

   godown.stdout.on('data', (data) => {
       console.log(`stdout: ${data}`);
    });

   godown.stderr.on('data', (data) => {
       console.log(`stderr: ${data}`);
    });
});

app.get('/confirm_restart_extension', function(req, res) {
   console.log('restarting remote...');
   res.render('extension', {
      config_rp_this_hostname: info.hostname
   });
});

app.get('/restart_extension', function(req, res) {
   console.log('restarting RoPieee Remote')
   var remote = spawn('systemctl', ['restart', 'ropieee-remote']);

   remote.stdout.on('data', (data) => {
       console.log(`stdout: ${data}`);
    });

   remote.stderr.on('data', (data) => {
       console.log(`stderr: ${data}`);
    });

    res.redirect('/');
});

settings = config.read();
console.log('read config: ' + JSON.stringify(settings, null, '  '));

var info = {}
info.hostname = os.hostname();
info.kernel = os.release();
info.timezone = moment.tz.names();

// prefill supported HATs
var hats = {}
hats["ropieee-no-hat"]                    = "No HAT configured";
hats["allo-boss-dac-pcm512x-audio"]       = "Allo BOSS DAC";
hats["allo-digione"]                      = "Allo DigiOne";
hats["allo-piano-dac-pcm512x-audio"]      = "Allo Piano DAC";
hats["allo-piano-dac-plus-pcm512x-audio"] = "Allo Piano DAC 2.1";
hats["applepi-dac"]                       = "Orchard Audio ApplePi DAC (*)";
hats["virtual-audiophonics"]              = "Audiophonics ES9028Q2M";
hats["hifiberry-amp"]                     = "HifiBerry AMP/AMP+";
hats["hifiberry-dac"]                     = "HifiBerry DAC";
hats["hifiberry-dacplus"]                 = "HifiBerry DAC+/DAC+ Pro/Amp2";
hats["hifiberry-digi"]                    = "HifiBerry Digi+";
hats["hifiberry-digi-pro"]                = "HifiBerry Digi+ Pro";
hats["iqaudio-digi-wm8804-audio"]         = "IQaudIO Pi-Digi+";
hats["iqaudio-dacplus,unmute_amp"]        = "IQaudIO Pi-DigiAMP+";
hats["iqaudio-dacplus"]                   = "IQaudIO Pi-DAC(+/PRO/Zero)";
hats["justboom-dac"]                      = "Justboom Amp HAT, DAC HAT";
hats["justboom-digi"]                     = "Justboom Digi HAT";
hats["rpi-dac"]                           = "Raspberry Pi DAC (I2S)";

var state = {}
state.needs_reboot = false;
state.update_available = false;
state.update_interval = settings.rp_auto_update;
state.update_busy = false;
state.update_log = '';
state.version = 'unknown';
state.hardware = helpers.get_hardware_model();
//state.hardware = "rpi3";

var wifi = {}
wifi.enabled = false
wifi.networks = new Array();

if (settings.rp_network_wireless_enabled == '1') {
   wifi.enabled = true
   helpers.get_wifi_networks(wifi)
}

// init update check
updater.init_updates(state);

// show which version we're running
console.log("RoPieee version: " + state.version);

// which hardware?
console.log("detected hardware: " + state.hardware);

// let's go!
app.listen(port, hostname, () => {
   console.log("RoPieee Web Server running at http://" + hostname + ":" + port + "/");
});

