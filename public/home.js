var appCompanyTitle = new Vue({
  el: '#appCompanyTitle',
  data: {
    company: "E-School"
  }
});

Vue.component("coursecard", {
  props: ['img', 'author_img', 'description', 'author_name', 'author_title', 'title', 'id_'],
  template: `
              <div class="card">
                <div class="card-image">
                    <figure class="image is-256x256">
                      <img v-bind:src="img" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img v-bind:src="author_img" alt="Placeholder image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">{{ title }}</p>
                      <p class="subtitle is-4">{{ author_name }}</p>
                      <p class="subtitle is-6">{{ author_title }}</p>
                    </div>
                  </div>

                  <div class="content">
                    {{ description }}
                  </div>
                  <a class="button is-primary" v-on:click="goto(id_)">
                      <strong>Enroll</strong>
                    </a>
                </div>
              </div>`,
  methods: {
    goto: function(id_) {
      window.location.href = "course/" + id_;
    }
  }
})

var appFeaturedCourses = new Vue({
  el: "#appFeaturedCourses",
  data: {
    featuredCoursesTitle: "Featured Courses",
    featuredCourses: [
    ]
  },
  created: function() {
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
          if (resJSON.courses.length >= 3) {
            vm.featuredCourses = [resJSON.courses[0], resJSON.courses[1], resJSON.courses[2]];
          }
        }) 
        .catch(err => {
            // vm.answer = err;
        }); 
  }
})

Vue.component("testimonial", {
  props: ['quote', 'author'],
  template: `
  <div class="card">
    <div class="card-content">
      <p class="title">
        {{ quote }}
      </p>
      <p class="subtitle">
        {{ author }}
      </p>
    </div>
  </div>`,
})

var testimonialsApp = new Vue({
  el: '#appTestimonials',
  data: {
    testimonialsTitle: 'Testimonials',
    testimonials: [
      {id: 1, quote: '"Todos nuestros sueños pueden hacerse realidad si tenemos el coraje de perseguirlos."', author: "- Miguel Hidalgo"},
      {id: 2, quote: '"No importa lo lento que vayas mientras no pares."', author: "- Usain Bolt"},
      {id: 3, quote: '"A veces tienes buscar en tu interior para solucionar tus problemas"', author: "- Patricio"}
    ]
  }
});

Vue.component("hero", {
  props: ["title", "body", "action"],
  template: `
              <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{ title }}
                    </h1>
                    <h2 class="subtitle">
                        {{ body }}
                    </h2>
                    <a class="button is-light" v-on:click="performAction(action)">
                        <strong>{{ action }}</strong>
                    </a>
                </div>
            </div>`,
  methods: {
    performAction: function(action) {
      if (action == "Start Growing") {
        window.location.href = "/search";
      }
      if (action == "Create Account") {
        $(".modal").toggleClass("is-active");
      }
    }
  }
})

Vue.component("hero-no-button", {
  props: ["title", "body"],
  template: `
              <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{ title }}
                    </h1>
                    <h2 class="subtitle">
                        {{ body }}
                    </h2>
                </div>
            </div>`
})

var heroApp = new Vue({
  el: "#appHero",
  data: {
    heroDescription: `E-School is the perfect stop for a unified, standard and visual training for you and your coworkers.\n
    Browse countless courses with a high uniform standard that lets you build the skills that will advance\n
    your career at your current company.`,
    heroTitle: `Train With a Pro. Anytime.`,
    heroAction: `Start Growing`
  }
})

var heroApp2 = new Vue({
  el: "#appHero2",
  data: {
    heroDescription: `Our product is made possible by the collaboration of our stakeholders:`,
    heroTitle: `Main Features`,
    heroAction: `Create Account`
  }
})

var heroApp3 = new Vue({
  el: "#appHero3",
  data: {
    heroDescription: `If you still have questions, we're happy to help.`,
    heroTitle: `Contact Us`
  }
})