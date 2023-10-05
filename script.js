const input = document.getElementsByClassName("addInput")[0];
const listContainer = document.getElementsByClassName("listContainer")[0];

function createListItem(taskContent) {
  const listItem = document.createElement("li");
  listItem.textContent = taskContent;

  const deleteButton = document.createElement("span");
  deleteButton.textContent = "✗";
  listItem.appendChild(deleteButton);

  return listItem;
}

if (listContainer) {
  listContainer.addEventListener("click", handleListClick, false);
}

function handleListClick(event) {
  const clickedElement = event.target;

  if (clickedElement.tagName === "LI") {
    clickedElement.classList.toggle("checked");
  } else if (clickedElement.tagName === "SPAN") {
    clickedElement.parentElement.remove();
  }
}

function addTask() {
  const taskInputValue = input.value.trim();

  if (taskInputValue === "") {
    const EMPTY_INPUT_MESSAGE = "Musisz coś wpisać";
    alert(EMPTY_INPUT_MESSAGE);
  } else {
    const listItem = createListItem(taskInputValue);
    if (listContainer) {
      listContainer.appendChild(listItem);
    }
    input.value = "";
  }
}
