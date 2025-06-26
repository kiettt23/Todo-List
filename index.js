// Select DOM
const todoList = document.querySelector(".task-list");
const filterOption = document.querySelector("#filter");
const form = document.querySelector(".form");
const taskInput = document.querySelector("#newitem");

function markDone(todoLi) {
    todoLi.classList.toggle("done");// Dùng toggle để check hoặc uncheck
}

function removeTask(todoLi) {
    todoLi.classList.add("fall");// Add hiệu ứng fall
    todoLi.addEventListener("transitionend", () => todoLi.remove());// Hiệu ứng rơi xong mới remove tag li = todo list
}

function filterTasks(hideCompletedTasks){
    todoList.querySelectorAll("li").forEach((todoLi) => {
        if (todoLi.classList.contains("done")){
            todoLi.style.display = hideCompletedTasks ? "none" : "flex";// Logic ở chỗ giấu đi và hiển thị lại chứ thật chất không delete, làm vậy sẽ phức tạp hơn và không đúng logic
        }
    })
}

function addTask(taskLabel){
    const todoLi = document.createElement("li");// Do biến todoLi chưa có trên trang
    
    // Add các Element cho todoLi
    const labelSpan = document.createElement("span");
    labelSpan.className = "label";
    labelSpan.textContent = taskLabel;
    todoLi.appendChild(labelSpan);

    const divActions = document.createElement("div");
    divActions.className = "actions";
    // Tag input và button giống nhau ở mọi thẻ khác nên copy được
    divActions.innerHTML = 
    `<input type="checkbox" class="btn-action btn-action-done">
    <button class="btn-action btn-action-delete">✘</button>`;
    todoLi.appendChild(divActions);

    todoList.appendChild(todoLi);// Add biến vào toàn cục
}

// Mark done & Remove a task
todoList.addEventListener("click", (e) => {
    const element = e.target; // .target in ra element được click vào
    if (element.classList[1] === "btn-action-done"){
        markDone(element.parentNode.parentNode);// ParentNode để class "done" nhảy 2 bật lên chỗ tag li
    } else if (element.classList[1] === "btn-action-delete"){
        removeTask(element.parentNode.parentNode)
    }
})

// Filter tasks
filterOption.addEventListener("click", (e) => {
    filterTasks(e.target.checked);
})

// Add a new task
form.addEventListener("submit", (e) => {
    e.preventDefault();// Chặn behavior của form khi nhắn submit sẽ bị error
    const taskLabel = taskInput.value.trim();// Loại các dấu cách khi người dùng text
    if (taskLabel) {
        addTask(taskLabel);
        taskInput.value = "";// Để label trống sau khi submit
    }
})











