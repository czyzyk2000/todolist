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
let tasks = [];

function renderTasks(filteredTasks) {
  listContainer.innerHTML = "";

  filteredTasks.forEach((task) => {
    const listItem = createListItem(task.title, task.status);
    listContainer.appendChild(listItem);
  });
}

clearCompletedButton.addEventListener("click", function () {
  clearAllTasks();
});

function clearAllTasks() {
  tasks.length = 0;
  renderTasks([]);
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
  });

  taskEdit.addEventListener("click", function () {
    if (taskEdit.innerText === "Edit") {
      taskName.contentEditable = true;
      const selection = window.getSelection(); // zazaczenie tekstu
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
        if (task.id === +listItem.id) {
          task.title = newTaskName;
        }
        return task;
      });
    }
  });

  return listItem;
}

function clearCompletedTasks() {
  const activeTasks = tasks.filter((task) => task.status === "active");
  tasks.length = 0; // Wyczyszczenie tablicy
  tasks.push(...activeTasks); // Dodanie z powrotem aktywnych zadań
  renderTasks(activeTasks);
}

if (listContainer) {
  listContainer.addEventListener("click", handleListClick);
}

function handleListClick(event) {
  const clickedElement = event.target;

  if (clickedElement.tagName === "LI") {
    clickedElement.classList.toggle("checked");
    tasks.map((task) => {
      if (task.id === +clickedElement.id) {
        task.status = task.status === "active" ? "completed" : "active";
      }
      return task;
    });
  } else if (clickedElement.tagName === "SPAN") {
    // New Logic: Ensuring task removal from array
    tasks = tasks.filter(
      (task) => task.id !== +clickedElement.parentElement.id
    );
    clickedElement.parentElement.remove();
  }
}

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

// Modified Function: Naming and added empty string check
function addTask() {
  const taskInputValue = input.value.trim();

  // Added: Check for empty string
  if (!taskInputValue) {
    alert("Please enter non-empty text");
    return; // Exit function early to prevent further execution
  }

  const id = new Date().valueOf();
  const listItem = createListItem(taskInputValue, id);

  tasks.push({
    id: id,
    title: taskInputValue,
    status: "active",
  });

  if (listContainer) {
    listContainer.appendChild(listItem);
  }
  input.value = "";
}
