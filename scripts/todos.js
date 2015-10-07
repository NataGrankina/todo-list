define(["arrayHelper"], function(arrayHelper) {
	var todos = [];
	var id = 1;

	function addTodo(name) {
		var todo = { 
				id: id++,
				name: name, 
				isDone: false
			};

		todos.push(todo);
		return todo;
	}

	function getTodo(id) {
		return arrayHelper.first(todos, function(item) {
			return item.id === id;
		});
	}

	function toggleTodo(id)
	{
		var todo = getTodo(id);
		if (todo != null)
			todo.isDone = !todo.isDone;
	}

	function setAllTodosDone(isDone) {
		todos.forEach(function(todo) {
			todo.isDone = isDone;
		});
	}

	function clearCompleted() {
		todos = getItemsLeft();
	}	

	function getItemsLeft() {
		return todos.filter(value => !value.isDone);
	}

	function getCompletedItems() {
		return todos.filter(value =>  value.isDone);
	}	

	return {
		addTodo: addTodo,
		getTodo: getTodo,
		toggleTodo: toggleTodo,
		clearCompleted: clearCompleted,
		getItemsLeft: getItemsLeft,
		getCompletedItems: getCompletedItems,
		get сount() {
			return todos.length;
		},
		setAllTodosDone: setAllTodosDone
	};
});



