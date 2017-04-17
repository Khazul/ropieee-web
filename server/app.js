const hostname = '0.0.0.0';
const port = process.env.NODE_PORT || 3000;
const env = process.env;

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
  console.log(req.body.hostname);
  console.log(req.body.reboottime);
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
   config.write( req.body.hostname, req.body.reboottime );
});

var settings = config.read();
console.log(settings.rp_hostname);
console.log(settings.rp_reboottime);

// let's go!
app.listen(port, hostname, () => {
   console.log("Server running at http://" + hostname + ":" + port + "/");
});

