var adminUserTitle = new Vue({
  el: '#adminUserTitle',
  data: {
    user: "Obed Gonzalez",
    email:"obedgm33@gmail.com"
  }
});

Vue.component('ComponentA',{
  template:"<h4>Perfil del admin</h4>"
})

Vue.component('ComponentB',{
  template:`
  <div>
  <table class="table" onShow="getUsers()">

  <thead>
    <tr>
      <th>Email</th>
      <th>Name</th>
      <th></th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <th>Email</th>
      <th>Name</th>
      <th></th>
    </tr>
  </tfoot>
  <tbody>
    <tr v-for="user in users">
        <td>{{ user.email }}</td>
        <td>{{ user.name }}</td>
        <td><a class="delete"></a></td>

    </tr>
  </tbody>
</table>
  </div>`,
  data() {
    return {
      users: []
    }
  },
  methods:{
    getUsers(){
      axios
      .get('/api/admin/users',{
        dataType: 'json',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => (this.users = response.data))
      console.log(this.users)
    }
  },
  mounted() {
    this.getUsers();
  }
})

Vue.component('ComponentC',{
  template:
  `
  <div>
  <div class="field">
    <label class="label">Name</label>
    <div class="control has-icons-right">
      <input id="name-input" class="input" type="text" placeholder="Type your name" v-model="name" v-on:input="checkName">
      <span id="nameIcon" style="visibility: hidden" class="icon is-small is-right">
        <i class="fas fa-check"></i>
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label">Email</label>
    <div class="control has-icons-right">
      <input id="username-input" class="input" type="text" placeholder="Typer your email" v-model="username" v-on:input="checkUsername">
      <span id="usernameIcon" style="visibility: hidden" class="icon is-small is-right">
        <i class="fas fa-check"></i>
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label">Password</label>
    <div class="control">
      <input id="password-input" class="input" type="password" placeholder="Text input">
    </div>
  </div>

  <div class="field">
    <label class="label">Confirm Password</label>
    <div class="control">
      <input id="confirmation-input" class="input" type="password" placeholder="Text input">
    </div>
  </div>
  <button class="button is-primary" v-on:click="postUser()">Agregar usuario</button>
  </div>`,
  data: function(){
    return {
      username: "",
      name: "",
      password: "",
      confirmation: "",
      admin: "obedgm@gmail.com"
    }
  },
  methods: {
    checkName: function(){
      if (this.name.length > 0) {
        document.getElementById("name-input").classList.add('is-success');
        document.getElementById("name-input").classList.remove('is-danger');
        $("#nameIcon").css("visibility", "visible");
      }else{
        document.getElementById("name-input").classList.remove('is-success');
        document.getElementById("name-input").classList.add('is-danger');
        $("#nameIcon").css("visibility", "hidden");
      }
    },
    checkUsername: function(){
      if (this.username.length > 0) {
        document.getElementById("username-input").classList.add('is-success');
        document.getElementById("username-input").classList.remove('is-danger');
        $("#usernameIcon").css("visibility", "visible");
      }else{
        document.getElementById("username-input").classList.remove('is-success');
        document.getElementById("username-input").classList.add('is-danger');
        $("#usernameIcon").css("visibility", "hidden");
      }
    },
    postUser: function(){
      console.log("hello")
      axios.post('/api/users', {
        name: this.name,
        email: this.username,
        password: this.password,
        admin: this.admin
      }).then((response) => {
        alert("Usuario agregado correctamente");
        document.getElementById('name-input').value = "";
        document.getElementById('username-input').value = "";
        document.getElementById('password-input').value = "";
        document.getElementById('confirmation-input').value = "";
        document.getElementById("name-input").classList.remove('is-success');
        document.getElementById("username-input").classList.remove('is-success');
      }, (error) => {
        console.log(error);
      });

    }
  }
})

Vue.component('ComponentD',{
  template:"<h4>Cursos</h4>"
})

Vue.component('videoviewer',{
  props: {
      resource: String,
      activity_title: String,
      type: String,
      description: String,
  },
  template : `
        <div class="column is-one-third">
          <div class="card">
              <div class="card-image">
              <figure>
                  <iframe width="100%" height="250px" v-bind:src="resource" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              </figure>
              </div>
              <div class="card-content">
              <div class="media">
                  <div class="media-content">
                  <p class="title is-4">{{ activity_title }}</p>
                  <p class="subtitle is-6">{{ type }}</p>
                  </div>
              </div>
              <div class="content">
                  {{ description }}
              </div>
              </div>
          </div>
        </div>
  `
});

Vue.component('ComponentE',{
  template:
  `
  <div>

  <div class="field">
    <label class="label">Name</label>
    <div class="control has-icons-right">
      <input id="name-input" class="input" type="text" v-model="name">
      <span id="nameIcon" style="visibility: hidden" class="icon is-small is-right">
        <i class="fas fa-check"></i>
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label">Descripción</label>
    <div class="control has-icons-right">
      <input id="description-input" class="input" type="text" v-model="description">
      <span id="usernameIcon" style="visibility: hidden" class="icon is-small is-right">
        <i class="fas fa-check"></i>
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label">Imagen Link</label>
    <div class="control has-icons-right">
      <input id="link-input" class="input" type="text" v-model="image">
      <span id="usernameIcon" style="visibility: hidden" class="icon is-small is-right">
        <i class="fas fa-check"></i>
      </span>
    </div>
  </div>

  <div class="field">
    <label class="label">Instructor ID</label>
    <div class="control has-icons-right">
      <input id="author-input" class="input" type="text" v-model="author">
      <span id="usernameIcon" style="visibility: hidden" class="icon is-small is-right">
        <i class="fas fa-check"></i>
      </span>
    </div>
  </div>

  <h1 class="title">Videos</h1>
    <div class="columns is-multiline is-desktop">
      <videoviewer 
        v-for = "video in videos"
        v-bind:resource = "video.resource"
        v-bind:activity_title = "video.activity_title"
        v-bind:type = "video.course"
        v-bind:description = "video.description">
      </videoviewer>
    </div>
  <div>
    <div class="field">
      <p class="control">
        <input class="input" type="text" placeholder="Resource URL" v-model="videoResourceURL">
      </p>
      <p class="control">
        <input class="input" type="text" placeholder="Title" v-model="videoTitle">
      </p>
      <p class="control">
        <input class="input" type="text" placeholder="Description" v-model="videoDescription">
      </p>
      <a class="button is-primary" v-on:click="addVideo()">
        Add Video
      </a>
    </div>
  </div>

  <div class="container">
    <button class="button is-danger" v-on:click="postCourse()">Agregar curso</button>
  </div>
  </div>`,
  data: function(){
    return{
      name: "",
      description: "",
      image: "",
      author: "",
      videoResourceURL: "",
      videoTitle: "",
      videoDescription: "",
      videos: []
    }
  },
  methods: {
    addVideo: function() {
      if (!this.videoResourceURL || !this.videoTitle || this.videoDescription) {
        alert("Fill all fields for the video.");
        return;
      }
      this.videos.push(
        {
          resource: this.videoResourceURL,
          activity_title: this.videoTitle,
          description: this.videoDescription
        }
      );
      this.videoResourceURL = "";
      this.videoTitle = "";
      this.videoDescription = "";
    },
    postCourse: function(){
      var vm = this;
      axios.post('/api/course',{
        name: this.name,
        description: this.description,
        img: this.image,
        author: this.author,
        reviews: ""
      }).then((response) =>{
        this.videos.forEach(video => {
          var data = JSON.stringify({
            courseID: response.data.course.id,
            title: video.title,
            resource: video.resourceURL,
            description: video.description
          });
          fetch("/api/course/lesson", {
            method: "POST",
            body: data,
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            if (res.ok) {
              console.error("Video added to course.");
            } else {
              throw new Error(res.statusText);
            }
          }).catch(err => {
            console.error(err);
          });
        });
        alert("Curso agregado correctamente");
        document.getElementById('name-input').value = "";
        document.getElementById('description-input').value = "";
        document.getElementById('link-input').value = "";
        document.getElementById('author-input').value = ""; 
      }).catch((error) => {
        console.log(error)
      });
    }
  }
})

Vue.component('ComponentF',{
  template:`<div>
      <h4>Cursos</h4>
      <table class="table" onShow="getCourses()">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Name</th>
            <th>Users</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Course ID</th>
            <th>Name</th>
            <th>Users</th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="course in courses">
              <td>{{ course.id }}</td>
              <td>{{ course.name }}</td>
              <td>{{ course.members }}</td>
              <td><a class="delete" v-on:click="deleteCourse(course.id)"></a></td>
          </tr>
        </tbody>
      </table>
    </div>`,
  methods: {
    deleteCourse: function(id_) {
      var url = "/api/course/" + id_;
      fetch(url, {
        method: "DELETE"
      }).then(res => {
        if (res.ok) {
          alert("Course deleted successfully.");
          var url = "/api/courses"
          var vm = this
          fetch(url, {
            method: "POST",
            body: JSON.stringify({
              query: ""
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
            if (res.ok) {
              return res.json();
            }
            throw new Error(res.statusText);
          }).then(resJSON => {
            var url = "/api/courses"
            var vm = this
            fetch(url, {
              method: "POST",
              body: JSON.stringify({
                query: ""
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(res => {
              if (res.ok) {
                return res.json();
              }
              throw new Error(res.statusText);
            }).then(resJSON => {
              vm.courses = resJSON.courses;
            }).catch(err => {
              console.error(err);
            });
          }).catch(err => {
            console.error(err);
          });
        }
      }).catch(err_ => {
        console.error(err_);
      });
    }
  },
  data: function() { return {
    courses: []
  }},
  created: function() {
      var url = "/api/courses"
      var vm = this
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          query: ""
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      }).then(resJSON => {
        vm.courses = resJSON.courses;
      }).catch(err => {
        console.error(err);
      });
  }
})

Vue.component('ComponentG',{
  template:`
  <div>
    <h4>Asignar Cursos</h4>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="Email" v-model="username">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="CourseID" v-model="course">
      </p>
    </div>
    <button class="button is-success" v-on:click="enroll()">Enroll</button>
    {{ message }}
  </div>`,
  data: function() { return {
    username: "",
    course: "",
    message: ""
  }},
  methods: {
    enroll: function() {
      var url = "api/enroll"
      var vm = this;

      if (this.username == "") {
        this.message = "Please input username."
        return;
      }
      if (this.course == "") {
        this.message = "Please input course ID."
        return;
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: vm.username,
          course: vm.course
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      }).then(resJSON => {
        vm.message = "User enrolled to course successfully."
      }).catch(err => {
        vm.message = err;
      });
    }
  }
})

Vue.component('menucomponent',{
  template: `<aside class="menu">
  <p class="menu-label">
    General
  </p>
  <ul class="menu-list">
    <li @click="getComponent('A')"><a>Dashboard</a></li>
    <li @click="getComponent('B')"><a>Usuarios</a></li>
    <li @click="getComponent('C')"><a>Agregar Usuarios</a></li>
  </ul>
  <p class="menu-label">
    Administración
  </p>
  <ul class="menu-list">
    <li @click="getComponent('D')"><a>Cursos</a></li>
    <li>
      <ul>
        <li @click="getComponent('E')"><a>Agregar Curso</a></li>
        <li @click="getComponent('F')"><a>Cursos</a></li>
        <li @click="getComponent('G')"><a>Asignar Curso</a></li>
      </ul>
    </li>
  </ul>
</aside>`,
  methods:{
    getComponent:function(el){
      vm.current='Component' + el;
    }
  }
})


var menuAdmin = new Vue({
  el: '#adminMenu'
});

var vm = new Vue({
  el:'#userComponent',
  data:{
    current: ''
  }
})
