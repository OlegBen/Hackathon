fetch('/api/vacancy?admin=true')
    .then(response => response.json())
    .then(function (arrayEvents) {
        arrayEvents.forEach((el:any)=>{
            let newEl = document.createElement('p');
            newEl.innerHTML = el.company;
            document.getElementById('containerVacancy')!.appendChild(newEl)
        })
    });