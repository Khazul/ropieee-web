const hostname = '0.0.0.0';
const port = process.env.NODE_PORT || 3000;
const env = process.env;
const spawn = require('child_process').spawn;
const spawnSync = require('child_process').spawnSync;
const os = require('os');
const crypto = require('crypto');

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var moment = require('moment-timezone');
var config = require('./config');
var settings = {};

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('general', {
     title: 'Welcome',
     config_rp_hostname: settings.rp_hostname,
     config_rp_reboottime: settings.rp_reboottime,
     config_rp_auto_update: settings.rp_auto_update,
     config_rp_audio: settings.rp_audio,
     config_rp_audio_usb: settings.rp_audio_usb,
     config_rp_hats: hats,
     config_rp_kernel: info.kernel,
     config_rp_timezone: info.timezone,
     config_rp_timezone_set: settings.rp_timezone,
     config_rp_touchscreen_detected: settings.rp_touchscreen_detected,
     config_rp_touchscreen_orientation: settings.rp_touchscreen_orientation,
     config_rp_touchscreen_zone: settings.rp_touchscreen_zone,
     config_rp_repo: settings.rp_repo
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
     config_rp_timezone: info.timezone,
     config_rp_timezone_set: settings.rp_timezone,
     config_rp_touchscreen_detected: settings.rp_touchscreen_detected,
     config_rp_touchscreen_orientation: settings.rp_touchscreen_orientation,
     config_rp_touchscreen_zone: settings.rp_touchscreen_zone,
     config_rp_repo: settings.rp_repo
  });
});

app.get('/advanced', function(req, res) {
  res.render('advanced', {
     title: 'Welcome',
     config_rp_hostname: settings.rp_hostname,
     config_rp_reboottime: settings.rp_reboottime,
     config_rp_auto_update: settings.rp_auto_update,
     config_rp_audio: settings.rp_audio,
     config_rp_audio_usb: settings.rp_audio_usb,
     config_rp_hats: hats,
     config_rp_kernel: info.kernel,
     config_rp_timezone: info.timezone,
     config_rp_timezone_set: settings.rp_timezone,
     config_rp_touchscreen_detected: settings.rp_touchscreen_detected,
     config_rp_touchscreen_orientation: settings.rp_touchscreen_orientation,
     config_rp_touchscreen_zone: settings.rp_touchscreen_zone,
     config_rp_repo: settings.rp_repo
  });
});


function query_pacman(package) {
  helper = '| grep ' + package;
  const pacman = spawnSync('./pacman', [ '-Q', helper]);

  var s = String(pacman.stdout);
  var splits = s.split("\n");

  var software = {};
  var j = 0;
  for (var i = 0; i < splits.length; ++i) {
     if (splits[i].length > 0) {
        console.log('splits output:' + i + ': ' + splits[i]);
        var splits2 = splits[i].split(" ");
        software[splits2[0]] = splits2[1];
     }
  }

  return software;
}

app.get('/info', function(req, res) {
  var software_list = {};
  software_list = query_pacman('ropieee'); 

  var obj = Object.assign(query_pacman('ropieee'), query_pacman('linux'));

  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)){
        console.log(prop + ': ' + obj[prop]);
    }
  }

  res.render('info', {
     title: 'Welcome',
     config_rp_touchscreen_detected: settings.rp_touchscreen_detected,
     config_rp_software: obj
  });
});

app.post('/submit', function(req, res) {
  console.log('submitting changes for: ' + req.query.config);

  if (typeof req.body.audio_usb == 'undefined')   req.body.audio_usb='off'

  // for now auto update is readonly
  //if (typeof req.body.auto_update == 'undefined') req.body.auto_update='off'
  req.body.auto_update='on';

  if (req.query.config == 'general') {
     console.log('summary for: general');
     console.log('summary:audio: ' + req.body.audio);
     res.render('summary2', {
	toggle_rp: 'general',
        config_rp_hostname: req.body.hostname,
	config_rp_audio: req.body.audio,
	config_rp_audio_usb: req.body.audio_usb,
	config_rp_reboottime: req.body.reboottime,
	config_rp_timezone: req.body.timezone,
        config_rp_hat: hats[req.body.audio]
     });
  }

  if (req.query.config == 'display') {
     console.log('summary for: display');
     console.log('summary:orientation: ' + req.body.orientation);
     console.log('summary:zone: ' + req.body.zone);
     res.render('summary2', {
	toggle_rp: 'display',
        config_rp_touchscreen_orientation: req.body.orientation,
	config_rp_touchscreen_zone: req.body.zone
     });
  }

  if (req.query.config == 'advanced') {
     console.log('summary for: advanced');
     console.log('summary:advanced: ' + req.body.repo);
     res.render('summary2', {
	toggle_rp: 'advanced',
        config_rp_repo: req.body.repo,
        config_rp_auto_update: req.body.auto_update
     });
  }



return;

  if (typeof req.body.audio_usb == 'undefined') req.body.audio_usb=0
  if (req.body.audio_usb == 'on') req.body.audio_usb=1

  if (typeof req.body.auto_update == 'undefined') req.body.auto_update=1
  if (req.body.auto_update == 'on') req.body.auto_update=1

  console.log('submit req.body.audio_usb: ' + req.body.audio_usb);
  console.log('submit req.body.reboottime: ' + req.body.reboottime);
  console.log('submit req.body.auto_update: ' + req.body.auto_update);
  console.log('submit req.body.timezone: ' + req.body.timezone);
  console.log('submit req.body.touchscreen_orientation: ' + req.body.touchscreen_orientation);
  console.log('submit req.body.touchscreen_zone: ' + req.body.touchscreen_zone);

  res.render('summary', {
     config_rp_hostname: req.body.hostname,
     config_rp_audio: req.body.audio,
     config_rp_audio_usb: req.body.audio_usb,
     config_rp_reboottime: req.body.reboottime,
     config_rp_auto_update: req.body.auto_update,
     config_rp_timezone: req.body.timezone,
     config_rp_touchscreen_detected: settings.rp_touchscreen_detected,
     config_rp_touchscreen_orientation: req.body.touchscreen_orientation,
     config_rp_touchscreen_zone: req.body.touchscreen_zone
  });
});

app.post('/commit', function( req, res) {
   console.log('committing changes for: ' + req.query.config);
   res.render('commit', {});

   //console.log('settings.hostname: '  + settings.rp_hostname);
   //console.log('settings.audio: '     + settings.rp_audio);
   //console.log('settings.audio_usb: ' + settings.rp_audio_usb);

   // overrule settings for section general
   if (req.query.config == 'general') {
      settings.rp_hostname   = req.body.hostname
      settings.rp_audio      = req.body.audio
      settings.rp_audio_usb  = req.body.audio_usb 
      settings.rp_reboottime = req.body.reboottime 
      settings.rp_timezone   = req.body.timezone 
   }

   // overrule settings for section display
   if (req.query.config == 'display') {
      settings.rp_touchscreen_orientation = req.body.orientation 
      settings.rp_touchscreen_zone = req.body.zone 
   }

   // overrule settings for section display
   if (req.query.config == 'advanced') {
      settings.rp_repo = req.body.repo
      settings.rp_auto_update = req.body.update
   }

   // first normalize some stuff
   if (settings.rp_audio_usb == 'on')  settings.rp_audio_usb=1
   if (settings.rp_audio_usb == 'off') settings.rp_audio_usb=0
   settings.rp_touchscreen_zone = '\'' + settings.rp_touchscreen_zone + '\'';
   if (settings.rp_auto_update == 'on')  settings.rp_auto_update=1
   if (settings.rp_auto_update == 'off') settings.rp_auto_update=0

   var tmpfile = config.write2( settings );
   console.log('config written to: ' + tmpfile);

   // now call configure
   const configure = spawn('/opt/RoPieee/sbin/configure', [tmpfile]);

   configure.stdout.on('data', (data) => {
       console.log(`stdout: ${data}`);
    });

   configure.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
   });
});

app.get('/shutdown', function(req, res) {
   console.log('shutting down...');
   res.render('shutdown', {});
});

app.get('/reboot', function(req, res) {
   console.log('rebooting...');
   res.render('reboot', {});
});

app.get('/feedback', function(req, res) {
   res.render('feedback', {});
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
      title: 'feedback',
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
   res.render('extension', {});
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
hats["hifiberry-amp"]                     = "HifiBerry AMP/AMP+";
hats["hifiberry-dac"]                     = "HifiBerry DAC";
hats["hifiberry-dacplus"]                 = "HifiBerry DAC+/DAC+ Pro";
hats["hifiberry-digi"]                    = "HifiBerry Digi+";
hats["hifiberry-digi-pro"]                = "HifiBerry Digi+ Pro";
hats["iqaudio-digi-wm8804-audio"]         = "IQaudIO Digi+";
hats["iqaudio-dacplus,unmute_amp"]        = "IQaudIO DigiAMP+";
hats["iqaudio-dacplus"]                   = "IQaudIO Pi-DAC(+/PRO/Zero)";
hats["justboom-dac"]                      = "Justboom Amp HAT, DAC HAT (*)";
hats["rpi-dac"]                           = "Raspberry Pi DAC (I2S)";



// let's go!
app.listen(port, hostname, () => {
   console.log("RoPieee web server running at http://" + hostname + ":" + port + "/");
});

