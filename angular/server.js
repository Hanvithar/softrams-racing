const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);

app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*'); //http://localhost:3000,
	res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT,PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers','*');
	res.setHeader('Access-Control-Allow-Credentials','true');
	next();
});

app.get('/api/members', (req, res) => {
  request.get({url: 'http://localhost:3000/members'}, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// TODO: Dropdown!
app.get('/api/teams', (req, res) => {
  request.get({url: 'http://localhost:3000/teams'}, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Submit Form!
app.post('/api/addMember', (req, res) => {
  app.use(bodyParser.json());
  req.headers["Content-Type"] = 'application/json';
  console.log('test req', req.body);
  console.log('req headers', req.headers);
  request.post({url: 'http://localhost:3000/members', json: req.body}, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    } else {
      res.send(response);
    }
  });
});

app.get('/api/members/:id', (req, res) => {
  request.get({url: 'http://localhost:3000/members/'+ req.params.id}, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.put('/api/updateMember/:id', (req, res) => {
  req.header("Content-Type", "application/json");
  request.put({url: 'http://localhost:3000/members/'+ req.params.id, json: req.body}, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

app.delete('/api/deleteMember/:id', (req, res) => {
  req.header("Content-Type", "application/json");
  request.delete({url: 'http://localhost:3000/members/'+ req.params.id}, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
