// @ts-ignore
let userData= new Vue({
    el: '#containerVacancy',
    data: {
        arr:[]
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

fetch('/api/user_vacancy?admin=true')
    .then(response => response.json())
    .then(function (arr) {
        userData.arr = arr;
    });