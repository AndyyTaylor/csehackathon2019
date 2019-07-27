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
app.post('/suggest', function (req, res) {
  let body = req.body;
  res.send('200\nbody');
  suggest(body);
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
