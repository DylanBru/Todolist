// V1 pas opti
// function getListTasks() {
    // fetch("http://127.0.0.1:8000/api/tasks")     // Etape 1 : faire la requête
        // .then(response => { // Etape 2 : Réception de la résponse HTTP
            // Extraction du résultat de la réponse
            // Produit une nouvelle promesse que l'on retourne pour chaîner les .then
            // return response.json();
        // }) 
        // .then(listTasks => {   // Etape 3 : Réception du résultat

            // vidange du container
            // let container = document.querySelector("ul");
            // container.textContent = '';
        
            // for (const task of listTasks) {
                // création des éléments
                // const liToAdd = document.createElement('li');
                // liToAdd.setAttribute("id", task['id']);
                // const pToAdd = document.createElement('p');
                // pToAdd.textContent = task['title'];
                // const deleteToAdd = document.createElement('div');
                // deleteToAdd.classList.add("delete");
                // const editToAdd = document.createElement('div');
                // editToAdd.classList.add("edit");
            
                // Imbrication des éléments
    //             liToAdd.append(pToAdd);
    //             liToAdd.append(deleteToAdd);
    //             liToAdd.append(editToAdd);
    //             container.append(liToAdd);
    //         }
    //     })
    // }
    

// getListTasks();






// V2 beaucoup plus opti

// Les const utiles 

const getListTasks = function(){
    return fetch("http://127.0.0.1:8000/api/tasks")     
    .then(response => { 
        return response.json();
    })
}

const deleteTask = function(taskToDeleteId){
    return fetch('http://127.0.0.1:8000/api/tasks/' + taskToDeleteId, {method: 'DELETE'})
}

const container = document.querySelector
("ul");


const deleteContainer = function(){
    container.textContent = '';
}


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



// Afficher la list des tâches
window.addEventListener('DOMContentLoaded', function(){
    getListTasks()
    .then(listTasks => {
        deleteContainer();
        for (const task of listTasks) {
            console.log(task)
            createTaskElement(task);
    }})
    .catch(() => {
        console.log('Erreur de requête lors de l\'affichage des tâches');
    });
})

