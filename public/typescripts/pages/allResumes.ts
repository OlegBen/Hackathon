import {createPageList} from "./listPages";

// @ts-ignore
const resumes = new Vue({
    el: '#containerResumes',
    data:{arr: []},
    methods: {},
    template: `<div>
                    <div v-for="v in arr">
                        <h1>{{ v.name }}</h1>
                        <p>{{ v.age }}</p>
                        <a :href="'/list_resume/' + v.id"><div>Open</div></a>
                    </div>
               </div>`
});



let listPagesR = createPageList('containerListPages', loadPageResume);

loadPageResume(0);

function loadPageResume(num: number) {
    fetch(`/api/all_resume?page=${num}`)
        .then(response => response.json())
        .then(function (response:any) {
            resumes.arr = response.arr;
            listPagesR.count = response.countPages;
        });
}
