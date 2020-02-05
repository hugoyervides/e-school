Vue.component('videoviewer',{
    props: {
        resource: String,
        activity_title: String,
        type: String,
        description: String,
    },
    template : `
            <div class="card tile">
                <div class="card-image">
                <figure>
                    <iframe width="440" height="255" v-bind:src="resource" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
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
    `
});
new Vue({
    el: '#vvideo',
    data: {
      videos: []
    },
    created: function(){
      var url = "../api" + window.location.pathname
      var vm = this 
      fetch(url)
      .then(res => {
        if(res.ok) {
            return res.json();
        }
        throw new Error(res.statusText);
      })
      .then(resJSON => {
        vm.videos = resJSON.lessons;
        console.log(vm.videos);
      }) 
      .catch(err => {
          vm.answer = err;
      });
    }
})

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
      logo: "../static/img/google.png",
      navbarItems: [
        {text: "Home" },
        {text: "Courses" },
      ],
      signup: "Sign Up",
      login: "Log In"
      }
    }
  });
  
var navbarApp = new Vue({
  el: '#appNavBar'
});
