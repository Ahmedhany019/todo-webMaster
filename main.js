let input = document.querySelector("input[type='text']")
input.setAttribute("placeholder","Dont give up")
let addItem = document.querySelector(".add")
let updateItem = document.querySelector(".update")
let tasks = document.querySelector(".tasks")
let currentTaskId = null;

// Create Task 
const createTask = (taskData)=>{

    // Create Task Element
let task = document.createElement("div")
task.classList.add("task","fade-in")
const taskId = taskData.id || Date.now()
task.setAttribute("data-id",taskId)

let firstDiv = document.createElement("div")
let secondDiv = document.createElement("div")

// Create Inner Element


let parag = document.createElement("p")
parag.classList.add("para")
parag.setAttribute("title","if u finished the task u just could click here")
let deleteItem = document.createElement("button")
deleteItem.classList.add('delete')
let editItem = document.createElement("button")
editItem.classList.add('edit')

// Create Inner Text
let paragText = document.createTextNode(taskData.text || input.value)
let deleteText = document.createTextNode("Delete")
let editText = document.createTextNode("Edit")

// Push Elements & Texts
parag.appendChild(paragText)
deleteItem.appendChild(deleteText)
editItem.appendChild(editText)
firstDiv.appendChild(parag)
secondDiv.appendChild(deleteItem)
secondDiv.appendChild(editItem)
task.appendChild(firstDiv)
task.appendChild(secondDiv)
tasks.appendChild(task)

}
// Add Task
const addTaskToList = ()=>{

    if(input.value.length > 0){
        const taskData = {id:Date.now(),text:input.value,completed:false}
        createTask(taskData)
//LocalStorage Function
addToLocalStorage(taskData)
// Clear Input
input.value = ""
// Alert
alert("Add successfully u can do it")
// focus Input
input.focus()
}else{
    window.alert("must write something")
}  
}
// Click On Add
addItem.addEventListener("click",addTaskToList)

const addToLocalStorage = (taskData)=>{

    // Get task from localStorage or create an empty array
let storedTasks = JSON.parse(localStorage.getItem("task")) || []

// Add the new task to the array
storedTasks.push(taskData)

// Save array to localStorage
localStorage.setItem("task", JSON.stringify(storedTasks))

}
// Clicking Function
document.addEventListener("click",function(e){
// Click on Delete
if(e.target.classList.contains("delete")){
    deleteTask(e)
}
// Click on Edit
if(e.target.classList.contains("edit")){
    editTask(e)
}
// Click On Update Btn
if(e.target.classList.contains("update")){
    updateTask()
}
// Click On Text To Completed it
if(e.target.classList.contains("para")){
    completedTask(e)
}
})
// ##########Start Functionality#############
// UpdateTask Function 
const updateTask = ()=>{
    const task = JSON.parse(localStorage.getItem("task")) || []
    const taskId = task.find((id)=> id.id == currentTaskId)
    if(input.value.length > 0){
        taskId.text = input.value
        addItem.style.display ='block'
        updateItem.style.display ='none'
        localStorage.setItem('task',JSON.stringify(task))
        input.value = ""
        tasks.innerHTML = "";
    renderTasksFromLocalStorage();
    alert("Are u sure u wanna update it?")
    }else{
        window.alert("must write something")
    }
}
// Edit Task
const editTask = (e)=>{
    addItem.style.display ='none'
    updateItem.style.display ='block'
    const task = e.target.closest('.task')
    const taskId = task.getAttribute("data-id")
    const getTask = JSON.parse(localStorage.getItem("task"))
    const displayTask = getTask.find((task)=> task.id === parseInt(taskId))

    if(displayTask){
        input.value = displayTask.text
    }
    currentTaskId = taskId
}
// Delete Task
const deleteTask = (e)=>{
    const task = e.target.closest('.task')
        const taskId = task.getAttribute("data-id")
        if(task){
            task.classList.add("hide");
            setTimeout(() => {
                task.remove();
                window.alert("deleted successfully")
            }, 500);
        }
        deleteFromLocalStorage(taskId)
}
// Completed Task
const completedTask = (e)=>{
    const closest = e.target.closest(".task")
    const getAttribute = closest.getAttribute("data-id")
    const task = JSON.parse(localStorage.getItem("task")) ||[];
    const taskId = task.find((id)=> id.id == getAttribute)
    if(taskId){
        taskId.completed = !taskId.completed
        e.target.classList.toggle("completed")
        localStorage.setItem("task",JSON.stringify(task))
        if(taskId.completed){
            alert("Greaaatttt keep going dude♥")
        }
    }
}
// delete the task from local storage
const deleteFromLocalStorage = (taskId)=>{

    const deletedTasks = JSON.parse(localStorage.getItem("task")) || []

    const updatedTasks = deletedTasks.filter((task)=> task.id !== parseInt(taskId))

    localStorage.setItem('task',JSON.stringify(updatedTasks))

}
const renderTasksFromLocalStorage = () => {
    let storedTasks = JSON.parse(localStorage.getItem("task")) || [];
    storedTasks.forEach((taskData)=> {
        createTask(taskData);
        if(taskData.completed){
            const taskElement = document.querySelector(`[data-id="${taskData.id}"] .para`);
            taskElement.classList.add("completed");
        }
    })
    
};
// ##########End Functionality#############
// Render tasks on page load
document.addEventListener("DOMContentLoaded", renderTasksFromLocalStorage)