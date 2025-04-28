/* eslint-env jest */

const handleStatusToggle = async (todo, onTodoUpdated) => {
  const updatedStatus = todo.status === "Complete" ? "Incomplete" : "Complete";

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

//   ******************************************************

global.fetch = jest.fn();

describe("handleStatusToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should send a PUT request and call onTodoUpdated", async () => {
    const mockTodo = {
      _id: "1",
      title: "Test 1",
      description: "Test Description 1",
      status: "Incomplete",
      deadline: "2025-04-27",
    };

    const mockTodoUpdated = jest.fn();

    fetch.mockResolvedValueOnce({ ok: true });

    await handleStatusToggle(mockTodo, mockTodoUpdated);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5001/api/todos/1`,
      expect.objectContaining({
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: expect.any(String),
      })
    );

    expect(mockTodoUpdated).toHaveBeenCalled();
  });

  it("should log an error if fetch fails", async () => {
    const mockTodo = {
      _id: "2",
      title: "Test 2",
      description: "Test Description 2",
      status: "Complete",
      deadline: "2025-04-26",
    };

    const mockTodoUpdated = jest.fn();

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    fetch.mockResolvedValueOnce({ ok: false });

    await handleStatusToggle(mockTodo, mockTodoUpdated);

    expect(consoleSpy).toHaveBeenCalled();
    expect(mockTodoUpdated).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
