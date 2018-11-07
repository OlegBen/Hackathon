import {createPageList} from "./listPages";

// @ts-ignore
const vacancys = new Vue({
    el: '#containerVacancy',
    data: {
        arr: []
    },
    methods: {},
    template: `<div>
                    <div v-for="v in arr">
                        <h1>{{ v.company }}</h1>    
                        <p>{{ v.type }}</p>
                        <p>{{ v.logo }}</p>
                        <p>{{ v.position }}</p>
                        <p>{{ v.location_id }}</p>
                        <p>{{ v.sub_category_id }}</p>
                        <p>{{ v.description }}</p>            
                        <p>{{ v.email }}</p>
                        <p>{{ v.phone }}</p>       
                        <a :href="'/list_vacancy/' + v.id"><div>Open</div></a>
                    </div>
               </div>`
});
const listPages = createPageList('containerListPages', loadPageVacancys);

loadPageVacancys(0);

let locationFilter: string | undefined;
let categoryFilter: string | undefined;

function loadPageVacancys(num: number) {
    fetch(`/api/all_vacancy?page=${num}&category=${categoryFilter}&location=${locationFilter}`)
        .then(response => response.json())
        .then(function (response: any) {
            vacancys.arr = response.arr;
            listPages.count = response.countPages;
        });
}
