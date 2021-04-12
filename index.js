const express = require('express')
const cfg = require('./config')
const app = express()

const db = require('./db');

var staticHandler = express.static('./public', { index: ['index.html'] });
app.use('/', staticHandler);

app.get('/getList', (req, res) => {
  let r = db.getList();
  res.json(r);
})

app.listen(cfg.port, () => {
  console.log(`my app listening at http://localhost:${cfg.port}`)
})