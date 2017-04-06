var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
//var fs = require('fs');
//var ini = require('ini');
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
  //res.send('Post page');
});

app.post('/commit', function( req, res) {
   console.log('commiting changes...');
   console.log(req.body.hostname);
   //res.send('Commit page');
   res.render('commit', {});
   config.write( req.body.hostname, req.body.reboot_time );
});

// read ini file
//var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));
var settings = config.read();
//console.dir(Object.keys(settings));
console.log(settings.rp_hostname);
console.log(settings.rp_reboottime);



app.listen(3000);

