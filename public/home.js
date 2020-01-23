var appCompanyTitle = new Vue({
  el: '#appCompanyTitle',
  data: {
    company: "E-School"
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

var navbarApp = new Vue({
  el: '#appNavBar'
});

Vue.component("navcomponent", {
  template: `<nav class="navbar" role="navigation" aria-label="main navigation">
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
  }
);

var appFeaturedCourses = new Vue({
  el: "#appFeaturedCourses",
  data: {
    featuredCoursesTitle: "Featured Courses",
    featuredCourses: [
      {
        img: "./static/img/course1.jpg",
        author: {
          name: "John Smith",
          img: "./static/img/professor1.jpg",
          title: "Entrepreneur"
        },
        description: "This is a sample course description." 
      },
      {
        img: "./static/img/course2.jpg",
        author: {
          name: "Dahlia Hawthorne",
          img: "./static/img/professor2.jpg",
          title: "Entrepreneur"
        },
        description: "This is a sample course description." 
      },
      {
        img: "./static/img/course3.jpg",
        author: {
          name: "Jessye Davis",
          img: "./static/img/professor3.jpg",
          title: "Consultant"
        },
        description: "This is a sample course description." 
      },
    ]
  }
})