var logincomponent = Vue.component("logincomponent", {
    template: `
    <div>
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Admin Log In</p>
        <button class="delete" aria-label="close" id="close-modal" v-on:click="closeModal()"></button>
      </header>
      <section class="modal-card-body">
        {{ message }}
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email" v-model="username">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" v-model="password">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" v-on:click="login()">Log In</button>
      </footer>
    </div>
    </div>
    `,
    data: function()  {
      return {
        message: "",
        username: "",
        password: ""
      }
    },
    created: function() {
    },
    methods: {
      closeModal: function() {
        //$(".modal").toggleClass("is-active");
      },
      login: function() {
        var vm = this;
        fetch("api/admin/login", {
          headers:{
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            email: vm.username,
            password: vm.password
          })
        }).then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(res.statusText);
        }).then(resJSON => {
          //navbarApp.logIn(resJSON);
          window.location.href = "/admin";
        }).catch(err => {
          vm.message = err;
        })  
      },
      register: function() {
        var vm = this;
        fetch("api/users", {
          headers:{
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            name: vm.username,
            email: vm.username,
            password: vm.password
          })
        }).then(res => {
          if (res.ok) {
            //$(".modal").toggleClass("is-active");
            window.location.href = "/admin";
            return res.json();
          }
          throw new Error(res.statusText);
        }).then(resJSON => {
          //navbarApp.logIn(resJSON);
        }).catch(err => {
          vm.message = err;
        })  
      }
    }
});

var loginApp = new Vue({
  el: "#appLogin"
});