const express = require("express");
const moment = require('moment');
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

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
const lessonsCollection = db.collection("lesson");
const messageCollection = db.collection("messages");

router.post("/users", (req, res, next)=>{
  if (req.body.name !=null && req.body.email != null && req.body.password != null) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      let docId = Math.floor(Math.random() * (99999 - 00000));
      let newUser = {
        "name": req.body.name,
        "email": req.body.email,
        "admin_id": "obedgm@gmail.com",
        "password": hash
      }

      userCollection.where('email', '==', req.body.email).get()
        .then(snapshot => {
          if (snapshot.empty) {
            let setNewUser = userCollection.doc(String(docId)).set(newUser);
            res.status(200).json({user: newUser});
          } else {
            res.statusMessage = "User already exists!";
            res.status(500).json({message: "User already exists!"});
          }
        }).catch(err => {
          res.statusMessage = err;
          return res.status(500).json({message: err});
        });
    });
  } else{
      res.status(500).json({
        message: "req.body params are undefined"
      })
    }
})

router.post("/messages", (req, res, next) => {
  if (req.body.email && req.body.name && req.body.message) {
    var newMessage = {
      email: req.body.email,
      name: req.body.name,
      message: req.body.message
    };
    let docId = Math.floor(Math.random() * (99999 - 00000));
    messageCollection.doc(String(docId)).set(newMessage);
    return res.status(200).json({message: "Message sent!"});
  } else {
    res.statusMessage = "Missing fields in message!"
    return res.status(408).json({message: "Missing params in request!"});
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

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

router.post("/enroll", (req, res, next) => {
  let usersRef = db.collection('users');
  usersRef.where('email', '==', req.body.email).get()
    .then(snapshot => {
      if (snapshot.empty) {
        res.statusMessage = "User with email " + req.body.email + " not found.";
        return res.status(404).json("User with email " + req.body.email + " not found.");
      }

      snapshot.forEach(doc => {
        let user = doc.data();
        var newCourses = [];
        if (user.courses) {
          newCourses = user.courses;
        }

        coursesCollection.doc(req.body.course).get().then((docData) => {
          if (docData.exists) {
            newCourses.push(req.body.course);
            usersRef.doc(doc.id).update({courses: newCourses.filter(onlyUnique)});
            return res.status(200).json("Enrolled user to course successfully.");
          } else {
            res.statusMessage = "Course not found.";
            return res.status(404).json("Course not found.");
          }
        }).catch((fail) => {
          res.statusMessage = fail;
          res.status(500).json(fail);
        });
      });
    }).catch(err => {
      res.statusMessage = err;
      res.status(500).json(err);
    });
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
router.post("/course", (req, res, next) => {
  if (req.body.name !=null && req.body.img != null && req.body.author != null && req.body.description != null && req.body.reviews != null) {
    let docId = Math.floor(Math.random() * (99999 - 00000));
    let newCourse = {
      "name": req.body.name,
      "img": req.body.img,
      "author": req.body.author,
      "description": req.body.description,
      "reviews": req.body.reviews,
      "admin_id": "obedgm@gmail.com"
    }
    coursesCollection.doc(String(docId)).set(newCourse);
    newCourse.id = docId;

    return res.status(200).json({course: newCourse});
  }else{
    res.json({
      "Message": "Missing params in body."
    })
  }
})

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

router.post("/featured-courses", (req, res, next) => {
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

router.post("/courses", (req, res, next) => {
  sess = req.session;
  if (sess.email) {
    userCollection.where('email', '==', sess.email).get().then(sn => {
      if (!sn.empty) {
        sn.forEach(doc => {
          var user = doc.data();
          var userCourses = user.courses || [];
          if (!req.body.query) {
            coursesCollection
              .get()
              .then(function(querySnapshot) {
                var courses = []
                querySnapshot.forEach(function(doc) {
                  var course = doc.data();
                  if (course.name != null && userCourses.includes(doc.id)) {
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
                  if (course.name != null && userCourses.includes(doc.id)) {
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
        });
      } else {
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
      }
    })
  } else {
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
            course.id = id_;
          }
        });
        return res.status(200).json({course: course});
      })
      .catch(err => {
        return res.status(500).json(err);
      });
});

router.get("/videos/:id", (req, res, next) =>{
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

router.get("/course-enrolled/:id", (req, res, next) =>{
  let id_ = +req.params.id;
  lessonsCollection
      .get()
      .then(function(querySnapshot){
        var courses = [];
        querySnapshot.forEach(function(doc){
          if (doc.data().courseID == id_) {
            courses.push(doc.data())
          }
        });
        return res.status(200).json({ courses: courses })
      })
      .catch(err => {
        return req.status(500).json(err);
      })
})


router.post("/course/lesson", (req,res, next)=>{
  if (req.body.courseID !=null && req.body.title !=null && req.body.description != null && req.body.resource != null) {
    let lessonID = Math.floor(Math.random() * (99999 - 00000));
    let newLesson = {
      "courseID": req.body.courseID,
      "activity_title": req.body.title,
      "description": req.body.description,
      "resource": req.body.resource,
    }
    console.log(newLesson);
    lessonsCollection.doc(String(lessonID)).set(newLesson);
    return res.status(200).json({
      "Message": "Lesson successfully created"
    });
}
else{
  console.error(req.body);
  return res.status(408).json({
    "Message": "Lesson params in body."
  });
}

})

router.post("/user-enrolled/:id", (req, res, next) => {
  var id_ = req.params.id
  var email = JSON.parse(req.body.body).email;
  userCollection.where('email', '==', email).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return res.status(200).json({user: {}});
      }

      var enrolled = false;
      snapshot.forEach(doc => {
        if (doc.id == sess.user_id) {
          var courses = doc.data().courses;
          if (courses.includes(id_)) {
            enrolled = true;
          } 
        }
      });
      return res.status(200).json({enrolled: enrolled});
    }).catch(err => {
      return res.status(200).json({enrolled: false});
    });
});

router.get("/users/login", (req, res, next) => {
  sess = req.session;
  if (!sess.email) {
    return res.status(200).json({user: {}});
  }
  userCollection.where('email', '==', sess.email).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
        return res.status(200).json({user: {}});
      }

      var user = {}
      snapshot.forEach(doc => {
        if (doc.id == sess.user_id) {
          user = doc.data();
        }
      });
      return res.status(200).json({user: user});
    }).catch(err => {
      console.error(err);
      res.status(500).json({message: err});
    })
});

router.post( "/users/login", ( req, res, next ) => {
	let email = req.body.email;

	if ( !email ){
		res.statusMessage = "Missing 'email' field in params!";
		return res.status( 406 ).json({
			message : "Missing 'email' field in params!",
			status : 406
		});
  }

  userCollection.where('email', '==', email).get()
    .then(snapshot => {
      if (snapshot.empty) {
        res.statusMessage = 'User not found.';
        return res.status(404).json("No matching documents");
      }

      snapshot.forEach(doc => {
        var user = doc.data();
        bcrypt.compare(req.body.password, user.password, function(err, compRes) {
          if (compRes) {
            sess = req.session;
            sess.email = email;
            sess.user_id = doc.id;
            user.password = "";

            return res.status(200).json( user );
          } else {
            return res.status(401).json("Incorrect password.");
          }
        });
      });
    }).catch(err => {
      return res.status(500).json({message: err});
    })
});

router.post("/users/logout", (req, res, next) => {
	req.session.destroy();

	return res.status(200).json("Successful log out.");
});

module.exports = router;
