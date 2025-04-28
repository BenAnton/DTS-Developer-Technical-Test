import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

global.fetch = jest.fn();

describe("TodoList Component", () => {
  const mockOnTodoUpdated = jest.fn();
  const mockOnEditTodo = jest.fn();

  const mockTodos = [
    {
      _id: "1",
      title: "Test Todo 1",
      description: "Test Description 1",
      status: "Incomplete",
      deadline: "2025-04-28",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renders todos correctly", () => {
    render(
      <TodoList
        todos={mockTodos}
        onTodoUpdated={mockOnTodoUpdated}
        onEditTodo={mockOnEditTodo}
      />
    );

    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Description 1")).toBeInTheDocument();
    expect(screen.getByText("2025-04-28")).toBeInTheDocument();
  });

  it("Calls handleStatusToggle when checkbox is ticked", async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    render(
      <TodoList
        todos={mockTodos}
        onTodoUpdated={mockOnTodoUpdated}
        onEditTodo={mockOnEditTodo}
      />
    );

    const checkbox = screen.getAllByRole("checkbox");

    expect(fetch).toHaveBeenCalled(
      `http://localhost:5001/api/todos/1`,
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: expect.any(String),
      })
    );

    expect(mockOnTodoUpdated).toHaveBeenCalled();
  });

  it("calls deleteTodo when delele button pressed", async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    render(
      <TodoList
        todos={mockTodos}
        onTodoUpdated={mockOnTodoUpdated}
        onEditTodo={mockOnEditTodo}
      />
    );

    const deleteButton = screen.getByText("Delete");

    fireEvent.click(deleteButton);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5001/api/todos/1`,
      expect.objectContaining({
        method: "DELETE",
      })
    );

    expect(mockOnTodoUpdated).toHaveBeenCalled();
  });

  it("Calls onEditTodo when update button is clicked", () => {
    render(
      <TodoList
        todos={mockTodos}
        onTodoUpdated={mockOnTodoUpdated}
        onEditTodo={mockOnEditTodo}
      />
    );

    const updateButton = screen.getByText("Update");

    fireEvent.click(updateButton);

    expect(mockOnEditTodo).toHaveBeenCalledWith(mockTodos[0]);
  });
});
