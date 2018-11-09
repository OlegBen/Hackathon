export function createCategoryFilter(id: string, loadList:Function) {
    // @ts-ignore
    return new Vue({
        el: `#${id}`,
        data: {
            id:id,
            arr: [],
            arrSub: []
        },
        methods: {
            loadSubCategory(this:any, id:number){
                fetch(`/api/get_category?category_id=${id}`)
                    .then(response => response.json())
                    .then( (response:any)=> {
                        this.arrSub = response.arr;
                        loadList();
                    });
            },
            loadPage(){
                loadList()
            }
        },
        template: `<div>
                        <div style="background:green">
                            <div v-for="(value,index) in arr">
                                <input @change="loadSubCategory(value.id)" :value="value.id" :id="id + '_' + index" type="radio" name="currentCategory">
                                <label :for="id + '_' + index">{{value.name}}</label>
                            </div>
                        </div>                   
                        <div id="containerSubCategory" style="background:red">
                            <div v-for="(value,index) in arrSub">
                                <input @change="loadPage()" :id="id + '_' + index" :value="value.id" type="radio" name="currentSubCategory">
                                <label :for="id + '_' + index">{{value.name}}</label>
                            </div>
                        </div>         
               </div>`
    });
}