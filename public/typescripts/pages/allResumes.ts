
fetch('/api/all_resume')
    .then(response => response.json())
    .then(function (arr) {
        new Vue({
            el: '#containerResumes',
            data: function () {
                return {
                    arr
                }
            },
            methods: {},
            template: `<div>
                            <div v-for="v in arr">
                                <h1>{{ v.name }}</h1>
                                <p>{{ v.age }}</p>
                                <a :href="'/list_resume/' + v._id"><div>Open</div></a>
                            </div>
                       </div>`
        });
    });