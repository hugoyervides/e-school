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
<<<<<<< HEAD
<<<<<<< HEAD
        
        <div class="navbar-dropdown">
          <a class="navbar-item">
            Account
          </a>
          <a class="navbar-item">
            Notifications
          </a>
          <a class="navbar-item">
            Settings
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Help
          </a>
          <a class="navbar-item">
            Log Out
=======
=======
>>>>>>> 5ae20fb34f1baca380ab6749eff9e423b0e4c22e
      </div>
      
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a v-for="item in navbarItems" class="navbar-item" v-on:click="goto(item.goto)">
            {{ item.text }}
<<<<<<< HEAD
>>>>>>> 5ae20fb34f1baca380ab6749eff9e423b0e4c22e
=======
>>>>>>> 5ae20fb34f1baca380ab6749eff9e423b0e4c22e
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
<<<<<<< HEAD
<<<<<<< HEAD
    </div>
  </nav>`,
  data: function() { return {
    logo: "./static/img/google.png",
    navbarItems: [
      {text: "Home" },
      {text: "My Courses" },
    ],
    name: 'Gabriel'
    }
  }
});

var navbarApp = new Vue({
  el: '#appNavBar'
});



Vue.component('activity', {
  props: [ 'author', 'activity_title', 'description','resource', 'due'],
  template: ` <div id="list"  class="container" style="margin-top:30px;">
  <div class="card">
      <header class="card-header">
          <p class="card-header-title">
              {{c.activity_title}}
              </p>
      </header>
      <div class="card-content">
          <div class="content">
             <p> {{author}} </p>
             <p> {{c.description}} </p>
             <a href="{{resource}}">Liga Externa</a>        
                   <br>
              <p> Due date:{{due}} </p>
          </div>
      </div>
      <footer class="card-footer">
          <a href="#" class="card-footer-item">Dismiss</a>
          <a href="#" class="card-footer-item">Entregar Tarea</a>
      </footer>
  </div>
</div>`,
data(){
  return {lessons:[]}
},

methods:{
  getCourses(){
    axios
    .get('/api/course/lesson',{
      dataType: 'json',
        headers: {
          'Accept': 'application/json'
        }
    }).then(response => (this.lessons = response.data))
    console.log(this.lessons)
  }

},
mounted() {
  this.getCourses();
  console.log(this.courses)
}

});






Vue.component('course', {
  template: `   <div class="card">
  <div class="card-image">
      <figure class="image is-128x128 is-horizontal-center">
          <img src=".static/img/edge.jpg" alt="Placeholder image">
      </figure>
  </div>
  <div class="card-content">
      <div class="media-left">
          <div class="media-content">
              <p class="title is-4"> {{videos.title}}</p>
              <p class="subtitle is-6"> Videos: {{videos.vistos}} / {{videos.disponibles}}</p>
          </div>
      </div>
  </div>
</div>`,

data: function()
{return{
videos: {vistos:1, disponibles:2}
} 
}

})

var courseApp = new Vue({
  el: "course"
});

var courseApp = new Vue({
  el: "#activity"

});
=======
    </nav>`,
    data: function() { return {
      logo: "../static/img/google.png",
      navbarItems: [
        {text: "Home", goto: "/" },
        {text: "Courses", goto: "/search" },
      ],
      signup: "Sign Up",
      login: "Log In"
      }
    },
    methods: {
      goto: function(path) {
        window.location.href = path
      }
    }
=======
    </nav>`,
    data: function() { return {
      logo: "../static/img/google.png",
      navbarItems: [
        {text: "Home", goto: "/" },
        {text: "Courses", goto: "/search" },
      ],
      signup: "Sign Up",
      login: "Log In"
      }
    },
    methods: {
      goto: function(path) {
        window.location.href = path
      }
    }
>>>>>>> 5ae20fb34f1baca380ab6749eff9e423b0e4c22e
  });
  
  var navbarApp = new Vue({
    el: '#appNavBar'
  });

  Vue.component("coursecard", {
    props: ['name', 'img', 'author_img', 'description', 'author_name', 'author_title'],
    template: `
              <div class="tile is-ancestor is-vertical">
                <h1 class="title tile">{{ name }}</h1>
                <div class="card tile">
                  <div class="card-content tile is-8">
                    <div class="media">
                      <div class="media-left tile is-2 square">
                        <figure class="image">
                          <img v-bind:src="author_img" alt="Placeholder image">
                        </figure>
                      </div>
                      <div class="media-content">
                        <div class="content">
                          {{ description }}
                        </div>
                        <div class="content">
                          <span> <b> {{ author_name }} </b> </span>
                          <span>{{ author_title }}</span>
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

  Vue.component("coursereview", {
    props: ["user", "comment", "rating"],
    template: `
    <div class="card tile">
      {{ user }}
      {{ comment }}
      {{ rating }}
    </div>
    `
  });

  var courseApp = new Vue({
      el: "#appCourse",
      data: {
          answer: "",
          relatedCourses: [],
          relatedCoursesTitle: "Related Courses",
          reviewsTitle: "Reviews",
          course: {
              id: 1,
              name: "abc",
              img: "abc",
              author: {
                  img: "def",
                  title: "def",
                  name: "fghi"
              },
              description: "jkl"
          }
      },
      created: function () {
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
            vm.course = resJSON.course
            vm.populateRelatedCourses(resJSON.course.name);
          }) 
          .catch(err => {
              vm.answer = err;
          });
      },
      methods: {
        populateRelatedCourses: function(name) {
          var url = "../api/courses";
          var vm = this
          fetch(url, {
            method: 'POST',
            body: JSON.stringify({
              "query": name
            }),
            headers:{
              'Content-Type': 'application/json'
            }})
            .then(res => {
              if(res.ok) {
                  return res.json();
              }
              throw new Error(res.statusText);
            })
            .then(resJSON => {
              vm.relatedCourses = resJSON.courses;
            }) 
            .catch(err => {
                vm.answer = err;
            });
        }
      }
  })

  Vue.component("relatedcourse", {
    props: ['name', 'img', 'author_img', 'description', 'author_name', 'author_title'],
    template: `
                <div class="card tile">
                  <div class="card-image tile is-6">
                      <figure class="image">
                        <img v-bind:src="img" alt="Placeholder image">
                      </figure>
                  </div>
                  <div class="card-content tile is-6">
                    <div class="media">
                      <div class="media-content">
                        <h1 class="title">{{ name }}</h1>
                        <a class="button is-primary">
                            <strong>Enroll</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>`
<<<<<<< HEAD
  })
>>>>>>> 5ae20fb34f1baca380ab6749eff9e423b0e4c22e
=======
  })
>>>>>>> 5ae20fb34f1baca380ab6749eff9e423b0e4c22e
