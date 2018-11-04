let vacancys = new Vue({
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
                        <p>{{ v.location }}</p>
                        <p>{{ v.category }}</p>
                        <p>{{ v.description }}</p>            
                        <p>{{ v.email }}</p>
                        <p>{{ v.phone }}</p>
                        <p>{{ v.state }}</p>
                        <a :href="'/list_vacancy/' + v._id"><div>Open</div></a>
                    </div>
               </div>`
});


(document.querySelectorAll('input[name="currentPageVacancy"]') as NodeListOf<HTMLInputElement>).forEach((el: HTMLElement) => {
    el.addEventListener('change',()=>{
        loadPageVacancys(parseInt((document.querySelector('input[name="currentPageVacancy"]:checked') as HTMLInputElement).value))
    })
});




loadPageVacancys(parseInt((document.querySelector('input[name="currentPageVacancy"]:checked') as HTMLInputElement).value));

function loadPageVacancys(num: number) {
    fetch(`/api/all_vacancy?page=${num}`)
        .then(response => response.json())
        .then(function (arr) {
            vacancys.arr = arr
        });
}