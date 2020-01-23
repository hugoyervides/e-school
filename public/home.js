var appCompanyTitle = new Vue(***REMOVED***
  el: '#appCompanyTitle',
  data: ***REMOVED***
    company: "E-School"
  ***REMOVED***
***REMOVED***);

Vue.component('navcomponent',***REMOVED***
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
          ***REMOVED******REMOVED*** item.text ***REMOVED******REMOVED***
        </a>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>***REMOVED******REMOVED*** signup ***REMOVED******REMOVED***</strong>
            </a>
            <a class="button is-light">
              ***REMOVED******REMOVED*** login ***REMOVED******REMOVED***
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>`,
  data: function() ***REMOVED*** return ***REMOVED***
    logo: "./static/img/google.png",
    navbarItems: [
      ***REMOVED***text: "Home" ***REMOVED***,
      ***REMOVED***text: "Courses" ***REMOVED***,
    ],
    signup: "Sign Up",
    login: "Log In"
    ***REMOVED***
  ***REMOVED***
***REMOVED***);

var navbarApp = new Vue(***REMOVED***
  el: '#appNavBar'
***REMOVED***);

Vue.component("navcomponent", ***REMOVED***
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
                    ***REMOVED******REMOVED*** item.text ***REMOVED******REMOVED***
                  </a>
                  </div>
                </div>

                <div class="navbar-end">
                  <div class="navbar-item">
                    <div class="buttons">
                      <a class="button is-primary">
                        <strong>***REMOVED******REMOVED*** signup ***REMOVED******REMOVED***</strong>
                      </a>
                      <a class="button is-light">
                        ***REMOVED******REMOVED*** login ***REMOVED******REMOVED***
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>`,
    data: function() ***REMOVED*** return ***REMOVED***
      logo: "./static/img/google.png",
      navbarItems: [
        ***REMOVED***text: "Home" ***REMOVED***,
        ***REMOVED***text: "Courses" ***REMOVED***,
      ],
      signup: "Sign Up",
      login: "Log In"
    ***REMOVED***
  ***REMOVED***
  ***REMOVED***
);

var appFeaturedCourses = new Vue(***REMOVED***
  el: "#appFeaturedCourses",
  data: ***REMOVED***
    featuredCoursesTitle: "Featured Courses",
    featuredCourses: [
      ***REMOVED***
        img: "./static/img/course1.jpg",
        author: ***REMOVED***
          name: "John Smith",
          img: "./static/img/professor1.jpg",
          title: "Entrepreneur"
        ***REMOVED***,
        description: "This is a sample course description." 
      ***REMOVED***,
      ***REMOVED***
        img: "./static/img/course2.jpg",
        author: ***REMOVED***
          name: "Dahlia Hawthorne",
          img: "./static/img/professor2.jpg",
          title: "Entrepreneur"
        ***REMOVED***,
        description: "This is a sample course description." 
      ***REMOVED***,
      ***REMOVED***
        img: "./static/img/course3.jpg",
        author: ***REMOVED***
          name: "Jessye Davis",
          img: "./static/img/professor3.jpg",
          title: "Consultant"
        ***REMOVED***,
        description: "This is a sample course description." 
      ***REMOVED***,
    ]
  ***REMOVED***
***REMOVED***)