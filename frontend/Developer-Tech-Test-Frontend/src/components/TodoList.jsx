import "../index.css";

function TodoList({ todos, onTodoUpdated, onEditTodo }) {
  const handleStatusToggle = async (todo) => {
    const updatedStatus =
      todo.status === "Complete" ? "Incomplete" : "Complete";

    try {
      const response = await fetch(
        `http://localhost:5001/api/todos/${todo._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: todo.title,
            description: todo.description,
            status: updatedStatus,
            deadline: todo.deadline,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update Task");
      }

      onTodoUpdated();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5001/api/todos/${id}`, {
      method: "DELETE",
    });

    onTodoUpdated();
    console.log(todos);
  };

  return (
    <>
      <ul className="Todo-List-Ul">
        {todos.map((todo) => (
          <li className="Todo-Card-Flex" key={todo._id}>
            <input
              type="checkbox"
              checked={todo.status === "Complete"}
              onChange={() => handleStatusToggle(todo)}
            />
            <h3 className="Todo-Text">{todo.title}</h3>
            <p className="Todo-Text">{todo.description}</p>
            <p>{todo.deadline}</p>
            <div className="Todo-List-Button-Div">
              <button
                className="Model-Box-Button"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
              <button
                className="Model-Box-Button"
                onClick={() => onEditTodo(todo)}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
