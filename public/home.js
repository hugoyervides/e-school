var appNavBar = new Vue({
  el: '#appNavBar',
  data: {
    logo: "./static/img/google.png",
    navbarItems: [
      {text: "Home" },
      {text: "Courses" },
    ],
    signup: "Sign Up",
    login: "Log In"
  }
});

var appCompanyTitle = new Vue({
  el: '#appCompanyTitle',
  data: {
    company: "E-School"
  }
});

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