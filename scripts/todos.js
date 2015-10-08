define(["lodash"], function(_) {
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
		return _.find(todos, function(item) {
			return item.id === id;
		});
	}

	function toggleTodo(id)
	{
		var todo = getTodo(id);
		if (todo != null)
			todo.isDone = !todo.isDone;
	}

	function setAllTodosState(isDone) {
		_.forEach(todos, function(todo) {
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

	function removeTodo(id) {
		_.remove(todos, function(todo) {
			return todo.id === id;
		});
	}

	return {
		addTodo: addTodo,
		getTodo: getTodo,
		removeTodo: removeTodo,
		toggleTodo: toggleTodo,
		clearCompleted: clearCompleted,
		getCompletedItems: getCompletedItems,
		get сount() {
			return todos.length;
		},
		get areAllActive() {
			return !(_.some(todos, { isDone: true }));
		},
		get areAllCompleted() {
			return _.some(todos) && !(_.some(todos, { isDone: false }));
		},
		get itemsLeft() {
			return _.where(todos, { isDone: false }).length;
		},
		setAllTodosState: setAllTodosState
	};
});



