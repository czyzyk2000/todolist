let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.querySelector(".addInput");
const listContainer = document.querySelector(".listContainer");
const completedListContainer = document.querySelector(
  ".completedListContainer"
);
const allButton = document.querySelector(".allButton");
const clearCompletedButton = document.querySelector(".clearCompleted");

allButton.addEventListener("click", function () {
  filterTasks("all");
});

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filteredTasks) {
  listContainer.innerHTML = "";

  filteredTasks.forEach((task) => {
    const listItem = createListItem(task.title, task.id, task.status);
    listContainer.appendChild(listItem);
  });
}

clearCompletedButton.addEventListener("click", function () {
  clearCompletedTasks();
});

function clearCompletedTasks() {
  tasks = tasks.filter((task) => task.status === "active");
  renderTasks(tasks);
  saveTasksToLocalStorage();
}

function filterTasks(status) {
  const filteredTasks = tasks.filter(
    (task) => status === "all" || status === task.status
  );
  renderTasks(filteredTasks);
}

function createListItem(taskContent, id, status) {
  const listItem = document.createElement("li");
  listItem.setAttribute("id", id);

  const taskContainer = document.createElement("div");

  const taskName = document.createElement("div");
  taskName.textContent = taskContent;

  const deleteButton = document.createElement("span");
  deleteButton.textContent = "✗";

  const taskEdit = document.createElement("button");
  taskEdit.textContent = "Edit";
  taskEdit.classList.add("edit");

  taskContainer.appendChild(taskName);
  taskContainer.appendChild(deleteButton);

  listItem.appendChild(taskContainer);
  listItem.appendChild(taskEdit);

  if (status === "completed") {
    listItem.classList.add("completed");
  }

  deleteButton.addEventListener("click", function () {
    // Usuwanie całego zadania po kliknięciu "✗"
    listItem.remove();
    tasks = tasks.filter((task) => task.id !== id);
    saveTasksToLocalStorage();
  });

  taskEdit.addEventListener("click", function () {
    if (taskEdit.innerText === "Edit") {
      taskName.contentEditable = true;
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(taskName);
      selection.removeAllRanges();
      selection.addRange(range);
      taskEdit.innerText = "Save";
    } else {
      taskName.contentEditable = false;
      taskEdit.innerText = "Edit";

      const newTaskName = taskName.textContent.trim();

      tasks = tasks.map((task) => {
        if (task.id === id) {
          task.title = newTaskName;
        }
        return task;
      });

      saveTasksToLocalStorage();
    }
  });

  return listItem;
}

if (listContainer) {
  listContainer.addEventListener("click", handleListClick);
}

function handleListClick(event) {
  const clickedElement = event.target;

  if (clickedElement.tagName === "LI") {
    clickedElement.classList.toggle("checked");
    tasks = tasks.map((task) => {
      if (task.id === +clickedElement.id) {
        task.status = task.status === "active" ? "completed" : "active";
      }
      return task;
    });

    saveTasksToLocalStorage();
  } else if (clickedElement.tagName === "SPAN") {
    clickedElement.parentElement.remove();
    tasks = tasks.filter(
      (task) => task.id !== +clickedElement.parentElement.id
    );
    saveTasksToLocalStorage();
  }
}

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

function addTask() {
  const taskInputValue = input.value.trim();

  if (!taskInputValue) {
    alert("Please enter non-empty text");
    return;
  }

  const id = new Date().valueOf();
  const listItem = createListItem(taskInputValue, id, "active");

  tasks.push({
    id: id,
    title: taskInputValue,
    status: "active",
  });

  if (listContainer) {
    listContainer.appendChild(listItem);
  }

  saveTasksToLocalStorage();
  input.value = "";
}
