Vue.component('videoviewer',{
    props: {
        resource: String,
        activity_title: String,
        type: String,
        description: String,
    },
    template : `
          <div class="column is-one-third">
            <div class="card">
                <div class="card-image">
                <figure>
                    <iframe width="100%" height="250px" v-bind:src="resource" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </figure>
                </div>
                <div class="card-content">
                <div class="media">
                    <div class="media-content">
                    <p class="title is-4">{{ activity_title }}</p>
                    <p class="subtitle is-6">{{ type }}</p>
                    </div>
                </div>
                <div class="content">
                    {{ description }}
                </div>
                </div>
            </div>
          </div>
    `
});
new Vue({
    el: '#vvideo',
    data: {
      videos: []
    },
    created: function(){
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
        vm.videos = resJSON.lessons;
        console.log(vm.videos);
      }) 
      .catch(err => {
          vm.answer = err;
      });
    }
})