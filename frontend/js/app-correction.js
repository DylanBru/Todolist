const getTasks = async function(){
    const request = await fetch('http://localhost:8000/api/tasks');
    const tasks = await request.json();

    return tasks;
}

const createTaskElement = (task) => {
    const taskList = document.querySelector('.tasklist');

    const newTaskElement = document.createElement('li');
    newTaskElement.setAttribute('data-id', task.id);

    const textElement = document.createElement('p');
    textElement.textContent = task.title;
    newTaskElement.append(textElement);
    
    const deleteBtnElement = document.createElement('div');
    deleteBtnElement.classList.add('delete');
    newTaskElement.append(deleteBtnElement);

    const editBtnElement = document.createElement('div');
    editBtnElement.classList.add('edit');
    newTaskElement.append(editBtnElement);

    taskList.append(newTaskElement);
};

// const createTaskElement = (task) => {
//     const taskList = document.querySelector('.tasklist');

//     const taskExampleElement = document.querySelector('#task-example');
//     const newTaskElement = taskExampleElement.cloneNode(true);
//     newTaskElement.style.visibility = 'visible';
//     newTaskElement.removeAttribute('id');

//     taskExampleElement.style.visibility = 'hidden';

//     newTaskElement.setAttribute('data-id', task.id);
//     newTaskElement.querySelector('p').textContent = task.title;

//     taskList.append(newTaskElement);
// };

window.addEventListener('DOMContentLoaded', function(){
    getTasks().then((tasks) => {
        tasks.forEach((task) => {
            createTaskElement(task);
        });
    }).catch(() => {
        console.log('Erreur de requête');
    });
});
