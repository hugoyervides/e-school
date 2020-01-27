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

router.post("/courses", (req, res, next)=> {
  if (!req.body.query) {
    res.status(208).json("Request has no value in query field.");
  } else {
    coursesCollection
      .get()
      .then(function(querySnapshot) {
        var courses = []
        querySnapshot.forEach(function(course) {
          if (course.name) {
            if (course.name.toLowerCase().includes(req.body.query.toLowerCase())) {
              courses.push(course)
            }
          }
        })
        return res.status(200).json({courses: courses})
      })
      .catch(function(error) {
          res.status(500).json({message: "Error getting documents: " + error});
      });
  }
})

module.exports = router;
