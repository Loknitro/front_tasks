const taskInput = document.getElementById("task")
const taskList = document.getElementById("task_list")

taskInput.addEventListener("keyup", function(event) {
    if (event.key == "Enter" && taskInput.value.trim() !== "") {
        const taskText = taskInput.value
        const li = document.createElement("li")
        li.innerHTML = `
        <span>${taskText}</span>
        <img src="edit.png" title="Edit Task" class="edit_icon">
        <img src="done.png" title="Task Done" class="done_icon">
        `;
        taskList.appendChild(li)
        taskInput.value = "";
    }
});

taskList.addEventListener("click", function(event) {
    const target = event.target;
  
    if (target.classList.contains("done_icon")) {
        target.parentElement.remove();
    } else if (target.classList.contains("edit_icon")) {
        const taskSpan = target.previousElementSibling;
        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.className = "edit_input"
        textInput.value = taskSpan.textContent;
        taskSpan.textContent = "";
        taskSpan.appendChild(textInput);
        textInput.focus();

        textInput.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                taskSpan.textContent = textInput.value;
                textInput.remove();
            }
        });
        
        textInput.addEventListener("blur", function() {
            taskSpan.textContent = textInput.value;
            textInput.remove();
        });
    }
});