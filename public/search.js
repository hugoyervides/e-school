Vue.component("coursecard", {
    props: ['img', 'author_img', 'description', 'author_name', 'author_title'],
    template: `
              <div class="tile is-ancestor">
                <div class="card tile">
                  <div class="card-content tile is-8">
                    <div class="media">
                      <div class="media-left tile is-2 square">
                        <figure class="image">
                          <img v-bind:src="author_img" alt="Placeholder image">
                        </figure>
                      </div>
                      <div class="media-content">
                        <p class="title is-4">{{ author_name }}</p>
                        <p class="subtitle is-6">{{ author_title }}</p>
                        <div class="content">
                          {{ description }}
                        </div>
                        <a class="button is-primary">
                            <strong>Enroll</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="card-image tile is-4">
                      <figure class="image">
                        <img v-bind:src="img" alt="Placeholder image">
                      </figure>
                  </div>
                </div>
              </div>`
  })

  var searchCoursesApp = new Vue({
    el: "#appSearchCourses",
    data: {
      searchTitle: "Search Courses",
      search: "Search Courses...",
      courses: [
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
        {
          img: "./static/img/course3.jpg",
          author: {
            name: "Jessye Davis",
            img: "./static/img/professor3.jpg",
            title: "Consultant"
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
    },
    watch: {
      // whenever question changes, this function will run
      search: function (newValue, oldValue) {
        this.debouncedPerformSearch()
      }
    },
    created: function () {
      // _.debounce is a function provided by lodash to limit how
      // often a particularly expensive operation can be run.
      // In this case, we want to limit how often we access
      // yesno.wtf/api, waiting until the user has completely
      // finished typing before making the ajax request. To learn
      // more about the _.debounce function (and its cousin
      // _.throttle), visit: https://lodash.com/docs#debounce
      this.debouncedPerformSearch = _.debounce(this.performSearch, 500)
    },
    methods: {
      performSearch: function() {
        
      }
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