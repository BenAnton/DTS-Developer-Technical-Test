const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Create a Todo
router.post("/", async (req, res) => {
  try {
    const { title, description, status, deadline } = req.body;

    const newTodo = new Todo({
      title,
      description,
      status,
      deadline,
    });

    const todo = await newTodo.save();
    console.log("Saved Todo: ", todo);

    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read All Todo's
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a Todo using ID
router.put("/:id", async (req, res) => {
  try {
    const { title, description, status, deadline } = req.body;

    const updatedFields = {
      title,
      description,
      status,
      deadline: deadline || undefined,
    };

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      {
        new: true,
      }
    );

    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Todo by ID
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
