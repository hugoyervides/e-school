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
  <button class="button is-primary">Agregar usuario</button>
  <table class="table" onShow="getUsers()">
  <thead>
    <tr>
      <th>Email</th>
      <th>Name</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <th>Email</th>
      <th>Name</th>
    </tr>
  </tfoot>
  <tbody>
    <tr v-for="user in users">
        <td>{{ user.email }}</td>
        <td>{{ user.name }}</td>
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
    console.log(this.users)
  }
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
  </ul>
  <p class="menu-label">
    Administración
  </p>
  <ul class="menu-list">
    <li><a>Cursos</a></li>
    <li>
      <a>Maneja Cursos</a>
      <ul>
        <li><a>Agregar Curso</a></li>
        <li><a>Borrar Cursos</a></li>
        <li><a>Asignar Curso</a></li>
      </ul>
    </li>
    <li><a>Perfil</a></li>
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
