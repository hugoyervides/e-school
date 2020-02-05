var adminUserTitle = new Vue({
  el: '#adminUserTitle',
  data: {
    user: "Obed Gonzalez",
    email:"obedgm33@gmail.com"
  }
});

Vue.component('navcomponent',{
  template : `<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <img v-bind:src="logo" width="auto">
      </a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a v-for="item in navbarItems" class="navbar-item">
          {{ item.text }}
        </a>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>{{ signup }}</strong>
            </a>
            <a class="button is-light">
              {{ login }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>`,
  data: function() { return {
    logo: "./static/img/google.png",
    navbarItems: [
      {text: "Home" },
      {text: "Courses" },
    ],
    signup: "Sign Up",
    login: "Log In"
    }
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

  <button class="button is-primary" v-on:click="postCourse()">Agregar curso</button>
  </div>`,
  data: function(){
    return{
      name: "",
      description: "",
      image: "",
      author: ""
    }
  },
  methods: {
    postCourse: function(){
      axios.post('/api/course',{
        name: this.name,
        description: this.description,
        img: this.image,
        author: this.author,
        reviews: ""
      }).then((response) =>{
        alert("Curso agregado correctamente");
        document.getElementById('name-input').value = "";
        document.getElementById('description-input').value = "";
        document.getElementById('link-input').value = "";
        document.getElementById('author-input').value = "";
      }, (error) => {
        console.log(error)
      })
    }
  }
})

Vue.component('ComponentF',{
  template:"<h4>Borrar</h4>"
})

Vue.component('ComponentG',{
  template:"<h4>Asignar Cursos</h4>"
})

var navbarApp = new Vue({
  el: '#appNavBar'
});

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
        <li @click="getComponent('F')"><a>Borrar Cursos</a></li>
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
