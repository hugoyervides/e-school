var dismiss = false
var appCompanyTitle = new Vue({
  el: '#appCompanyTitle',
  data: {
    company: "E-School"
  }
});

var appVideos = new Vue({
  el: "#videosApp",
  methods: {
    gotoVideo: function(id_) {
      window.location.pathname = "videos/" + window.location.pathname.split("/")[2];
    }
  }
})


Vue.component('activities', {

  props: [
    "activity_title", "author", "description", "due", "resource"
  ],
  template: `
       <section>
       <div class="container margin-top:30px" v-show="dismiss">
          <div class="card" >
          <header class="card-header">
          <p class="card-header-title">
          {{ activity_title }}</p>
          </header>
            <div class="card-image">
                <figure>
                    <iframe width="100%" height="250px" v-bind:src="resource" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </figure>
                </div>
              <div class="card-content">
              <div class="content">
               <p >{{ author }}</p>
              <p>{{ description }}</p>
              <p>{{convert(due._seconds, due._nanoseconds)}}</p> 
              </div>
              </div>
           
            <footer class="card-footer" >
             <a @click="hitDismiss" class="card-footer-item" >Dismiss </a> 
              <a  class="card-footer-item">Submit</a>
            </footer>
          </div>
        </div>
       </section> 
  `,
  data: function () {
    return {
      dismiss: true
    }
  },
  methods: {
 convert(seconds, nanoseconds){
   nanoseconds = nanoseconds/1000000000
   seconds += nanoseconds
     return  new Date(seconds*1000)
 },
 hitDismiss(){
    this.dismiss = false;
   }
 }

  
});
new Vue({
  el: '#activity',
  data: {
    todos: []
  },
  created: function () {
    console.log(window.location.pathname);
    var url = "../api/videos/" + window.location.pathname.split("/")[2]
    var vm = this
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then(resJSON => {
        vm.todos = resJSON.lessons;
      })
      .catch(err => {
        vm.answer = err;
      });
  }
})




