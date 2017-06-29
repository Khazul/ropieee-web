const hostname = '0.0.0.0';
const port = process.env.NODE_PORT || 3000;
const env = process.env;
const spawn = require('child_process').spawn;
const os = require('os');

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var moment = require('moment-timezone');
var config = require('./config');

var app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('home', {
     title: 'Welcome',
     config_rp_hostname: settings.rp_hostname,
     config_rp_reboottime: settings.rp_reboottime,
     config_rp_auto_update: settings.rp_auto_update,
     config_rp_audio: settings.rp_audio,
     config_rp_audio_usb: settings.rp_audio_usb,
     config_rp_kernel: info.kernel,
     config_rp_timezone: info.timezone,
     config_rp_timezone_set: settings.rp_timezone,
     config_rp_touchscreen_detected: settings.rp_touchscreen_detected,
     config_rp_touchscreen_orientation: settings.rp_touchscreen_orientation,
     config_rp_touchscreen_zone: settings.rp_touchscreen_zone
  });
});

app.post('/submit', function(req, res) {
  console.log('submit req.body.hostname: ' + req.body.hostname);
  console.log('submit req.body.audio: ' + req.body.audio);

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
   console.log('commiting changes...');
   console.log(req.body.hostname);
   console.log(req.body.audio);
   console.log(req.body.audio_usb);
   console.log(req.body.reboottime);
   console.log(req.body.timezone);
   console.log(req.body.touchscreen_orientation);
   console.log(req.body.touchscreen_zone);
   console.log(req.body.auto_update);
   res.render('commit', {});
   var tmpfile = config.write( req.body.hostname, req.body.reboottime, req.body.audio, req.body.audio_usb, 
	                       req.body.timezone, settings.rp_touchscreen_detected, req.body.touchscreen_orientation, 
	                       req.body.touchscreen_zone, req.body.auto_update )
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
   console.log('sending feedback...');
   var feedback = spawn('systemctl', ['start', 'ropieee-feedback']);

   feedback.stdout.on('data', (data) => {
       console.log(`stdout: ${data}`);
    });

   feedback.stderr.on('data', (data) => {
       console.log(`stderr: ${data}`);
    });

   res.render('feedback', {});
});

app.get('/godown', function(req, res) {
   console.log('down down down');
   console.log('type: ' + req.query.reboot);
   var godown;

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
   res.render('confirm_restart_extension', {});
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

var settings = config.read();
console.log('read config: ' + settings.rp_hostname);
console.log('read config: ' + settings.rp_reboottime);
console.log('read config: ' + settings.rp_auto_update);
console.log('read config: ' + settings.rp_audio);
console.log('read config: ' + settings.rp_audio_usb);
console.log('read config: ' + settings.rp_timezone);
console.log('read config: ' + settings.rp_touchscreen_detected);
console.log('read config: ' + settings.rp_touchscreen_orientation);
console.log('read config: ' + settings.rp_touchscreen_zone);

var info = {}
info.hostname = os.hostname();
info.kernel = os.release();
info.timezone = moment.tz.names();

// let's go!
app.listen(port, hostname, () => {
   console.log("RoPieee web server running at http://" + hostname + ":" + port + "/");
});

