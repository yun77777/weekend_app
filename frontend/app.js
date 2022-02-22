const express = require('express');
const path = require('path');

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
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})