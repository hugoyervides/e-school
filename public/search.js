Vue.component("coursecard", {
    props: ['name', 'img', 'author_img', 'description', 'author_name', 'author_title', 'id_'],
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
                        <a class="button is-primary" v-on:click="goto(id_)">
                            <strong>Enroll</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="card-image tile is-4">
                    <figure class="image is-256x256">
                      <div v-bind:style="{ backgroundImage: 'url(' + img + ')', backgroundSize: 'cover' }">
                        <div style="width: 324px; height: 256px"></div>
                      </div>
                    </figure>
                  </div>
                </div>
              </div>`,
      methods: {
        goto: function(id_) {
          window.location.href = "course/" + id_;
        }
      }
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
      goto: function(id_) {
        window.location.href = "course/" + id_;
      },
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