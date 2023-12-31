// Seleção de elementos
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditButton = document.querySelector("#cancel-edit-button")
const finishTodoBtn = document.querySelector(".finish-todo")
let storageArr = new Array()
let oldInputValue;

// Funções
//funcão para criar a nova div da tarefa
const saveTodo = (text) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerHTML = text
    //checagem se existem um elemento com o nome do array no local storage
    if(localStorage.hasOwnProperty("array")){
        storageArr = JSON.parse(localStorage.getItem('array'))
        
    }
    //envaindo o valor para o array
    storageArr.push(text)
    //transformando o array para JSON e enviando ao Local Storage
    localStorage.setItem('array', JSON.stringify(storageArr))

    todo.appendChild(todoTitle)

    const doneButton = document.createElement("button")
    doneButton.classList.add("finish-todo")
    doneButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneButton)

    const editButton = document.createElement('button')
    editButton.classList.add("edit-todo")
    editButton.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editButton)

    const deleteButton = document.createElement('button')
    deleteButton.classList.add("remove-todo")
    deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteButton)
    
    
    //inclusao da nova tarefa na lista geral
    todoList.appendChild(todo)
    
    
    //limpar o valor apos digitar e focar no input de texto
    todoInput.value = ""
    todoInput.focus();
    
}

const toggleForms = () => {
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide')
    todoList.classList.toggle('hide')
}
const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo')
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text
        }

    })
}
const hideButton = (button) => {
    button.style.display = 'none';
}
// Eventos
todoForm.addEventListener('submit', (e) => {
    //não enviar o formulario ao pressionar o botão
    e.preventDefault();
    const inputValue = todoInput.value

    if(inputValue){
       saveTodo(inputValue)
    }
})

document.addEventListener('click', (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest('div')

    let todoTitle;

    if(parentEl && parentEl.querySelector('h3')){
        todoTitle = parentEl.querySelector('h3').innerText
    }

    if(targetEl.classList.contains('finish-todo')){
        parentEl.classList.toggle('done')
        //esconder o botao apos finalizar a tarefa
        hideButton(targetEl)
        
    }
    
    if(targetEl.classList.contains('remove-todo')){
        parentEl.remove()
    }

    if(targetEl.classList.contains('edit-todo')){
        toggleForms()
    // mantem os valores no input de edição
    editInput.value = todoTitle
    oldInputValue = todoTitle
    }
})

cancelEditButton.addEventListener('click', (e) =>{
    e.preventDefault()

    toggleForms()
})
editForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
    }
    toggleForms()
})