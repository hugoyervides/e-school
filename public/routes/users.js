const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");

const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eschool-a6821.firebaseio.com"
});

const db = admin.firestore();

const userCollection = db.collection("users");

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

module.exports = router;
