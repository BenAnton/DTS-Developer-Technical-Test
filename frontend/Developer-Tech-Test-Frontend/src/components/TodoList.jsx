import "../index.css";

function TodoList({ todos, onTodoUpdated, onEditTodo }) {
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5001/api/todos/${id}`, { method: "DELETE" });
    onTodoUpdated();
    console.log(todos);
  };

  return (
    <>
      <ul className="Todo-List-Ul">
        {todos.map((todo) => (
          <li className="Todo-Card-Flex" key={todo._id}>
            <input type="radio" />
            <h3 className="Todo-Text">{todo.title}</h3>
            <p className="Todo-Text">{todo.description}</p>
            <p>
              {todo.deadline
                ? new Date(todo.deadline).toLocaleDateString()
                : "No Deadline"}
            </p>
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
