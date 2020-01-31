var appCompanyTitle = new Vue({
  el: '#appCompanyTitle',
  data: {
    company: "E-School"
  }
});

Vue.component('navcomponentlogged',{
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
        <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          {{name}}
        </a>
        
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