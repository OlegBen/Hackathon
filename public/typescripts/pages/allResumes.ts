const resumes = new Vue({
    el: '#containerResumes',
    data:{arr: []},
    methods: {},
    template: `<div>
                    <div v-for="v in arr">
                        <h1>{{ v.name }}</h1>
                        <p>{{ v.age }}</p>
                        <a :href="'/list_resume/' + v._id"><div>Open</div></a>
                    </div>
               </div>`
});


(document.querySelectorAll('input[name="currentPageResumes"]') as NodeListOf<HTMLInputElement>).forEach((el: HTMLElement) => {
    el.addEventListener('change', () => {
        loadPageResumes(parseInt((document.querySelector('input[name="currentPageResumes"]:checked') as HTMLInputElement).value))
    })
});


loadPageResumes(parseInt((document.querySelector('input[name="currentPageResumes"]:checked') as HTMLInputElement).value));

function loadPageResumes(num: number) {
    fetch(`/api/all_resume?page=${num}`)
        .then(response => response.json())
        .then(function (arr) {
            resumes.arr = arr
        });
}
