Vue.component("coursecard", {
    props: ['name', 'img', 'author_img', 'description', 'author_name', 'author_title'],
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
                        <h1 class="title">{{ name }}</h1>
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

  var searchCoursesApp = new Vue({
    el: "#appSearchCourses",
    data: {
      searchTitle: "Search Courses",
      search: '',
      courses: [
      ],
      question: '',
      answer: '',
    },
    watch: {
      // whenever question changes, this function will run
      question: function (newQuestion, oldQuestion) {
        this.debouncedGetAnswer()
      }
    },
    created: function () {
      var url = "api/courses";
      var vm = this
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          "query": ""
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
          if (resJSON.courses.length == 0) {
            vm.answer = "There were no course(s) that matched the criteria. Try changing your query."
          } else {
            vm.answer = "Found " + resJSON.courses.length + " courses matching your critera."
          }
          vm.courses = resJSON.courses;
        }) 
        .catch(err => {
            vm.answer = err;
        });
      // _.debounce es una función proporcionada por lodash para limitar cuan
      // a menudo se puede ejecutar una operación particularmente costosa.
      // En este caso, queremos limitar la frecuencia con la que accedemos.
      // yesno.wtf/api, esperando hasta que el usuario tenga completamente
      // Terminé de escribir antes de realizar la solicitud ajax. Aprender
      // más sobre la función _.debounce (y su primo
      // _.throttle), visite: https://lodash.com/docs#debounce
      this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
      getAnswer:  function () {
        var url = "api/courses";
        this.body = {
          "query": this.question
        }
        var vm = this

        fetch(url, {
          method: 'POST',
          body: JSON.stringify(vm.body),
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
            if (resJSON.courses.length == 0) {
              vm.answer = "There were no course(s) that matched the criteria. Try changing your query."
            } else {
              vm.answer = "Found " + resJSON.courses.length + " courses matching your critera."
            }
            vm.courses = resJSON.courses;
          }) 
          .catch(err => {
              vm.answer = "There was an error processing your request. Please try again.";
          });
      },
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