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
                liToAdd.setAttribute("id", task['id']);
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
    

    //idées pour supprimer tache :
    // function deleteTask() {
    //     sélectionner tous les boutons "delete"
    //     eventlistnere sur les boutons "poubelles" qui active le fetch en delete 
    //     sélectionner tous les "li"
    //     sélectionner le bon "li" à supprimer en comparant avec le bon delete via le chemin du DOM "firstElementChild[id]"
    // }
    

getListTasks();
// deleteTask();
