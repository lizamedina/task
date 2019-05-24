/**
 *
 *
 * @author carpincho/Victoria/Liza
 * @since 16/04/19.
 * @version 1.0
 */
(() => {
    'use strict';

    const API_URL = 'https://task-backend-fpuna.herokuapp.com/tasks';
    const TASK_STATUS = {
        PENDING: 'PENDIENTE',
        DONE: 'TERMINADO'
    };

    class Task {
        constructor(description) {
            this.id = null;
            this.description = description;
            this.status = TASK_STATUS.PENDING;
            this.date = new Date().toUTCString();
        }
    }

    /**
     * This method is executed once the page have just been loaded and call the service to retrieve the
     * list of tasks
     */
    document.onreadystatechange = () => {

        // TODO ITEM 0: Llamar al API con el método GET para recuperar la lista de tareas existentes.
        //  - Como parámetro `callbackSuccess` envía la función `loadTasks`.
        //  - Como parámetro `callbackError` envía una función que llame al método `showError` enviando un mensaje de
        //    error
        //  - La llamada debe ser asíncrona.
	//Ajax.sendGetRequest(API_URL, {}, MediaFormat.JSON, loadTasks, (text) => showError(1, text), true);	
	//$.get(API_URL, loadTasks);
	    cargaLista()
	//setInterval(function(){ alert("Hello"); }, 3000);
    };
	
   const cargaLista = () => {
	   let lListas = document.getElementsByClassName('listView');
	   if (lListas) {
		   for (var i = 0; i < lListas.lenght; i++) {
			   const element = lListas[i];
			   element.innerHTML = "";
		   }
	   }
	   
	   var param = {}
	   $.get(API_URL, function (valor) {
		   loadTasks(valor);
	   })
   };
	
   const procesar = () => {
	   let limpiarnewTaskInput = document.getElementById("new-task");
	   limpiarnewTaskInput.value = "";
	   cargaLista();
   };

    /**
     * This method displays an error on the page.
     * @param code the status code of the HTTP response.
     * @param text error message
     */
    const showError = (code, text) => {
        // TODO ITEM 6 recuperar el elemento HTML con la clase `error-bar` y modificar el HTML interno de
        // manera a mostrar el mensaje de error.
        // El mensaje de error debe desaparacer luego de 3 segundos.
	// El error debe mostrarse solo por 5 segundos, luego de ésto, debe desaparecer. Agregado para esta tarea
		
		//Se recupera el elemento HTML
		//var contentError = document.getElementsByClassName('error-bar');
		//var modal = document.getElementById('myModal');
		//modal.style.display = "block";
		
		//contentError[0].innerText = text
		//El mensaje de error debe desaparacer luego de 3 segundos
		//setTimeout(function() {
            //borra el mensaje
            //contentError[0].innerText = "";
            //oculta el modal
            //modal.style.display = "none";
        //}, 3000); //3000 milisegundos
	    console.log("showError");
	    
	    let errorBar = document.getElementsByClassName('error-bar')[0];
	    errorBar.innerHTML = `${text}. Codigo error: ${code}`;
	    errorBar.classList.remove('hide-bar');
	    errorBar.classList.add('show-bar');
	    setTimeout(() => {
		    errorBar.classList.remove('show-bar');
		    errorBar.classList.add('hide-bar');
	    },5000);
    };


    /**
     * This method receives the list of tasks and calls the method to add each of them to the page
     *
     * @param array the string coming on the body of the API response
     */
    const loadTasks = (tasks) => {
        //console.log(tasks);
        //let tasks = JSON.parse(array);
        for (let i in tasks) {
            if (tasks.hasOwnProperty(i)) {
                addTaskToList(tasks[i]);
            }
        }
    };


    /**
     * Send the request to the API to create a new task
     *
     * @param e the event from the click on the new item button
     * @return {boolean}
     */
    const addTask = (e) => {
        let newTaskInput = document.getElementById("new-task");
        let content = newTaskInput.value;
        if (content.length === 0) return false;//si la longitud es 0 devuelve false y no hace nada

        e.preventDefault();

        let task = new Task(content);
	//let taskjson = JSON.stringify(task);
        //let task = JSON.parse(content);
        // TODO ITEM 1: Llamar al API con el método POST para crear una nueva tarea.
        //  - Como parámetro `callbackSuccess` envía una función que llame al método `addTaskToList` enviando la
        //    variable `task` y limpia el valor del input#new-task.
        //  - Como parámetro `callbackError` envía una función que llame al método `showError` enviando un mensaje de
        //    error
        //  - La llamada debe ser asíncrona.
        //  - No te olvides de envíar el parámetro `task` para que se cree la tarea.
		
	//Ajax.sendPostRequest(API_URL, task, MediaFormat.JSON, (Task) => addTaskToList(task), (code) => showError(code, 'La tarea no ha podido ser añadida.'), true, MediaFormat.JSON);
        //console.log(task);
        //$.post(`${API_URL}`,  (Task) => addTaskToList(task),taskjson,);

        $.ajax({
                url: API_URL,
                type: 'POST',
                data: JSON.stringify(task),
                contentType:"application/json",
                success: (Task) => addTaskToList(task)
        });
	    //$('#add').on('click', () => {$.post(API_URL, {"description":"wgom"}, 'application/json');});
        //$.post(API_URL, JSON.stringify(task), (Task) => addTaskToList(task), "application/json");
        //document.getElementById('new-task').value = '';
        return false;
    };

    /**
     * This procedure links the new task button the addTask method on the click event.
     */
    let addButtons = document.getElementsByClassName('add');
    for (let i in addButtons)
        addButtons.item(Number(i)).onclick =  (e) => addTask(e);

    /**
     * We associate a function to manipulate the DOM once the checkbox value is changed.
     * Change the task to the completed or incomplete list (according to the status)
     */
    const addOnChangeEvent = (task) => {
		//Obtiene el elemento del checkBox
        const checkBox = document.getElementById(`task-${task.id}`).querySelector('label > input');
        checkBox.onchange = (e) => {
			
	    // TODO ITEM 3: leer el nuevo estado de la tarea (que solo puede ser TERMINADO(true) or PENDIENTE(false)) accediendo a la
            //  propiedad `e.target.checked`. Con éste nuevo dato, debes mostrar la tarea junto con las tareas de su
            //  mismo estado (e.g. si la tarea estaba pendiente pero el usuario hace click en el checkbox, el estado de
            //  la tarea debe cambiar a terminada y debe ahora mostrarse con las otras tareas terminadas).
            // - Una forma de hacerlo es remover directamente el archivo con el id `task-${task.id}` del DOM HTML
            // y luego llamar a la función `addTaskToList` que re-creara la tarea con el nuevo estado en el lugar correcto.
            // - No te olvides de llamar al API (método PUT) para modificar el estado de la tarea en el servidor.
            //*const id = e.target.dataset.id;

            // if (e.target.checked) {

            //     Ajax.sendPutRequest(`${API_URL}/${task.id}` , {status: TASK_STATUS.DONE}, MediaFormat.JSON, 
            //         (CurrentTask) => addTaskToList(JSON.parse(CurrentTask)), 
            //         (code) => showError(code, 'La tarea no ha podido ser modificada.'), true, MediaFormat.JSON);
                
            //      document.getElementById(`task-${task.id}`).remove();
            // } 
            // else {
            //     Ajax.sendPutRequest(`${API_URL}/${task.id}` , {status: TASK_STATUS.PENDING}, MediaFormat.JSON, 
            //         (CurrentTask) => addTaskToList(JSON.parse(CurrentTask)), 
            //         (code) => showError(code, 'La tarea no ha podido ser modificada.'), true, MediaFormat.JSON);
                
            //      document.getElementById(`task-${task.id}`).remove();
            // }
            const newState = e.target.checked;

            $.ajax({
                url: `${API_URL}/${task.id}`,
                type: 'PUT',
                data: JSON.stringify({status: newState ? 'TERMINADO' : 'PENDIENTE'}),
                contentType: "application/json",
                success: function(task){
                    $(`#task-${task.id}`).remove();
                    addTaskToList(task);
                }
            });

        };
    };

    /**
     * This method modifies the DOM HTML to add new items to the task list.
     * @param task the new task.
     */
    const addTaskToList = (task) => {
        let newItem = document.createElement('li');
        newItem.setAttribute('id', `task-${task.id}`);

        let label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" ${task.status === TASK_STATUS.DONE ? "checked" : ""}/> ${task.description}`;

        let editButton = document.createElement('button');
        editButton.innerText = 'Editar';
        editButton.classList.add('edit');
        editButton.setAttribute('data-id', task.id);
        editButton.onclick = (e) => editTask(e);

        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Borrar';
        deleteButton.classList.add('delete');
        deleteButton.setAttribute('data-id', task.id);
        deleteButton.onclick = (e) => removeTask(e);

        newItem.appendChild(label);
        newItem.appendChild(editButton);
        newItem.appendChild(deleteButton);

        if (task.status  === TASK_STATUS.PENDING)
            document.getElementById('incomplete-tasks').appendChild(newItem);
        else
            document.getElementById('completed-tasks').appendChild(newItem);

        addOnChangeEvent(task);
    };


    /**
     * This method modifies the DOM HTML to display a form that allow the user to change the
     * task description and send a PUT request to modify it on the server side
     *
     * @param e
     */
    const editTask = (e) => {
        // We retrieve the value of the attribute data-id;
        const id = e.target.dataset.id;

        let currentDOMTask = document.getElementById(`task-${id}`);
        currentDOMTask.querySelector("label > input[type=checkbox]").remove();

        let currentTask = new Task(currentDOMTask.querySelector("label").innerHTML.trim());
        currentTask.id = id;

        currentDOMTask.querySelector('label').remove();

        let inputText = document.createElement('input');
        inputText.setAttribute('id', `task-edit-${currentTask.id}`);
        inputText.setAttribute('type', 'text');
        inputText.setAttribute('value', currentTask.description);

        /**
         * We associate the event click on the button ok, to send a PUT request to the server.
         */
        let buttonOK = document.createElement('button');
        buttonOK.innerText = 'OK';
        buttonOK.setAttribute('id', `ok-button-${currentTask.id}`);
        buttonOK.onclick = () => {
        currentTask.description = document.getElementById(`task-edit-${currentTask.id}`).value;

            // TODO ITEM 2: llamar a la API con el método PUT cuando la descripción de la tarea es
            //  modificada (`currentTask`).
            //  - Como parámetro `callbackSuccess` envía una función que llame al método `revertHTMLChangeOnEdit`
            //    enviando la variable `currentTask`.
            //  - Como parámetro `callbackError` envía una función que llame al método `showError` enviando un mensaje de
            //    error
            //  - La llamada debe ser asíncrona.
            //  - No te olvides de envíar el parámetro para que se cree la tarea.

            //Ajax.sendPutRequest(`${API_URL}/${currentTask.id}` , currentTask, MediaFormat.JSON, (currentTask) => revertHTMLChangeOnEdit(currentTask), (code) => showError(1, 'La tarea no ha podido ser modificada.'), true, MediaFormat.JSON);
            $.ajax({
                url: `${API_URL}/${currentTask.id}`,
                type: 'PUT',
                data: JSON.stringify({description: currentTask.description}),
                contentType: "application/json",
                success: (Task) => revertHTMLChangeOnEdit(currentTask)
            });
        };

        let buttonCancel = document.createElement('button');
        buttonCancel.innerText = 'Cancel';
        buttonCancel.setAttribute('id', `cancel-button-${currentTask.id}`);
        buttonCancel.onclick = () => revertHTMLChangeOnEdit(currentTask);

        currentDOMTask.insertBefore(buttonCancel, currentDOMTask.children[0]);
        currentDOMTask.insertBefore(buttonOK, currentDOMTask.children[0]);
        currentDOMTask.insertBefore(inputText, currentDOMTask.children[0]);

        currentDOMTask.querySelector('.edit').style.visibility = 'hidden';
        currentDOMTask.querySelector('.delete').style.visibility = 'hidden';

        inputText.focus();
    };
    
     /**
     * This method removes the form displayed to edit the task and show it as a task item.
     * @param currentTask the string coming from the API
     */
    const revertHTMLChangeOnEdit = (currentTask) => {
        //console.log(currentTask instanceof Task);
        let task = currentTask instanceof Task ? currentTask : JSON.parse(currentTask);
        //let task = JSON.parse(currentTask);
        //let task = currentTask;

        let currentDOMTask = document.getElementById(`task-${task.id}`);
        currentDOMTask.querySelector('input[type=text]').remove();

        let label = document.createElement('label');

        currentDOMTask.insertBefore(label, currentDOMTask.children[0]);
        label.innerHTML = `<input type="checkbox"/> ${task.description}`;
        addOnChangeEvent(task);

        currentDOMTask.insertBefore(label, currentDOMTask.children[0]);
        currentDOMTask.querySelector(`button#ok-button-${task.id}`).remove();
        currentDOMTask.querySelector(`button#cancel-button-${task.id}`).remove();

        currentDOMTask.querySelector('.edit').style.visibility = 'visible';
        currentDOMTask.querySelector('.delete').style.visibility = 'visible';
    };


    /**
     * This methods removes the task item associated to the DOM of the page
     * @param id the identifier from the task
     */
    const removeTaskFromList = (id) => {
        // TODO ITEM 4: remover del DOM HTML el elemento con id `task-${id}`
	 $(`#task-${id}`).remove();
    };

    /**
     * This method sends a DELETE request to remove the task from the server.
     * @param e
     */
    const removeTask = (e) => {
        const id = e.target.dataset.id;
		//let param = {}
        // Ajax.sendDeleteRequest(API_URL+'/'+id, param, MediaFormat.JSON, (valor) => loadLst(), 
        //    (error) => showError(error, 'No fue posible eliminar la tarea.'), true);
        // TODO ITEM 5: enviar una petición DELETE al API con el {id} de la tarea.
        //   - Como parámetro `callbackSuccess` enviar una función que llamé al método `removeTaskFromList`
        //     enviando el id de la tarea.
        //   - Como parámetro `callbackError` enviar una función que llame al método `showError` enviando
        //     un mensaje de error
        //   - La llamada debe ser asíncrona.
	$.ajax({
		url: `${API_URL}/${id}`,
		type: 'DELETE',
		datatype: 'json';
		contentType: 'application/json',
		success: removeTaskFromList(id)
	});
    };
})(jQuery);
