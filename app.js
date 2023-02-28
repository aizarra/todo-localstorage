window.addEventListener('load', () => {
  //window object is a global object in JavaScript that represents the current browsing window or tab. The window.addEventListener method is used to attach an event listener to the load event of the window object. This means that the code inside the callback function will run when the page has finished loading.
  todos = JSON.parse(localStorage.getItem('todos')) || []; //Gets the "todos" array from local storage and parses it from a JSON string to a JavaScript object. If there is no "todos" array in local storage, it initializes an empty array.
  const nameInput = document.querySelector('#name'); //Finds the input element with the ID "name" and stores it in the constant "nameInput".
  const todoList = document.querySelector('#todo-list'); //Finds the div element with the ID "todo-list" and stores it in the constant "todoList".
  const newTodoForm = document.querySelector('#new-todo-form'); //Finds the form element with the ID "new-todo-form" and stores it in the constant "newTodoForm".

  const username = localStorage.getItem('username') || ''; //Gets the "username" value from local storage. If there is no "username" value in local storage, it initializes an empty string.

  nameInput.value = username; //Sets the value of the "nameInput" element to the value of the "username" variable.

  nameInput.addEventListener('change', (e) => {
    localStorage.setItem('username', e.target.value);
  }); //Adds an event listener to the "nameInput" element, which listens for the "change" event (when the user changes the value of the input field) and sets the username in the local storage.

  newTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    }; //Adds an event listener to the "newTodoForm" element, which listens for the "submit" event (when the user submits the form) and creates the todo object with four properties: content, category, done and createdAt.

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
    e.target.reset();

    DisplayTodos();
  });
});

function DisplayTodos() {
  const todoList = document.querySelector('#todo-list'); //Finds the div element with the ID "todo-list" and stores it in the constant "todoList".

  todoList.innerHTML = '';

  todos.sort((a, b) => a.createdAt - b.createdAt); //sort by createdAt

  todos.forEach((todo) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const edit = document.createElement('button');
    const deleteButton = document.createElement('button');

    input.type = 'checkbox';
    input.checked = todo.done;
    span.classList.add('bubble');

    if (todo.category == 'personal') {
      span.classList.add('personal');
    } else {
      span.classList.add('trabajo');
    }

    content.classList.add('todo-content');
    actions.classList.add('actions');
    edit.classList.add('edit');
    deleteButton.classList.add('delete');

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = 'Editar';
    deleteButton.innerHTML = 'Borrar';

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add('done');
    }

    input.addEventListener('click', (e) => {
      todo.done = e.target.checked;
      localStorage.setItem('todos', JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add('done');
      } else {
        todoItem.classList.remove('done');
      }

      DisplayTodos();
    });
    edit.addEventListener('click', (e) => {
      const input = content.querySelector('input');
      input.removeAttribute('readonly');
      input.focus();
      input.addEventListener('blur', (e) => {
        input.setAttribute('readonly', true);
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();
      });
    });
    deleteButton.addEventListener('click', (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      DisplayTodos();
    });
  });
}
