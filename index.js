const express = require('express')
const cfg = require('./config')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(cfg.port, () => {
  console.log(`my app listening at http://localhost:${cfg.port}`)
})