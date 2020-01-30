var navcomponent = Vue.component('navcomponent',{
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
          <a v-for="item in navbarItems" class="navbar-item" v-on:click="goto(item.goto)">
            {{ item.text }}
          </a>
          </div>
        </div>
  
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="user-panel" v-if="loggedIn">
              Welcome, {{user.name}}
              <a class="button is-danger" v-on:click="signout()">
                <strong>{{ logout }}</strong>
              </a>
            </div>
            <div class="buttons" v-else>
              <a class="button is-primary" v-on:click="showLogin()">
                <strong>{{ signup }}</strong>
              </a>
              <a class="button is-light" v-on:click="showLogin()">
                {{ login }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>`,
    data: function() { return {
      user: {},
      loggedIn: false,
      logo: "./static/img/google.png",
      navbarItems: [
        {text: "Home", goto: "/" },
        {text: "Courses", goto: "/search" },
      ],
      signup: "Sign Up",
      login: "Log In",
      logout: "Log Out"
      }
    },
    created: function () {
      var vm = this;
      fetch("/api/users/login")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.json().message);
      })
      .then(resJSON => {
        if (resJSON.user && resJSON.user.name) {
          vm.loginUser(resJSON.user);
        }
      })
      .catch(err=> {
        console.error(err);
      })
    },
    methods: {
      signout: function() {
        fetch("/api/users/logout", {method: "POST"})
          .then(res => {
            this.loggedIn = false;
            this.user = {};
          })
          .catch(err=> {
            console.error(err);
          });
      },
      goto: function(path) {
        window.location.href = path
      },
      loginUser: function(user) {
        this.loggedIn = true;
        this.user = user;
      },
      showLogin: function() {
        $(".modal").toggleClass("is-active");
      }
    }
  });

  var navbarApp = new Vue({
    el: '#appNavBar',
    data: {
      user: {}
    },
    methods: {
      logIn: function(user) {
        this.$children[0].loginUser(user);
      }
    }
  });