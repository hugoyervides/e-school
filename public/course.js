Vue.component("coursecard", {
  props: ['name', 'img', 'author_img', 'description', 'author_name', 'author_title', 'id_'],
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
                      <a class="button is-danger" v-on:click="gotoVideos(id_)">
                          <strong>Videos</strong>
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
            </div>`,
  methods : {
    gotoVideos: function(id_) {
      window.location.pathname = "videos/" + id_;
    }
  }
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
})