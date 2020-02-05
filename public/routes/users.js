const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eschool-a6821.firebaseio.com"
});

const db = admin.firestore();

const userCollection = db.collection("users");
const lessonsCollection = db.collection("lesson");

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


router.get("/lessons/:id", (req, res, next) =>{
  let id_ = +req.params.id;
  lessonsCollection
      .get()
      .then(function(querySnapshot){
        var lessons = [];
        querySnapshot.forEach(function(doc){
          if (doc.data().courseID == id_) {
            lessons.push(doc.data())
          }
        });
        return res.status(200).json({ lessons: lessons })
      })
      .catch(err => {
        return req.status(500).json(err);
      })
})




module.exports = router;
