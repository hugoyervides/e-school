const {PORT} = require('./config');

const express = require('express')
const bodyParser = require("body-parser")
const app = express();
const axios = require('axios');

let model = require("./public/routes/model");

const request = require('request');

app.use('/static', express.static('public'));

app.use(bodyParser.json());

const session = require('express-session');
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true,
  maxAge: 1000 * 60
}));
app.use("/api/", model)

app.get('/', (req, res) => {
  return res.sendFile("home.html", {root: "public"});
});
app.get('/videos/:id', (req, res) => {
  return res.sendFile("videos.html", {root: "public"})
});
app.get('/search', (req, res) => {
  return res.sendFile("search.html", {root: "public"})
});
app.get('/course/:id', (req, res) => {
  sess = req.session;
  var requestURL = req.protocol + '://' + req.get('host') + "/api/user-enrolled/" + req.params.id;
  var vm = this;
  if (sess) {
    this.data = JSON.stringify({
      email: sess.email
    });
    console.log(vm.data);
    axios.post(requestURL, {
      method: "POST",
      body: vm.data,
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status == 200) {
        return response.data;
      }
      throw new Error(response.statusText);
    })
    .then(resJSON => {
      console.log(resJSON);
      if (resJSON.enrolled) {
        console.log(resJSON.enrolled);
        return res.sendFile("course-enrolled.html", {root: "public"});
      } else {
        console.log(resJSON.enrolled);
        return res.sendFile("course.html", {root: "public"});
      }
    })
    .catch(error => {
      return res.sendFile("course.html", {root: "public"});
    });
  }
});

app.get('/admin', (req, res) => {
  if (req.session) {
    if (req.session.admin) {
      return res.sendFile("admin.html", {root:"public"});
    }
  }
  return res.sendFile("admin-login.html", {root:"public"});
});

app.get('/course-enrolled/:id', (req, res) => {
  return res.sendFile("course-enrolled.html", {root: "public"});
});

app.listen(PORT, () => {
  console.log('app listening on port' + PORT);
});

