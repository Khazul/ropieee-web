const hostname = '0.0.0.0';
const port = 3000;

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
     config_rp_hostname: settings.rp_hostname
  });
});

app.post('/submit', function(req, res) {
  console.log(req.body.hostname);
  console.log(req.body.reboot_time);
  res.render('summary', {
     config_rp_hostname: req.body.hostname,
     config_rp_reboottime: req.body.reboot_time
  });
});

app.post('/commit', function( req, res) {
   console.log('commiting changes...');
   console.log(req.body.hostname);
   res.render('commit', {});
   config.write( req.body.hostname, req.body.reboot_time );
});

var settings = config.read();
console.log(settings.rp_hostname);
console.log(settings.rp_reboottime);

// let's go!
app.listen(port, hostname);

