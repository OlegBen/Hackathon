 ## Example
- Сохраняет в куках store
- - предыдущую посещённую страницу
- - некоторые значения 
- Обращения к стору происходит через статический метод, который принимает <имя эвента> и <значение>



## Example Use 
 ```
    const testInput = document.getElementById('testValue');
    const testButton = document.getElementById('testButton');
    const testLastPage = document.getElementById('testLastPage');
  
    new MuziJs({
        onChanged() {
            testInput.value = this.store.value
        },
        onCreate() {
            if (!this.store.value)
                this.store.value = 0
            this.addDispatcherEvent("setValue", (response) => {
                this.store.value = response
            })
            this.addDispatcherEvent("incrValue", (response) => {
                this.store.value += response
            })
            if (!this.store.page)
                this.store.page = {}
            this.addDispatcherEvent("setCurrentUrl", (response) => {
                this.store.page.last = this.store.page.current
                this.store.page.current = response
                testLastPage.innerHTML = `LastPage ${this.store.page.last}`;
            })
        }
    })
         
    MuziJs.send('setCurrentUrl', document.URL);
  
    testInput.addEventListener('change', () => {
        MuziJs.send('setValue', parseInt(testInput.value));
    })
  
    testButton.addEventListener('click', () => {
        MuziJs.send('incrValue', 2);
    })
```
