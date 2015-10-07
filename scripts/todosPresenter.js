define(["todos"], function(todos) {
	var todoList = document.getElementById("todos-list");
	var todosSelectionContainer = document.getElementById("todos-selection-container");
	var todosFooter = document.getElementById("todos-footer");
	var toggleAll = document.getElementById("toggle-all");

	var selectionType = "all";

	function initialize() {
		var todoInput = document.getElementById("todo-input");
		todoInput.addEventListener("keyup", onTodoKeyup);		
		todosSelectionContainer.addEventListener("click", onSelectionTypeChanging);
		toggleAll.addEventListener("click", onToggledAll);
	}

	function onTodoClick(event) {
		var id = getTodoId(event.currentTarget);
	    todos.toggleTodo(id);
	    showSelection();
	}

	function onSelectionTypeChanging(event) {
		updateSelectionButtonsStyle(event.target);

		selectionType = event.target.dataset.selectionType;
		showSelection(selectionType);		
	}

	function showSelection() {
		switch (selectionType) {
			case "all": 
				showAllTodos();
				break;
			case "active":
				showActiveTodos();
				break;
			case "completed":
				showCompletedTodos();
				break;
		}		
	}

	function onToggledAll() {
		var state = toggleAll.dataset.state
		var newState = state == "active" ? "inactive" : "active";
		toggleAll.dataset.state = newState;
		var isDone = newState == "active";
		todos.setAllTodosDone(isDone);
		updateTodoItemsDone();

		if (isDone)
			toggleAll.classList.add("active");
		else
			toggleAll.classList.remove("active");		
	}

	function updateSelectionButtonsStyle(selectedButton) {
		var selectionButtons = todosSelectionContainer.getElementsByClassName("todos-selection-button");
		Array.prototype.forEach.call(selectionButtons, function(button) {
			button.classList.remove("button-active");
		});
		toggleClass(selectedButton, "button-active", true);
	}

	function showAllTodos() {
		var allTodos = getTodos(function(todoItem) {
			return true;
		});
		setTodosVisibility(allTodos);
	}

	function showActiveTodos() {
		var activeTodos = getTodos(function(todoItem) {
			return !isTodoDone(todoItem)
		});
		setTodosVisibility(activeTodos);
	}

	function showCompletedTodos() {
		var completedTodos = getTodos(function(todoItem) {
			return isTodoDone(todoItem)
		});
		setTodosVisibility(completedTodos);
	}

	function setTodosVisibility(visibleTodos) {
		var allTodos = getAllTodos();
		for (var i = 0; i < allTodos.length; i++) {
			toggleClass(allTodos[i], "hidden", true);
		};
		for (var i = 0; i < visibleTodos.length; i++) {
			toggleClass(visibleTodos[i], "hidden", false);
		};
	}

	function updateTodoItemsDone() {
		var allTodos = getAllTodos();
		for (var i = 0; i < allTodos.length; i++) {
			updateTodoItemDone(allTodos[i]);
		};
		showSelection();
	}

	function updateTodoItemDone(todoItem) {	
		var id = getTodoId(todoItem);
		var todo = todos.getTodo(id);
		var checkbox = document.getElementById(id);
		checkbox.checked = todo.isDone;
	}

	function getTodos(predicate) {
		var allTodos = todoList.getElementsByClassName("todo-item");
		return Array.prototype.filter.call(allTodos, function(todoItem) {
			return predicate(todoItem);
		});
	}

	function getAllTodos() {
		return getTodos(function(todoItem) {
			return true;
		});
	}

	function getTodoId(todoItem) {
		return todoItem.dataset.id;
	}

	function isTodoDone(todoItem) {
		var todo = todos.getTodo(getTodoId(todoItem));
		return todo.isDone;
	}

	function onTodoKeyup(event) {
		if (event.keyCode != 13)
			return;

		var input = event.target;
		var todoName = input.value;
		if (!todoName)
			return;

		if (!todos.count)
			toggleClass(todosFooter, "hidden", false);

		var newTodo = todos.addTodo(todoName);
		
		createTodoItem(newTodo);
	    
	    input.value = "";
	}

	function createTodoItem(todo) {
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.value = todo.isDone;
		checkbox.id = todo.id;
		checkbox.className += " todo-checkbox";

		var label = document.createElement("label")
		label.htmlFor = todo.id;
		label.className += " todo-label";
		label.appendChild(document.createTextNode(todo.name));

		var listItem = document.createElement("li");
		listItem.addEventListener("click", onTodoClick);
		listItem.dataset.id = todo.id;
		listItem.className += " todo-item";

		var div = document.createElement("div");
		div.appendChild(checkbox);
		div.appendChild(label);		
		div.className += " todos-central-container"

		listItem.appendChild(div);	

	    todoList.appendChild(listItem);
	}

	function toggleClass(element, className, set) {
		element.className =  element.className.replace(new RegExp("(?:^| )(" + className + ")(?: |$)"), "");
		if (set)
			element.className += " " + className;
	}

	return {
		initialize: initialize
	};	
	
});