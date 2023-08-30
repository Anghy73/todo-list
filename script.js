const form = document.querySelector("#form");
const input = document.querySelector("#input");
const list = document.querySelector('.list')
const template = document.querySelector("#template").content;
const fragment = document.createDocumentFragment()


let tasks = {};


document.addEventListener('DOMContentLoaded', paintTasks)

list.addEventListener('click', (e) => {btnAction(e)})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask(e);
});

function addTask(e) {
  const text = e.target.querySelector("input").value;

  if (text.trim() === "") {
    return;
  }

  const task = {
    id: Date.now(),
    text: text,
    status: false,
  };

  tasks[task.id] = task;

  paintTasks()

  form.reset()
  e.target.querySelector('input').focus()
}

function paintTasks() {

  if (Object.values(tasks).length === 0) {
    list.innerHTML = `
      <p>Without Tasks 🔥</p>
    `
    return
  }

  list.innerHTML = ''

  Object.values(tasks).forEach((task) => {
    const clone = template.cloneNode(true)
    clone.querySelector('p').textContent = task.text

    if (task.status) {
      clone.querySelectorAll('.fa-solid')[0].classList.replace('fa-check', 'fa-rotate-left')
      clone.querySelector('p').style.textDecoration = 'line-through'
    }


    clone.querySelectorAll('.fa-solid')[0].dataset.id = task.id
    clone.querySelectorAll('.fa-solid')[1].dataset.id = task.id

    fragment.appendChild(clone)
  })

  list.appendChild(fragment)
}


function btnAction(e) {
  if (e.target.classList.contains('fa-check')) {
    tasks[e.target.dataset.id].status = true
    paintTasks()
  }

  if (e.target.classList.contains('fa-x')) {
    delete tasks[e.target.dataset.id]
    paintTasks()
  }

  if (e.target.classList.contains('fa-rotate-left')) {
    tasks[e.target.dataset.id].status = false
    paintTasks()
  }

  if (e.target.classList.contains('fa-pen')) {
    input.value = tasks[e.target.dataset.id].text
    input.focus()
    delete tasks[e.target.dataset.id]
    paintTasks()
  }

  e.stopPropagation()
}