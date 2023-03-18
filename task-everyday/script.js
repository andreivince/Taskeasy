const now = new Date()
const tomorrow = new Date(+1)
const untilTomorrow = tomorrow - now


// Get references to the input and output elements
const newTaskInput = document.getElementById('new_task');
const taskListOutput = document.getElementById('output');

// Load the tasks from localStorage on page load
window.addEventListener('load', loadTasks);

// Add event listener to the "Enter" button
document.getElementById('enter-button').addEventListener('click', addTask);

// Function to load tasks from localStorage
// Function to load tasks from localStorage
function loadTasks() {
    // Get the tasks from localStorage as a JSON string
    const tasksJSON = localStorage.getItem('tasks');
  
    // If tasks exist in localStorage, parse them and add them to the task list
    if (tasksJSON !== null) {
      const tasks = JSON.parse(tasksJSON);
  
      for (const task of tasks) {
        addTaskToList(task.taskText);
      }
    }
  }
  
  // Function to add a new task to the task list
  function addTaskToList(taskText) {
    // Create a new list item element
    const newTaskListItem = document.createElement('li');
  
    // Set the text of the list item to the task text
    newTaskListItem.innerText = taskText;
  
    // Create "delete" and "hide" buttons for the task
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
      // Remove the task from the task list and local storage
      newTaskListItem.remove();
      removeTaskFromLocalStorage(taskText);
    });
  
    const hideButton = document.createElement('button');
    hideButton.innerText = 'Hide';
    hideButton.addEventListener('click', () => {
      // Hide the task for 5 seconds
      newTaskListItem.style.display = 'none';
      setTimeout(() => {
        newTaskListItem.style.display = 'block';
      }, 500);
    });
  
    // Add the buttons to the task list item
    newTaskListItem.appendChild(deleteButton);
    newTaskListItem.appendChild(hideButton);
  
    // Add the list item to the task list output
    taskListOutput.appendChild(newTaskListItem);
  }
  
// Function to add a new task to the list
function addTask() {
  // Get the value of the input field
  const taskText = newTaskInput.value;

  // Add the new task to the local storage
  addTaskToLocalStorage(taskText);

  // Add the new task to the task list
  addTaskToList(taskText);

  // Clear the input field
  newTaskInput.value = '';
}

// Function to add a new task to the local storage
function addTaskToLocalStorage(taskText) {
  // Get the existing tasks from localStorage as a JSON string
  const tasksJSON = localStorage.getItem('tasks');

  // If no tasks exist in localStorage, create an empty array
  let tasks = [];

  if (tasksJSON !== null) {
    tasks = JSON.parse(tasksJSON);
  }

  // Add the new task to the tasks array
  tasks.push(taskText);

  // Save the updated tasks to localStorage as a JSON string
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task to the task list
function addTaskToList(taskText) {
  // Create a new list item element
  const newTaskListItem = document.createElement('li');

  // Set the text of the list item to the task text
  newTaskListItem.innerText = taskText;

  // Create "delete" and "hide" buttons for the task
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', () => {
    // Remove the task from the task list and local storage
    newTaskListItem.remove();
    removeTaskFromLocalStorage(taskText);
  });

  const hideButton = document.createElement('button');
  hideButton.innerText = 'Hide';
  hideButton.addEventListener('click', () => {
    // Hide the task for 5 seconds
    newTaskListItem.style.display = 'none';
    setTimeout(() => {
      newTaskListItem.style.display = 'block';
    }, 500);
  });

  // Add the buttons to the task list item
  newTaskListItem.appendChild(deleteButton);
  newTaskListItem.appendChild(hideButton);

  // Add the list item to the task list output
  taskListOutput.appendChild(newTaskListItem);
}

// Function to remove a task from the local storage
function removeTaskFromLocalStorage(taskText) {
  // Get the existing tasks from localStorage as a JSON string
  const tasksJSON = localStorage.getItem('tasks');

  // If no tasks exist in localStorage, return
  if (tasksJSON === null) {
    return;
  }

  // Parse the tasks JSON string into an array
  const tasks = JSON.parse(tasksJSON);

  // Find the index of the task to remove
  const taskIndex = tasks.indexOf(taskText);

}
// If the task is not found, return