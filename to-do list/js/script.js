let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []

const btnAdd = document.querySelector('.todo__add')
const input = document.querySelector('.todo__text')
const todoItems = document.querySelector('.todo__items')
const todoOptions = document.querySelector('select')



const createTask = (event) =>{
    event.preventDefault()
    if(input.value.trim() !== '' && tasks.every((task) => task.value !== input.value) ){
        const task = {
            value: input.value,
            isCompleted: false,
            time: new Date().toLocaleString(),
        }
        tasks.push(task)
        renderTasks(tasks)
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    input.value = ''
    
}

const renderTasks = (tasks) =>{
    todoItems.innerHTML = ''
    for(let task of tasks){
        const li = document.createElement('li')
        li.classList.add('todo__item')

        const todoTask = document.createElement('span')
        const todoValue = document.createElement('span')
        todoValue.innerText = task.value
        todoValue.classList.add('todo__value')
        todoTask.classList.add('todo__task', task.isCompleted ? 'completed' : 'no-completed')
        todoTask.append(todoValue)
        todoTask.innerHTML += `<span class='todo__date'>${task.time}</span>`
        li.append(todoTask)
        li.innerHTML += `<span class="todo__action todo__action_complete"></span>
        <span class="todo__action todo__action_delete"></span>`
        todoItems.append(li)
    }
}

const implementTask = (event) =>{
    const tag = event.target
    if(tag.classList.contains('todo__action_complete')){
        tasks = tasks.map((task) =>
            task.value === tag.parentNode.querySelector('.todo__value').innerText 
                ?   {
                        ... task,
                        isCompleted: !task.isCompleted,
                    }
                : task
        )
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks(tasks)
}


const removeTask = (event) =>{
    const tag = event.target
    if(tag.classList.contains('todo__action_delete')){
        let newTasks = tasks.filter(task => tag.parentNode.querySelector('.todo__value').innerText !== task.value)
        tasks = newTasks
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks(tasks)
    }
}

const sortActiveTasks = () =>{
    const activeTasks = tasks.filter(task => !task.isCompleted)
    renderTasks(activeTasks)
}

const sortCompletedTasks = () =>{
    const completedTasks = tasks.filter(task => task.isCompleted)
    renderTasks(completedTasks)
}

const sortingTasks = (event) =>{
    if(event.target.value === 'all'){
        renderTasks(tasks)
    } else if (event.target.value === 'active'){
        sortActiveTasks()
    } else if (event.target.value === 'completed'){
        sortCompletedTasks()
    }
}
 
btnAdd.addEventListener('click', createTask)
todoItems.addEventListener('click', removeTask)
todoItems.addEventListener('click', implementTask)
todoOptions.addEventListener('click', sortingTasks)


renderTasks(tasks)

