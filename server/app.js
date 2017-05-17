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
     config_rp_audio: settings.rp_audio,
     config_rp_kernel: info.kernel,
     config_rp_timezone: info.timezone,
     config_rp_timezone_set : 'Europe/Amsterdam'
  });
});

app.post('/submit', function(req, res) {
  console.log('submit req.body.hostname: ' + req.body.hostname);
  console.log('submit req.body.audio: ' + req.body.audio);
  console.log('submit req.body.reboottime: ' + req.body.reboottime);
  console.log('submit req.body.timezone: ' + req.body.timezone);
  res.render('summary', {
     config_rp_hostname: req.body.hostname,
     config_rp_audio: req.body.audio,
     config_rp_reboottime: req.body.reboottime,
     config_rp_timezone: req.body.timezone
  });
});

app.post('/commit', function( req, res) {
   console.log('commiting changes...');
   console.log(req.body.hostname);
   console.log(req.body.audio);
   console.log(req.body.reboottime);
   console.log(req.body.timezone);
   res.render('commit', {});
   var tmpfile = config.write( req.body.hostname, req.body.reboottime, req.body.audio, req.body.timezone );
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

app.get('/godown', function(req, res) {
   console.log('down down down');
   console.log('type: ' + req.query.reboot);

   if (req.query.reboot) {
      console.log('REBOOT');
      const godown = spawn('systemctl', ['reboot']);
   }
   else {
      console.log('SHUTDOWN');
      const godown = spawn('systemctl', ['poweroff', '-i']);
   }

   godown.stdout.on('data', (data) => {
       console.log(`stdout: ${data}`);
    });

   godown.stderr.on('data', (data) => {
       console.log(`stderr: ${data}`);
    });
});

var settings = config.read();
console.log('read config: ' + settings.rp_hostname);
console.log('read config: ' + settings.rp_reboottime);
console.log('read config: ' + settings.rp_audio);
console.log('read config: ' + settings.rp_timezone);

var info = {}
info.hostname = os.hostname();
info.kernel = os.release();
info.timezone = moment.tz.names();

// let's go!
app.listen(port, hostname, () => {
   console.log("Server running at http://" + hostname + ":" + port + "/");
});

