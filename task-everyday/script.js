function display() {
    // Get the input element and its value
    const input = document.querySelector('input');
    const value = input.value;

    // Create a new list item element and a checkbox element
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const delete_button = document.createElement('input')
    delete_button.type = 'button';
    delete_button.value = 'X';

    // Add the checkbox and text to the list item
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(value));
    li.appendChild(delete_button)
    
    

    // Add the new list item to the existing list
    const ul = document.getElementById('output');
    ul.appendChild(li);

    // Clear the input field
    input.value = '';

    // Listen for change event on checkbox and remove li if checked
    delete_button.addEventListener('click', function() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const index = tasks.indexOf(li.textContent);
        if (index > -1) {
          tasks.splice(index, 1);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.remove();
      });


    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            li.remove();
          }
        });

    // Store task in local storage and retrieve tasks from local storage
    if (value) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(value);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// This function is called every 5000 milliseconds. It retrieves tasks from local storage
// and adds them to the list if they are not already present. If the checkbox is checked or
// the delete button is clicked, the task is removed from the list and from local storage, respectively.
function everyday() {
    const ul = document.getElementById('output');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        // Check if task is already in the list
        const taskExists = [...ul.children].some(function(li) {
            return li.textContent === task;
        });
        if (!taskExists) {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            const delete_button = document.createElement('input')
            delete_button.type = 'button';
            delete_button.value = 'X';
            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(task));
            li.appendChild(delete_button);
            ul.appendChild(li);
            delete_button.addEventListener('click', function() {
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const index = tasks.indexOf(li.textContent);
                if (index > -1) {
                  tasks.splice(index, 1);
                }
                localStorage.setItem('tasks', JSON.stringify(tasks));
                li.remove();
              });

            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    li.remove();
                }
            });
        }
    });
}

const now = new Date();
const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
const timeUntilTomorrow = tomorrow - now;
setInterval(everyday, timeUntilTomorrow);
