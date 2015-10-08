define(["todos", "lodash"], function(todos, _) {
	var todosContainer = document.querySelector(".todos-container");
	var todoList = document.querySelector(".todos-list");
	var todosSelectionContainer = document.getElementById("todos-selection-container");
	var toggleAll = document.getElementById("toggle-all");
	var clearCompletedButton = document.querySelector(".todos-cleaner");

	function initialize() {
		var todoInput = document.querySelector(".todo-input > input");
		todoInput.addEventListener("keyup", onTodoKeyup);		
		todosSelectionContainer.addEventListener("click", onSelectionTypeChanging);
		toggleAll.addEventListener("click", onToggledAll);
		clearCompletedButton.addEventListener("click", clearCompleted);
	}

	function onTodoClick(event) {
		var id = getTodoId(event.currentTarget);		

		if (event.target.classList.contains("todo-checkbox")) {			
	    	todos.toggleTodo(id);
	    	toggleCheckedClass(event.currentTarget);
		}

		if (event.target.classList.contains("todo-delete")) {
			todoList.removeChild(event.currentTarget);
			todos.removeTodo(id);
		}
	    
	    updateToggleAllState();
	}

	function clearCompleted() {
		var completedTodos = todos.getCompletedItems();
		var todoItems = document.querySelectorAll(".todo-item");
		var itemsToDelete = [];
		_.forEach(completedTodos, function(todo) {
			var itemToDelete = _.find(todoItems, function(item) {
				return getTodoId(item) === todo.id;
			});
			itemsToDelete.push(itemToDelete);
		});
		_.forEach(itemsToDelete, function(item) {
			todoList.removeChild(item);
		});

		todos.clearCompleted();
		updateToggleAllState();
	}

	function updateToggleAllState(){
		if (todos.areAllCompleted) toggleAll.classList.add("active");
	    else toggleAll.classList.remove("active");

	    var counter = document.querySelector(".todos-counter");
	    counter.innerHTML = todos.itemsLeft + " item(s) left";

	    if (!todos.areAllActive) clearCompletedButton.classList.remove("hidden");
	    else clearCompletedButton.classList.add("hidden");
	}

	function onSelectionTypeChanging(event) {
		if (!event.target.classList.contains("todos-selection-button")) return;

		todosContainer.dataset.selectionType = event.target.dataset.selectionType;
	}

	function onToggledAll() {
		var isDone = !todos.areAllCompleted;
		todos.setAllTodosState(isDone);
		updateTodoItemsDone();
		updateToggleAllState();
	}

	function toggleCheckedClass(todoItem) {
		var id = getTodoId(todoItem);
		var isChecked = todos.getTodo(id).isDone;
	    if (isChecked) todoItem.classList.add("checked");
	    else todoItem.classList.remove("checked");
	}

	function updateTodoItemsDone() {
		var allTodos = document.querySelectorAll(".todo-item");
		for (var i = 0; i < allTodos.length; i++) {
			updateTodoItemDone(allTodos[i]);
		};
	}

	function updateTodoItemDone(todoItem) {	
		var id = getTodoId(todoItem);
		var todo = todos.getTodo(id);
		var checkbox = document.getElementById(id);
		checkbox.checked = todo.isDone;
		toggleCheckedClass(todoItem);
	}

	function getTodoId(todoItem) {
		return parseInt(todoItem.dataset.id);
	}

	function onTodoKeyup(event) {
		if (event.keyCode != 13)
			return;

		var input = event.target;
		var todoName = input.value;
		if (!todoName)
			return;

		var newTodo = todos.addTodo(todoName);		
		createTodoItem(newTodo);
	    
	    input.value = "";
	    updateToggleAllState();
	}

	function createTodoItem(todo) {
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.value = todo.isDone;
		checkbox.id = todo.id;
		checkbox.classList.add("todo-checkbox");

		var label = document.createElement("label")
		label.htmlFor = todo.id;
		label.classList.add("todo-label");
		label.appendChild(document.createTextNode(todo.name));

		var i = document.createElement("i");
		i.classList.add("fa");
		i.classList.add("fa-times");
		i.classList.add("todo-delete");

		var listItem = document.createElement("li");
		listItem.addEventListener("click", onTodoClick);
		listItem.dataset.id = todo.id;
		listItem.classList.add("todo-item");

		var div = document.createElement("div");
		div.appendChild(checkbox);
		div.appendChild(label);	
		div.appendChild(i);

		listItem.appendChild(div);	

	    todoList.appendChild(listItem);
	}

	return {
		initialize: initialize
	};	
	
});