const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp(***REMOVED***
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eschool-a6821.firebaseio.com"
***REMOVED***);

const db = admin.firestore();

const userCollection = db.collection("users");

router.post("/users", (req, res, next)=>***REMOVED***
  if (req.body.name !=null && req.body.email != null) ***REMOVED***
    let docId = Math.floor(Math.random() * (99999 - 00000));
    let newUser = ***REMOVED***
      "name": req.body.name,
      "email": req.body.email
    ***REMOVED***
    let setNewUser = userCollection.doc(String(docId)).set(newUser);

    res.json(***REMOVED***
      "Message": "User successfully created"
    ***REMOVED***)
  ***REMOVED***else***REMOVED***
    res.json(***REMOVED***
      "Message": "req.body params are undefined"
    ***REMOVED***)
  ***REMOVED***


***REMOVED***)

module.exports = router;
