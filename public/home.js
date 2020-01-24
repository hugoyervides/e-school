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

Vue.component("coursecard", {
  props: ['img', 'author_img', 'description', 'author_name', 'author_title'],
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
                      <p class="title is-4">{{ author_name }}</p>
                      <p class="subtitle is-6">{{ author_title }}</p>
                    </div>
                  </div>

                  <div class="content">
                    {{ description }}
                  </div>
                  <a class="button is-primary">
                      <strong>Enroll</strong>
                    </a>
                </div>
              </div>`
})

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
                    <a class="button is-light">
                        <strong>{{ action }}</strong>
                    </a>
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