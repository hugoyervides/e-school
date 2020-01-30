Vue.component('videoviewer',{
    props: {
        url: String,
        title: String,
        course: String,
        description: String,
    },
    template : `
        <section class="section">
            <div class="card">
                <div class="card-image">
                <figure>
                    <iframe width="440" height="255" v-bind:src="url" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </figure>
                </div>
                <div class="card-content">
                <div class="media">
                    <div class="media-content">
                    <p class="title is-4">{{ title }}</p>
                    <p class="subtitle is-6">{{ course }}</p>
                    </div>
                </div>
                <div class="content">
                    {{ description }}
                </div>
                </div>
            </div>
        </section>
    `
});
new Vue({
    el: '#vvideo'
})