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
const tasks = [];

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
  const filteredTasks = tasks.filter((task) => {
    if (status === "all") {
      return task;
    } else if (status === task.status) {
      return task;
    }
  });

  renderTasks(filteredTasks);
}

function createListItem(taskContent, status) {
  const listItem = document.createElement("li");

  listItem.textContent = taskContent;

  if (status === "completed") {
    listItem.classList.add("completed");
  }

  return listItem;
}

function clearCompletedTasks() {
  const activeTasks = tasks.filter((task) => task.status === "active");
  tasks.length = 0; // Wyczyszczenie tablicy
  tasks.push(...activeTasks); // Dodanie z powrotem aktywnych zadań
  renderTasks(tasks);
}

function createListItem(taskContent, id) {
  const listItem = document.createElement("li");
  listItem.setAttribute("id", id);

  listItem.textContent = taskContent;

  const deleteButton = document.createElement("span");
  deleteButton.textContent = "✗";
  listItem.appendChild(deleteButton);

  return listItem;
}
//////////////////////////////
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
    clickedElement.parentElement.remove();
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
  if (taskInputValue === "") {
    alert("Wprowadzono pusty tekst");
  } else {
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
}
