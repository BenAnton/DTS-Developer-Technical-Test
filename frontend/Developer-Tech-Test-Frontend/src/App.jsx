import { useEffect, useState } from "react";
import "./index.css";
import TodoFormModel from "./components/TodoFormModel";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const getTodos = async () => {
    const res = await fetch("http://localhost:5001/api/todos", {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    setTodos(data);

    applyFilter(activeFilter, data);
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
    const loadData = async () => {
      await getTodos();
      applyFilter("All", todos);
    };

    loadData();
  }, []);

  const applyFilter = (filter, todoData = todos) => {
    setActiveFilter(filter);

    switch (filter) {
      case "Incomplete":
        setFilteredTodos(
          todoData.filter((todo) => todo.status === "Incomplete")
        );
        break;

      case "Complete":
        setFilteredTodos(todoData.filter((todo) => todo.status === "Complete"));
        break;

      case "All":
      default:
        setFilteredTodos(todoData);
        break;
    }
  };

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
          <button
            className={`Sidebar-Button ${
              activeFilter === "All" ? "active-filter" : ""
            }`}
            onClick={() => applyFilter("All")}
          >
            All
          </button>
          <button
            className={`Sidebar-Button ${
              activeFilter === "Incomplete" ? "active-filter" : ""
            }`}
            onClick={() => applyFilter("Incomplete")}
          >
            Incomplete
          </button>
          <button
            className={`Sidebar-Button ${
              activeFilter === "Complete" ? "active-filter" : ""
            }`}
            onClick={() => applyFilter("Complete")}
          >
            Complete
          </button>
        </div>
        <TodoList
          todos={filteredTodos}
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
