document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.getElementById("add-task");
    const taskInput = document.getElementById("new-task");
    const taskList = document.getElementById("todo-list");

    // Función para agregar tareas
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const li = document.createElement("li");
        li.innerHTML = `${taskText} <button class="delete-btn">X</button>`;

        taskList.appendChild(li);
        taskInput.value = "";

        // Evento para eliminar tarea
        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
        });
    };

    // Agregar tarea al hacer click en el botón
    addTaskButton.addEventListener("click", addTask);

    // Agregar tarea al presionar Enter
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });
});
