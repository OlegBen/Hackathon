export function createPageList(id:string, loadList:Function){
    // @ts-ignore
    return new Vue({
        el: `#${id}`,
        data: {
            countButtons: 5,
            count: 0,
            countSecond:5,
            skipPages: 0,
            id: id
        },
        methods: {
            loadPage() {
                loadList();
            },
            skipPagesIncr(this: any, v: number) {
                if (v == -1 && this.skipPages > 0)
                    this.skipPages--;
                else if (v == 1 && (this.skipPages + 5) < this.count)
                    this.skipPages++;
                this.loadPage();
            }
        },
        template: `<div id="containerListPages" class="ListResume-Header">
                    <button @click=skipPagesIncr(-1)>left</button>
                    <div v-for="index in countButtons" :key="index" v-if="index <= countSecond && countSecond > 1">
                        <input style="display: none" @change="loadPage" type="radio" name="currentPage" :id="id + '_' + index" :value=index-1+skipPages v-if="index === 1" checked>
                        <input style="display: none" @change="loadPage" type="radio" name="currentPage" :id="id + '_' + index" :value=index-1+skipPages v-else>
                        <button :for="id + '_' + index" >{{index+skipPages}}</button>
                   </div>
                   <button @click=skipPagesIncr(1)>right</button>
                   <p v-if="count > countButtons">Страниц {{count}}</p>
               </div>`
    });
}