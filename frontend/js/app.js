// Les const utiles 

const container = document.querySelector("ul");

const getListTasks = function(){
    return fetch("http://127.0.0.1:8000/api/tasks")     
    .then(response => {
        return response.json();
    })
}

const getCategories = async function (){
    const request = await fetch("http://127.0.0.1:8000/api/categories");
    const categories = await request.json();
    return categories
}

const deleteTask = function(taskToDeleteId, ){
    return fetch('http://127.0.0.1:8000/api/tasks/' + taskToDeleteId, {method: 'DELETE'})
}

const editTask = async function(taskToEditId, editedTaskTitle, editedTaskCategoryId){
    const response = await fetch('http://127.0.0.1:8000/api/tasks/' + taskToEditId, {
        method:"PUT",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            title: editedTaskTitle,
            category_id: editedTaskCategoryId
         })
    });
    const task = await response.json();
    return task;
}

const postNewTask = async function(newTaskTitle, newTaskCategoryId){
    const request = await fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
           title: newTaskTitle,
           category_id: newTaskCategoryId
        })
    });
    const tasks = await request.json();
    console.log(tasks)
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
            // console.info(res)
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
    editToAdd.addEventListener('click', event => 
    {
        taskToEdit = event.currentTarget.parentNode;
        taskToEditId = taskToEdit.id;
        editTaskTitle = task['title'];
        editTaskCategoryId = task['category']['id'];
        // Affichage du form avec valeurs par défauts pré-sélectionnées
        showEditionForm();
        // Lancer la requête d'édition
        document.querySelector("#submit").addEventListener('click', () => 
        {
            document.querySelector('form').addEventListener('submit', event => 
            {
                event.preventDefault();
            })
            const editedTaskTitle = document.querySelector("#task-title").value;
            const editedTaskCategoryId = document.querySelector("#task-category").value;
            // console.log(editedTaskCategoryId)
            editTask(taskToEditId, editedTaskTitle, editedTaskCategoryId)
            .then((result) => {
                console.log(result);
                unShowFormAddTask();
                showListTasks();
                document.querySelector(".success").removeAttribute("hidden");
            })
            .catch(() => {
                console.log("erreur lors de l'édition de la tâche")
            })
        })
    })

    container.append(liToAdd);
}


// Afficher le formulaire d'édition d'une tâche
const showEditionForm = function(){
    formElements();
    document.querySelector("form h2").textContent=("édition de la tâche : " + editTaskTitle)
    document.querySelector("form button").textContent="éditer"
    document.querySelector("#task-category").value=editTaskCategoryId
    document.querySelector("#task-title").value=editTaskTitle
}

// Afficher le formulaire d'ajout d'une tâche
const formElements = function() {
    document.querySelector("header").classList.add("muted");
    document.querySelector(".create-task-container").classList.add("d-none");
    document.querySelector(".tasklist").classList.add("d-none");
    document.querySelector(".modal-dialog").classList.add("show");
}
const showForm = function() {
    const newTaskButton = document.querySelector("#createTask");

    newTaskButton.addEventListener('click', () => 
    {
        formElements()
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
    // Gestion de la récupération des catégories
    getCategories().then((categories) => {
        categories.forEach((category) => {
            //Insérer au niveau du "select" mes catégories
            const select = document.querySelector('#task-category');
            const newOption = document.createElement('option');
            newOption.setAttribute('value', category.id);
            newOption.textContent = category.name;
            select.append(newOption);
        });
    }).catch(() => {
        console.log("Impossible de récupérer les catégories");
    });
    // Gestion de l'affichage du formulaire d'ajout de tâche
    showForm();
})

// Gestion d'event pour formulaires d'ajout et de modif
document.querySelector("#submit").addEventListener('click', () => 
{
    document.querySelector('form').addEventListener('submit', event => 
    {
        event.preventDefault();
    });
    
    // Gestion d'ajout d'une tâche
    if (document.querySelector("form h2").textContent === "nouvelle tâche") {
        newTaskTitle = document.querySelector("#task-title").value;
        newTaskCategoryId = document.querySelector("#task-category").value;
        // console.log(newTaskCategoryId);
        // console.log(newTaskTitle);
        postNewTask(newTaskTitle, newTaskCategoryId)
        .then (newTask => 
            {
                console.info(newTask);
                unShowFormAddTask();
                showListTasks();
                document.querySelector(".success").removeAttribute("hidden");
            })
        .catch(() => 
        {
            console.log('Erreur de requête lors de l\'ajout de la tâche');
        });
    }

    // Gestion de la modification d'une tâche
    else {

    }
})

