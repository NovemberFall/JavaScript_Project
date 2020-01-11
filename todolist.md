# todolist , a project by using javascript
## downloading the .html .css from github; I just implementing the functioning
1. create .html
2. import bootstrap libray
3. import fontawesome .css
4. creat a our own .css file and app.js

# javascript implementation
- add form's listerner event
```js
addForm[0].addEventListener('submit', e=>{
    e.preventDefault();
    const todo = addForm[0].add.value;
    console.log(todo);
});
```
![](img/17.png)
- the issue is that a space is in fornt of the string, so we can use trim() function
```js
const todo = addForm[0].add.value.trim();
```

- updating the functioning
```js
/* The second way, for example:
const secondWay = document.querySelector('.add');
*/
const addForm = document.getElementsByClassName('add');
const list = document.getElementsByClassName('todos')[0];

const generateTmeplate = (todo) =>{
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

    list.innerHTML += html;
}


addForm[0].addEventListener('submit', e=>{
    e.preventDefault();
    const todo = addForm[0].add.value.trim();
    
    generateTmeplate(todo);
});
```
1. firstly, we get the ul elment (todos)
2. adding ul's inner contents with a new li element
![](img/g1.gif)

- but there is still a issue; if we don't add anything, it will add
space into the new line 
![](img/18.png)

- so we adding a if statement
```js
addForm[0].addEventListener('submit', e=>{
    e.preventDefault();
    const todo = addForm[0].add.value.trim(); 
    if(todo.length){
        generateTmeplate(todo);
        addForm.reset();
        //The reset() method resets the values of all elements in a form (same as clicking the Reset button).
    }    
});
```
- 
- let's look at the `(list-group)`list's children 
```js
//add a new element into addForm
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    console.log(todo);

    console.log(list);
    console.log(list.children);
    console.log(list.children.textContent);

    if (todo.length) {
        generateTmeplate(todo);
        addForm.reset();
    }
});
```
![](img/2020-01-10-17-13-25.png)
-
- print every list.child's textContent:
```js
//add a new element into addForm
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    console.log(todo);

    // console.log(list);
    // console.log(list.children);

    const arr = list.children;
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].textContent);
    }

    if (todo.length) {
        generateTmeplate(todo);
        addForm.reset();
    }
});
```
![](img/2020-01-10-17-38-44.png)
-
- Note `list.children` is not an array, It is `HTMLCollection`, and it does not have `forEach` method, thus, we need to convert it to array
- 2nd way
```js
    Array.from(list.children).forEach((element) => {
        console.log(element.textContent);
    });

```
-
- or using spread operator:
```js
    [...list.children].forEach((element) => {
        console.log(element.textContent);
    })
```
![](img/2020-01-10-19-23-00.png)
---





- Now, let's adding a delete event
```js
//delete todos
list.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
});
```
![](img/g2.gif)

- implementing the search functioning
1. getting a search input element
```js
const search = document.getElementById('search');

//keyup event
search.addEventListener('keyup', ()=>{
    const term = search.value.trim();
    filterTodos(term);
});
```
2. implementing a filterTodos()
```js
const filterTodos = (term) => {
    Array.from(list.children).filter((todo) => { // .filter()  return a array
        return !todo.textContent.includes(term);
    }).forEach((todo) => {
        return todo.classList.add('filtered');
    });

    Array.from(list.children).filter((todo) => { // .filter()  return a array
        return todo.textContent.includes(term);
    }).forEach((todo) => {
        return todo.classList.remove('filtered');
    });
};
```
![](img/g3.gif)

- now we should add the .filtered 's css style
```css
.filtered{
    display: none !important;
}

/*
we set the display to be none, and it's important  
 */
```

- finally, we testing the search functioning:
![](img/g4.gif)

- adding a .toLowerCase() to ignore the case-sensitive
```js
const filterTodos = (term) => {
    Array.from(list.children).filter((todo) => { // .filter()  return a array
        return !todo.textContent.toLowerCase().includes(term);
    }).forEach((todo) => {
        return todo.classList.add('filtered');
    });

    Array.from(list.children).filter((todo) => { // .filter()  return a array
        return todo.textContent.toLowerCase().includes(term);
    }).forEach((todo) => {
        return todo.classList.remove('filtered');
    });
};

//keyup event
search.addEventListener('keyup', ()=>{
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});
```
![](img/19.png)
---



## 2ND way:
```js
const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.getElementById('search');

const generateTmeplate = (todo) => {
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;
    list.innerHTML += html;
};


//add a new element into addForm
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    console.log(todo);

    // console.log(list);
    // console.log(list.children);
    // const arr = list.children;
    // for (let i = 0; i < arr.length; i++) {
    //     console.log(arr[i].textContent);
    // }


    // Array.from(list.children).forEach((element) => {
    //     console.log(element.textContent);
    // });

    [...list.children].forEach((element) => {
        console.log(element.textContent);
    })


    if (todo.length) {
        generateTmeplate(todo);
        addForm.reset();
    }
});


//delete todos
list.addEventListener('click', (e) => {
    // console.log(e.target.parentElement);
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
});


//adding Search Event, but we need to implement a filter todo function
search.addEventListener('keyup', () => {
    console.log(search.value);

    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});

//The Array.from() method returns an Array object from any object with a length property or an iterable object

//The filter() method creates a new array with all elements that pass the test implemented by the provided function.


const filterTodos = (term) => {
    [...list.children].filter((todo) => {
        return !todo.textContent.includes(term);
    }).forEach((todo) => {
        return todo.classList.add('filtered');
    });

    [...list.children].filter((todo) => {
        return todo.textContent.includes(term);
    }).forEach((todo) => {
        return todo.classList.remove('filtered');
    });
};
```






