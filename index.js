const {PORT} = require('./config');

const express = require('express')
const bodyParser = require("body-parser")
const app = express();

const model = require("./public/routes/model")

const axios = require('axios');


app.use('/static', express.static('public'));

app.use(bodyParser.json());

app.use("/api/", model)


app.get('/', (req, res) => {
  return res.sendFile("home.html", {root: "public"});
});
app.get('/videos', (req, res) => {
  return res.sendFile("videos.html", {root: "public"})
});
app.get('/search', (req, res) => {
  return res.sendFile("search.html", {root: "public"})
});
app.get('/course/:id', (req, res) => {
  return res.sendFile("course.html", {root: "public"})
});

app.get('/admin', (req, res) => {
  return res.sendFile("admin.html", {root:"public"});
});

app.listen(PORT, () => {
  console.log('app listening on port ' + PORT);
});
