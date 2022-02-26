const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

const app = express()
const port = 3000
// app.use(express.static('public'));
// app.use('/js', express.static('public/js'));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/', express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


//post('http://localhost:5000/user/login', postData

app.post('/login', (req, res) => {

  console.log('req.body.user:', req.body.user)
 
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})