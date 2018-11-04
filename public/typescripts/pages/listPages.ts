export function createPageList(id:string, loadPageFunc:Function){
    // @ts-ignore
    return new Vue({
        el: `#${id}`,
        data: {
            count: 0,
            skipPages: 0,
            id: id
        },
        methods: {
            loadPage() {
                loadPageFunc(parseInt((document.querySelector('input[name="currentPage"]:checked') as HTMLInputElement).value));
            },
            skipPagesIncr(this: any, v: number) {
                if (v == -1 && this.skipPages > 0)
                    this.skipPages--;
                else if (v == 1 && (this.skipPages + 10) < this.count)
                    this.skipPages++;
                this.loadPage();
            }
        },
        template: `<div id="containerListPages">
                    <button @click=skipPagesIncr(-1) v-if="count > 10">left</button>
                    <div v-for="index in 10" :key="index" v-if="index <= count && count > 1">
                        <input @change="loadPage" type="radio" name="currentPage" :id="id + '_' + index" :value=index-1+skipPages v-if="index === 1" checked>
                        <input @change="loadPage" type="radio" name="currentPage" :id="id + '_' + index" :value=index-1+skipPages v-else>
                        <label :for="id + '_' + index" >Page {{index+skipPages}}</label>
                   </div>
                   <button @click=skipPagesIncr(1)  v-if="count > 10">right</button>
               </div>`
    });
}