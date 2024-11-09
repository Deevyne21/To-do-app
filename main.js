// Select elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const filter = document.getElementById('filter');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add event listeners
addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskActions);
filter.addEventListener('change', filterTasks);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const timestamp = new Date().toLocaleString();
    createTaskElement(taskText, timestamp);

    saveTaskToLocalStorage(taskText, timestamp);
    taskInput.value = '';
  }
}

function createTaskElement(taskText, timestamp, completed = false) {
  const task = document.createElement('li');
  task.className = 'task';
  if (completed) task.classList.add('completed');

  // <button class="edit">✏</button>
  //  <button class="delete">🗑</button>

  task.innerHTML = `
        <div class="text">
            <input type="checkbox" class="checkbox" ${
              completed ? 'checked' : ''
            }>
            <span>${taskText}</span>
            <span class="timestamp">${timestamp}</span>
        </div>
        <button class="edit">Edit</button>
        <button class="delete">🗑</button>
    `;

  taskList.appendChild(task);
  task
    .querySelector('.checkbox')
    .addEventListener('change', () => toggleTaskCompletion(task, taskText));
}

function handleTaskActions(e) {
  const task = e.target.closest('.task');
  const taskText = task.querySelector('.text span').textContent;

  if (e.target.classList.contains('delete')) {
    removeTaskFromLocalStorage(taskText);
    task.remove();
  } else if (e.target.classList.contains('edit')) {
    const newText = prompt('Edit your task:', taskText);
    if (newText && newText !== taskText) {
      updateTaskInLocalStorage(taskText, newText);
      task.querySelector('.text span').textContent = newText;
    }
  }
}

function toggleTaskCompletion(task, taskText) {
  const isCompleted = task.classList.toggle('completed');
  task.querySelector('.checkbox').checked = isCompleted;
  updateTaskCompletionInLocalStorage(taskText, isCompleted);
}

function saveTaskToLocalStorage(taskText, timestamp, completed = false) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, timestamp, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) =>
    createTaskElement(task.text, task.timestamp, task.completed)
  );
}

function removeTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(oldText, newText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map((task) => {
    if (task.text === oldText) task.text = newText;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskCompletionInLocalStorage(taskText, completed) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map((task) => {
    if (task.text === taskText) task.completed = completed;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks() {
  const filterValue = filter.value;
  const tasks = document.querySelectorAll('.task');

  tasks.forEach((task) => {
    const isCompleted = task.classList.contains('completed');
    if (
      filterValue === 'all' ||
      (filterValue === 'completed' && isCompleted) ||
      (filterValue === 'pending' && !isCompleted)
    ) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  });
}

function saveTaskToLocalStorage(taskText, timestamp, completed = false) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, timestamp, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) =>
    createTaskElement(task.text, task.timestamp, task.completed)
  );
}

function removeTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(oldText, newText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map((task) => {
    if (task.text === oldText) task.text = newText;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks() {
  const filterValue = filter.value;
  const tasks = document.querySelectorAll('.task');

  tasks.forEach((task) => {
    const isCompleted = task.classList.contains('completed');
    if (
      filterValue === 'all' ||
      (filterValue === 'completed' && isCompleted) ||
      (filterValue === 'pending' && !isCompleted)
    ) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  });
}

// // Select elements
// const taskInput = document.getElementById('taskInput');
// const addTaskButton = document.getElementById('addTaskButton');
// const taskList = document.getElementById('taskList');

// // Load tasks from local storage
// document.addEventListener('DOMContentLoaded', loadTasks);

// // Add event listeners
// addTaskButton.addEventListener('click', addTask);
// taskList.addEventListener('click', handleTaskActions);

// function addTask() {
//   const taskText = taskInput.value.trim();
//   if (taskText) {
//     createTaskElement(taskText);
//     saveTaskToLocalStorage(taskText);
//     taskInput.value = '';
//   }
// }

// function createTaskElement(taskText, completed = false) {
//   const task = document.createElement('li');
//   task.className = 'task';
//   if (completed) task.classList.add('completed');
//   task.innerHTML = `
//     <span>${taskText}</span>
//     <button class="delete">Delete</button>
// `;
//   task.addEventListener('click', () => toggleTaskCompletion(task, taskText));
//   taskList.appendChild(task);
// }

// function handleTaskActions(e) {
//   if (e.target.classList.contains('delete')) {
//     const task = e.target.parentElement;
//     removeTaskFromLocalStorage(task.firstChild.textContent);
//     task.remove();
//   }
// }

// function toggleTaskCompletion(task, taskText) {
//   task.classList.toggle('completed');
//   updateTaskCompletionInLocalStorage(
//     taskText,
//     task.classList.contains('completed')
//   );
// }

// function saveTaskToLocalStorage(taskText, completed = false) {
//   let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//   tasks.push({ text: taskText, completed });
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function loadTasks() {
//   let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//   tasks.forEach((task) => createTaskElement(task.text, task.completed));
// }

// function removeTaskFromLocalStorage(taskText) {
//   let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//   tasks = tasks.filter((task) => task.text !== taskText);
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function updateTaskCompletionInLocalStorage(taskText, completed) {
//   let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//   tasks = tasks.map((task) => {
//     if (task.text === taskText) task.completed = completed;
//     return task;
//   });
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }
