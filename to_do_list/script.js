const taskInput = document.getElementById("inputer")
const taskList = document.getElementById("task_list")

taskInput.addEventListener("keyup", function(event) {
    if (event.key == "Enter" && taskInput.value.trim() !== "") {
        const taskText = taskInput.value
        const li = document.createElement("li")
        li.innerHTML = `
        <span>${taskText}</span>
        <img src="edit.png" title="Edit Task" class="edit-icon">
        <img src="done.png" title="Task Done" class="done-icon">
        `;
        taskList.appendChild(li)
        taskInput.value = "";
    }
});

taskList.addEventListener("click", function(event) {
    const target = event.target;
  
    if (target.classList.contains("done-icon")) {
        target.parentElement.remove();
    } else if (target.classList.contains("edit-icon")) {
        const taskSpan = target.previousElementSibling;
        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.className = "edit_input"
        textInput.value = taskSpan.textContent;
        taskSpan.textContent = ""; // Clear span content
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