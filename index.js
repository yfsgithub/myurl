const express = require('express')
const bodyParser = require('body-parser');
const cfg = require('./config')
const app = express()

const db = require('./db');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

var staticHandler = express.static('./public', { index: ['index.html'] });
app.use('/', staticHandler);
// 处理重定向
app.get('/c/:tinyCode', async (req, res) => {
  let r = await db.getUrl(req.params);
  res.redirect(r.originalUrl);
})
// 应用json数据
app.get('/getList', async (req, res) => {
  let r = await db.getList();
  res.json(r);
})
app.post('/tinyurl', async (req, res) => {
  let r = await db.saveDb(req.body);
  res.json(r);
})
app.delete('/tinyurl/:tinyCode', async (req, res) => {
  let r = await db.deleteByTinyCode(req.params);
  res.json(r);
})

app.listen(cfg.port, () => {
  console.log(`my app listening at http://localhost:${cfg.port}`)
})