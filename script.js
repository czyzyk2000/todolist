let input = document.getElementById("myinp");
let listcontainer = document.getElementById("list-container");

function addTask() {
  if (myinp.value === "") {
    alert("Musisz cos wpisac");
  } else {
    let li = document.createElement("li");
    li.innerHTML = input.value;
    listcontainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "✗";
    li.appendChild(span);
  }
  input.value = "";
}
