import {createPageList} from "../particals/listPages";
import {createCategoryFilter} from "../particals/listCategory";

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
                        <p>{{ v.city_id }}</p>
                        <p>{{ v.category_id }}</p>
                        <p>{{ v.description }}</p>                    
                        <a :href="'/list_vacancy/' + v.id"><div>Open</div></a>
                    </div>
               </div>`
});

const listPages = createPageList('containerListPages', loadPageVacancys);

const categoryFilterBlock = createCategoryFilter('containerListCategory', loadPageVacancys);


loadPageVacancys();

loadCategorys();



function loadPageVacancys() {
    const paginator = document.querySelector('input[name="currentPage"]:checked') as HTMLInputElement;
    const num = paginator ? parseInt(paginator.value) : 0;
    const categoryList = document.querySelector('input[name="currentCategory"]:checked') as HTMLInputElement;
    const category = categoryList ? (parseInt(categoryList.value) == -1 ? '' : parseInt(categoryList.value)) : '';
    const subCategoryList = document.querySelector('input[name="currentSubCategory"]:checked') as HTMLInputElement;
    const subCategory = subCategoryList ? (parseInt(subCategoryList.value) == -1 ? '' : parseInt(subCategoryList.value)) : '';
    const locationList = document.querySelector('input[name="currentLocation"]:checked') as HTMLInputElement;
    const location = locationList ? parseInt(locationList.value) : '';

    fetch(`/api/all_vacancy?page=${num}&category_id=${category}&sub_category_id=${subCategory}&location_id=${location}`)
        .then(response => response.json())
        .then(function (response: any) {
            vacancys.arr = response.arr;
            listPages.count = response.countPages;
        });

}

function loadCategorys(){
    fetch('/api/get_category')
        .then(response => response.json())
        .then(function (response:any) {
            categoryFilterBlock.arr = response.arr;
        });
}