declare const Vue:any;

fetch('/api/user_vacancy?admin=true')
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
                                <a :href="'/list_vacancy/' + v._id + '?admin=true'"><div>Open</div></a>
                            </div>
                       </div>`
        });
    });