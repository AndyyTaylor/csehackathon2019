const suggest = require('./suggest');
const bodyParser = require('body-parser');
const express = require('express');

const PORT = 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// TODO add route & method handlers here

//POST /suggest will call suggest API
app.post('/suggest', function (req, res) {
  let body = req.body;
  let resp = suggest(body);
  res.status(resp[0]).send(resp.slice(1,4));
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
