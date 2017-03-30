var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('home', {
     title: 'Welcome'
  });
});

app.post('/submit', function(req, res) {
  console.log(req.body.hostname)
  console.log(req.body.reboot_time)
  res.send('Post page');
});





app.listen(3000);

