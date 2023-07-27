// Les const utiles 

const container = document.querySelector("ul");

const getListTasks = function(){
    return fetch("http://127.0.0.1:8000/api/tasks")     
    .then(response => {
        return response.json();
    })
}

const deleteTask = function(taskToDeleteId){
    return fetch('http://127.0.0.1:8000/api/tasks/' + taskToDeleteId, {method: 'DELETE'})
}

const postNewTask = async function(newTaskTitle){
    const request = await fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
           title: newTaskTitle 
        })});
    const tasks = await request.json();
    return tasks;
}

const deleteContainer = function(){
    container.textContent = '';
}

// Création de l'élément task à afficher dans la liste des task
const createTaskElement = (task) => {
    const liToAdd = document.createElement('li');
    liToAdd.setAttribute("id", task['id']);

    const pToAdd = document.createElement('p');
    pToAdd.textContent = task['title'];
    const emToAdd = document.createElement('em');
    emToAdd.textContent = task['category']['name'];
    emToAdd.classList.add("position-absolute");
    emToAdd.classList.add("start-50");
    pToAdd.append(emToAdd);
    liToAdd.append(pToAdd);

    const deleteToAdd = document.createElement('div');
    deleteToAdd.classList.add("delete");
    liToAdd.append(deleteToAdd);
    deleteToAdd.addEventListener('click', event => {
        // récupération de l'element qu'il faudra suppr
        taskToDelete = event.currentTarget.parentNode;
        // récupération de l'id
        taskToDeleteId = taskToDelete.id;
        // console.log(taskToDeleteId)
        deleteTask(taskToDeleteId)
        .then((res) => {
            console.info(res)
            taskToDelete.remove()
            }
            )
        .catch(() => {
            console.log("erreur lors de la suppression de la tâche")
        })
    })
    const editToAdd = document.createElement('div');
    editToAdd.classList.add("edit");
    liToAdd.append(editToAdd);

    container.append(liToAdd);
}

// Afficher le formulaire d'ajout d'une tâche
const showFormAddTask = function(){
    const newTaskButton = document.querySelector("#createTask");

    newTaskButton.addEventListener('click', () => 
    {
        document.querySelector("header").classList.add("muted");
        document.querySelector(".create-task-container").classList.add("d-none");
        document.querySelector(".tasklist").classList.add("d-none");
        document.querySelector(".modal-dialog").classList.add("show");
    },
)}

// Désaficher le formulaire d'ajout d'une tâche
const unShowFormAddTask = function ()
{
    document.querySelector("header").classList.remove("muted");
    document.querySelector(".create-task-container").classList.remove("d-none");
    document.querySelector(".tasklist").classList.remove("d-none");
    document.querySelector(".modal-dialog").classList.remove("show");
}

// Gestion de l'affichage de la liste des tâches
const showListTasks = function()
    {
    getListTasks()
    .then(listTasks => 
        {
        deleteContainer();
        for (const task of listTasks) {
            // console.log(task)
            createTaskElement(task);
        }})
    .catch(() => 
    {
        console.log('Erreur de requête lors de l\'affichage des tâches');
    });
    }


window.addEventListener('DOMContentLoaded', function (){
    // Gestion de l'affichage de la liste des tâches
    showListTasks();
    // Gestion de l'affichage du formulaire d'ajout de tâche
    showFormAddTask();
})

// Gestion d'ajout d'une tâche
document.querySelector("#submit").addEventListener('click', () => 
    {
        document.querySelector('form').addEventListener('submit', event => 
        {
            event.preventDefault();
        });

        newTaskTitle = document.querySelector("#task-title").value;
        // console.log(newTaskTitle);
        postNewTask(newTaskTitle)
        .then (newTask => 
            {
                unShowFormAddTask();
                showListTasks();
                document.querySelector(".success").removeAttribute("hidden");

                console.info(newTask);
                
                // Gestion de l'affichage du formulaire d'ajout de tâche
                // showFormAddTask();
                // location.reload();
                // createTaskElement(newTask)
                // document.querySelector(".success").removeAttribute("hidden");
                // Désactiver l'affichafe du formulaire pour retourner sur la liste des tâches
            })
        .catch(() => 
        {
            console.log('Erreur de requête lors de l\'ajout de la tâche');
        });
    })