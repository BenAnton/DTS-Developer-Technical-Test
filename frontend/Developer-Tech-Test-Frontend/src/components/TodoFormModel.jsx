import { useState, useEffect } from "react";
import "../index.css";

function TodoFormModel({ todo, onSuccess, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const isEditMode = !!todo;

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || "");
      setDescription(todo.description || "");

      if (todo.deadline) {
        const date = new Date(todo.deadline);
        const formattedDate = date.toISOString().split("T")[0];
        setDeadline(formattedDate);
      } else {
        setDeadline("");
      }
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      await fetch(`http://localhost:5001/api/todos/${todo._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, deadline }),
      });
    } else {
      await fetch("http://localhost:5001/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, deadline }),
      });
    }

    setTitle("");
    setDescription("");
    setDeadline("");
    onSuccess();
  };

  return (
    <>
      <div className="Model-Box-Cont">
        <div className="Model-Box">
          <h1 className="Model-Title">
            {isEditMode ? "Update Task" : "Add Task"}
          </h1>
          <form className="Form-Flex" onSubmit={handleSubmit}>
            <input
              className="Model-Box-Item"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <input
              className="Model-Box-Item"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <input
              className="Model-Box-Item"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Deadline"
              required
            />
            <button className="Model-Box-Item Model-Box-Button" type="submit">
              {isEditMode ? "Update Task" : "Add Task"}
            </button>
            <button
              className="Model-Box-Item Model-Box-Button"
              onClick={onClose}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TodoFormModel;
