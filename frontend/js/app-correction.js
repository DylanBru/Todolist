const DEBUG = true;

const getCategories = async function(){
    const request = await fetch('http://localhost:8000/api/categories');
    const categories = await request.json();

    return categories;
}

const getTasks = async function(){
    const request = await fetch('http://localhost:8000/api/tasks');
    const tasks = await request.json();

    return tasks;
}

const deleteTask = async function(id){
    await fetch('http://localhost:8000/api/tasks/' + id, {
        "method": "DELETE"
    });
};

const createTask = async function(task_title, task_category_id = null){
    const response = await fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: task_title,
            category_id: task_category_id
        })
    });

    // On récupère la tâche qui vient d'être créée
    const data = await response.json();

    // On retourne la tâche au niveau de la fonction
    return data.task;
}

const deleteTaskElement = function(taskElement){
    taskElement.remove();
}

const createTaskElement = (task) => {
    const taskList = document.querySelector('.tasklist');

    const newTaskElement = document.createElement('li');
    newTaskElement.setAttribute('data-id', task.id);

    const textElement = document.createElement('p');
    textElement.textContent = task.title;
    newTaskElement.append(textElement);

    if(task.category){
        const categoryElement = document.createElement('em');
        categoryElement.textContent = task.category.name;
        newTaskElement.append(categoryElement);
    }
    
    const deleteBtnElement = document.createElement('div');
    deleteBtnElement.addEventListener('click', function(){
        if(confirm('Zetes sur de supprimer la tâche ?')){
            deleteTask(task.id).then(() => {
                deleteTaskElement(newTaskElement);
            }).catch(() => {
                alert('La requête de suppression a echoué !');
            });
        }
    });

    deleteBtnElement.classList.add('delete');
    newTaskElement.append(deleteBtnElement);

    const editBtnElement = document.createElement('div');
    editBtnElement.classList.add('edit');
    newTaskElement.append(editBtnElement);

    taskList.append(newTaskElement);
};

/*const createTaskElement = (task) => {
    const taskList = document.querySelector('.tasklist');

    const taskExampleElement = document.querySelector('#task-example');
    const newTaskElement = taskExampleElement.cloneNode(true);
    newTaskElement.style.visibility = 'visible';
    newTaskElement.removeAttribute('id');

    taskExampleElement.style.visibility = 'hidden';

    newTaskElement.setAttribute('data-id', task.id);
    newTaskElement.querySelector('p').textContent = task.title;

    taskList.append(newTaskElement);
};*/

const toggleModal = () => {
    document.querySelector('.modal-dialog').classList.toggle('show');
};

window.addEventListener('DOMContentLoaded', function(){
    getTasks().then((tasks) => {
        tasks.forEach((task) => {
            createTaskElement(task);
        });
    }).catch(() => {
        console.log('Erreur de requête');
    });

    document.querySelector('#create-task-btn').addEventListener('click', () => {
        toggleModal();
    });

    document.querySelector('#close-modal-btn').addEventListener('click', () => {
        toggleModal();
    });

    document.querySelector('#task-create-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        // Je stock la nouvelle tâche dans une constante
        createTask(data.get('title'), data.get('category_id')).then((task) => {
            // Je viens créer un nouvel élément au niveau du DOM pour afficher la tâche
            createTaskElement(task);

            // Je vide le champ avant de fermer la modal
            document.querySelector('#task-title').value = "";

            // Je ferme la modal (le formulaire de création d'une tâche) après la création
            toggleModal();
        }).catch(() => {
            alert('La requête a echoué !');
        });
    });

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
});



