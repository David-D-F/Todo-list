const todo  = document.querySelector('#todo');
const add   = document.querySelector('#ajouter');

function getAndSetData() {
    if(localStorage.getItem('todo')) {
        let data = JSON.parse(localStorage.getItem('todo'));
        let value = todo.value.toLowerCase();
        if(!data.includes(value)) {
            data.push(value);
            localStorage.clear();
            localStorage.setItem('todo', JSON.stringify(data));
        }        
    } else {
        let arrayTodo = [];
        arrayTodo.push(todo.value);
        let data = arrayTodo.map(datas => datas.toLowerCase());
        localStorage.setItem('todo', JSON.stringify(data));
    }
    location.reload();
}

function displayData() {
    const data = JSON.parse(localStorage.getItem('todo'));
    const ul   = document.querySelector('ul');

    for(let i = 0; data.length > i; i++) {
        let div = document.createElement('div');
        let li  = document.createElement('li');
        let btn = document.createElement('button');
        ul.append(div);
        div.append(li, btn)
        li.textContent  = data[i];
        btn.innerHTML   = `<i class="fas fa-check"></i>`;
        btn.className   = "checked";

        btn.addEventListener('click', () => {
            if(btn.className  === "checked") {
                btn.className = "delete";
                btn.innerHTML = `<i class="far fa-trash-alt"></i>`;
            } else if(btn.className === "delete") {
                let newTab = data.filter(datas => datas !== data[i])
                localStorage.setItem('todo', JSON.stringify(newTab));
                location.reload();
            }
        })
    }    
}

add.addEventListener('click', getAndSetData);

displayData();