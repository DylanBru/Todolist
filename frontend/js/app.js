function getListTasks() {
    fetch("http://127.0.0.1:8000/api/tasks")     // Etape 1 : faire la requête
        .then(response => { // Etape 2 : Réception de la résponse HTTP
            // Extraction du résultat de la réponse
            // Produit une nouvelle promesse que l'on retourne pour chaîner les .then
            return response.json();
        }) 
        .then(listTasks => {   // Etape 3 : Réception du résultat

            // vidange du container
            let container = document.querySelector("ul");
            container.textContent = '';
        
            for (const task of listTasks) {
                // création des éléments
                const liToAdd = document.createElement('li');
                const pToAdd = document.createElement('p');
                pToAdd.textContent = task['title'];
                const deleteToAdd = document.createElement('div');
                deleteToAdd.classList.add("delete");
                const editToAdd = document.createElement('div');
                editToAdd.classList.add("edit");
            
                // Imbrication des éléments
                liToAdd.append(pToAdd);
                liToAdd.append(deleteToAdd);
                liToAdd.append(editToAdd);
                container.append(liToAdd);
            }
        })
}

getListTasks();
