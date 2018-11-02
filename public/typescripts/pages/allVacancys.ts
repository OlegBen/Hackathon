
fetch('/api/all_vacancy')
    .then(response => response.json())
    .then(function (arr) {
        new Vue({
            el: '#containerVacancy',
            data: function () {
                return {
                    arr
                }
            },
            methods: {},
            template: `<div>
                            <div v-for="v in arr">
                                <h1>{{ v.company }}</h1>
                                <p>{{ v.description }}</p>
                                <a :href="'/list_vacancy/' + v._id"><div>Open</div></a>
                            </div>
                       </div>`
        });
    });