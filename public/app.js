const root = document.querySelector("#root");
function App() {
  const [activity, setActivity] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [editTodo, setEditTodo] = React.useState({});
  const [todos, setTodos] = React.useState([]);
  function generateId() {
    return Date.now();
  }
  function saveTodoHandler(event) {
    event.preventDefault();
    "";
    if (!activity) return setErrorMessage("Need to fill the todo activity field first");

    // edit todo function
    if (editTodo.id) {
      const updatedTodo = {
        ...editTodo,
        activity
      };
      const editTodoIndex = todos.findIndex(todo => todo.id == editTodo.id);
      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      setTodos(updatedTodos);
      return cancelEditHandler();
    }

    // add todo function
    setTodos([...todos, {
      id: generateId(),
      activity,
      isDone: false
    }]);
    setActivity("");
    setErrorMessage("");
  }
  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEditTodo(todo);
  }
  function deleteTodoHandler(todoId) {
    const filteredTodos = todos.filter(todo => todo.id != todoId);
    setTodos(filteredTodos);
    if (editTodo.id) cancelEditHandler();
  }
  function cancelEditHandler() {
    setActivity("");
    setErrorMessage("");
    setEditTodo({});
  }
  function toggleTodoIsDone(todo) {
    const updatedTodo = {
      ...todo,
      isDone: !todo.isDone
    };
    const editTodoIndex = todos.findIndex(todo => todo.id == editTodo.id);
    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;
    setTodos(updatedTodos);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Simple Todo List"), /*#__PURE__*/React.createElement("form", {
    onSubmit: saveTodoHandler
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Todo activity",
    onChange: event => setActivity(event.target.value),
    value: activity
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, editTodo.id ? "Save" : "Add"), editTodo.id && /*#__PURE__*/React.createElement("button", {
    onClick: cancelEditHandler
  }, "Cancel Edit")), errorMessage && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "red"
    }
  }, errorMessage), todos.length > 0 ? /*#__PURE__*/React.createElement("ul", null, todos.map(todo => {
    return /*#__PURE__*/React.createElement("li", {
      key: todo.id
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      value: todo.isDone,
      onChange: () => toggleTodoIsDone(todo)
    }), todo.activity, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      onClick: () => editTodoHandler(todo)
    }, "Edit"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      onClick: () => deleteTodoHandler(todo.id)
    }, "Delete"));
  })) : /*#__PURE__*/React.createElement("div", null, "No activities today"));
}
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);