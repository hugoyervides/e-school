const express = require("express");
const router = express.Router();

const {FIREBASE_TYPE,
       FIREBASE_PROJECT_ID,
       FIREBASE_PRIVATE_KEY_ID,
       FIREBASE_PRIVATE_KEY,
       FIREBASE_CLIENT_EMAIL,
       FIREBASE_CLIENT_ID,
       FIREBASE_AUTH_URI,
       FIREBASE_TOKEN_URI,
       FIREBASE_AUTH_PROVIDER,
       FIREBASE_CLIENT_CERT_URL} = require('../../config');


const admin = require("firebase-admin");

const serviceAccount =
{
  "type": FIREBASE_TYPE,
  "project_id": FIREBASE_PROJECT_ID,
  "private_key_id": FIREBASE_PRIVATE_KEY_ID,
  "private_key": FIREBASE_PRIVATE_KEY,
  "client_email": FIREBASE_CLIENT_EMAIL,
  "client_id": FIREBASE_CLIENT_ID,
  "auth_uri": FIREBASE_AUTH_URI,
  "token_uri": FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": FIREBASE_AUTH_PROVIDER,
  "client_x509_cert_url": FIREBASE_CLIENT_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eschool-a6821.firebaseio.com"
});

const db = admin.firestore();

const userCollection = db.collection("users");
const coursesCollection = db.collection("course");

router.post("/users", (req, res, next)=>{
  if (req.body.name !=null && req.body.email != null) {
    let docId = Math.floor(Math.random() * (99999 - 00000));
    let newUser = {
      "name": req.body.name,
      "email": req.body.email
    }
    let setNewUser = userCollection.doc(String(docId)).set(newUser);

    res.json({
      "Message": "User successfully created"
    })
  }else{
    res.json({
      "Message": "req.body params are undefined"
    })
  }

})

router.get("/admin/users", (req, res, next)=>{
  let usersRef = db.collection('users');
  let query = usersRef.where('admin_id', '==', 'obedgm@gmail.com').get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      var docs = []
      snapshot.forEach(doc => {
        const data = {
          'email': doc.data().email,
          'name': doc.data().name
        }
        docs.push(data)
      });

      res.send(docs);
    })
    .catch(err => {
      console.log('Error getting documents', err);
    })
})

/*
{
  name: "abc"
  img: "./static/img/course3.jpg",
  author: {
    name: "Jessye Davis",
    img: "./static/img/professor3.jpg",
    title: "Consultant"
  },
  description: "This is a sample course description."
}
*/
router.post("/course", (req, res, next)=>{
  if (req.body.name !=null && req.body.img != null && req.body.author != null && req.body.description != null) {
    let docId = Math.floor(Math.random() * (99999 - 00000));
    let newCourse = {
      "name": req.body.name,
      "img": req.body.img,
      "author": req.body.author,
      "description": req.body.description
    }
    let setNewCourse = coursesCollection.doc(String(docId)).set(newCourse);

    res.json({
      "Message": "Course successfully created"
    })
  }else{
    res.json({
      "Message": "Missing params in body."
    })
  }
})

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

router.post("/courses", (req, res, next) => {
  if (!req.body.query) {
    coursesCollection
      .get()
      .then(function(querySnapshot) {
        var courses = []
        querySnapshot.forEach(function(doc) {
          var course = doc.data();
          if (course.name != null) {
            course.id = doc.id;
            courses.push(course);
          }
        });
        return res.status(200).json({courses: courses})
      })
      .catch(function(error) {
          res.status(500).json({message: "Error getting documents: " + error});
      });
  } else {
    coursesCollection
      .get()
      .then(function(querySnapshot) {
        var courses = []
        var keywords = req.body.query.split(" ");
        querySnapshot.forEach(function(doc) {
          var course = doc.data();
          if (course.name != null) {
            keywords.forEach(function(word) {
              if (course.name.toLowerCase().includes(word.toLowerCase())) {
                course.id = doc.id;
                courses.push(course);
              }
            });
          }
        });
        return res.status(200).json({courses: courses.filter(onlyUnique)})
      })
      .catch(function(error) {
          res.status(500).json({message: "Error getting documents: " + error});
      });
  }
})

router.get("/course/:id", (req, res, next) => {
  let id_ = +req.params.id;
  coursesCollection
      .get()
      .then(function(querySnapshot) {
        var course = {};
        querySnapshot.forEach(function(doc) {
          if (doc.id ==  id_) {
            course = doc.data()
          }
        });
        return res.status(200).json({course: course});
      })
      .catch(err => {
        return res.status(500).json(err);
      });
});

module.exports = router;
