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

    if (!activity)
      return setErrorMessage("Need to fill the todo activity field first");

    // edit todo function
    if (editTodo.id) {
      const updatedTodo = {
        ...editTodo,
        activity,
      };

      const editTodoIndex = todos.findIndex((todo) => todo.id == editTodo.id);

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      setTodos(updatedTodos);

      return cancelEditHandler();
    }

    // add todo function
    setTodos([
      ...todos,
      {
        id: generateId(),
        activity,
        isDone: false,
      },
    ]);
    setActivity("");
    setErrorMessage("");
  }

  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEditTodo(todo);
  }

  function deleteTodoHandler(todoId) {
    const filteredTodos = todos.filter((todo) => todo.id != todoId);
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
      isDone: !todo.isDone,
    };

    const editTodoIndex = todos.findIndex((todo) => todo.id == editTodo.id);

    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;
    setTodos(updatedTodos);
  }

  return (
    <>
      <h1>Simple Todo List</h1>
      <form onSubmit={saveTodoHandler}>
        <input
          type="text"
          placeholder="Todo activity"
          onChange={(event) => setActivity(event.target.value)}
          value={activity}
        />
        <button type="submit">{editTodo.id ? "Save" : "Add"}</button>
        {editTodo.id && (
          <button onClick={cancelEditHandler}>Cancel Edit</button>
        )}
      </form>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  type={"checkbox"}
                  value={todo.isDone}
                  onChange={() => toggleTodoIsDone(todo)}
                />
                {todo.activity}
                <br />
                <button onClick={() => editTodoHandler(todo)}>Edit</button>
                <br />
                <button onClick={() => deleteTodoHandler(todo.id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No activities today</div>
      )}
    </>
  );
}

ReactDOM.render(<App />, root);
