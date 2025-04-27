import { useEffect, useState } from "react";
import "./index.css";
import TodoFormModel from "./components/TodoFormModel";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  const getTodos = async () => {
    const res = await fetch("http://localhost:5001/api/todos", {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    setTodos(data);
  };

  const closeModel = () => {
    setShowModel(false);
    setEditTodo(null);
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setShowModel(true);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <h1 className="Page-Title">Task Manager</h1>
      <div className="Main-Flex">
        <div className="Sidebar">
          <button
            className="Sidebar-Button Sidebar-Button-Plus"
            onClick={() => setShowModel(true)}
          >
            +
          </button>
          <button className="Sidebar-Button">Overdue</button>
          <button className="Sidebar-Button">Due Today</button>
          <button className="Sidebar-Button">Due This Week</button>
          <button className="Sidebar-Button">Due This Month</button>
          <button className="Sidebar-Button">All Outstanding</button>
          <button className="Sidebar-Button">Completed</button>
        </div>
        <TodoList
          todos={todos}
          onTodoUpdated={getTodos}
          onEditTodo={handleEditTodo}
        />
      </div>

      {showModel && (
        <TodoFormModel
          todo={editTodo}
          onSuccess={() => {
            getTodos();
            closeModel();
          }}
          onClose={closeModel}
        />
      )}
    </>
  );
}

export default App;
