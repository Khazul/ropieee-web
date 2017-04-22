const hostname = '0.0.0.0';
const port = process.env.NODE_PORT || 3000;
const env = process.env;
const spawn = require('child_process').spawn;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
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
     config_rp_reboottime: settings.rp_reboottime
  });
});

app.post('/submit', function(req, res) {
  console.log('submit req.body.hostname: ' + req.body.hostname);
  console.log('submit req.body.reboottime: ' + req.body.reboottime);
  res.render('summary', {
     config_rp_hostname: req.body.hostname,
     config_rp_reboottime: req.body.reboottime
  });
});

app.post('/commit', function( req, res) {
   console.log('commiting changes...');
   console.log(req.body.hostname);
   console.log(req.body.reboottime);
   res.render('commit', {});
   var tmpfile = config.write( req.body.hostname, req.body.reboottime );
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

var settings = config.read();
console.log('read config: ' + settings.rp_hostname);
console.log('read config: ' + settings.rp_reboottime);

// let's go!
app.listen(port, hostname, () => {
   console.log("Server running at http://" + hostname + ":" + port + "/");
});

