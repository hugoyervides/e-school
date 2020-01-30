Vue.component('videoviewer',{
    props: {
        url: String,
        title: String,
        course: String,
        description: String,
    },
    template : `
          <section class="section">
            <div class="card">
                <div class="card-image">
                <figure>
                    <iframe width="440" height="255" v-bind:src="url" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </figure>
                </div>
                <div class="card-content">
                <div class="media">
                    <div class="media-content">
                    <p class="title is-4">{{ title }}</p>
                    <p class="subtitle is-6">{{ course }}</p>
                    </div>
                </div>
                <div class="content">
                    {{ description }}
                </div>
                </div>
            </div>
          <section>
    `
});
new Vue({
    el: '#vvideo',
    data: {
      videos: [
        {url: "https://www.youtube.com/embed/tgbNymZ7vqY" , title: "Variables", course: "C++", description: "Introduction to variables in C++"},
        {url: "https://www.youtube.com/embed/vLnPwxZdW4Y" , title: "Objects", course: "C++", description: "Introduction to C++ objects"},
        {url: "https://www.youtube.com/embed/ZOKLjJF54Xc" , title: "Estructuras", course: "C++", description: "Estructuras en C++ basicas"},
      ]
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
  
var navbarApp = new Vue({
  el: '#appNavBar'
});
