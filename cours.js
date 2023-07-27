document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#submit').addEventListener('click', () => {
        const titleInput = document.querySelector('#title');
        fetch('http://monapi.com/tasks', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
               title: titleInput.value 
            })
        });
    });
});