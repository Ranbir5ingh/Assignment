const express = require("express");
const {
  addTask,
  getTasks,
  getTask,
  toggleCompleteTask,
  updateTask,
  deleteTask,
  clearCompletedTasks,
} = require("../../controllers/task/task-controller");

const router = express.Router();

// Create a new task
router.post("/add", addTask);

// Get all tasks for a user
router.get("/get/:userId", getTasks);

// Get a single task
router.get("/:userId/:taskId", getTask);

// Toggle task completion status
router.put("/toggle-complete", toggleCompleteTask);

// Update task details
router.put("/update", updateTask);

// Clear all completed tasks (must come before similar delete routes)
router.delete("/clear-completed/:userId", clearCompletedTasks);

// Delete a single task
router.delete("/:userId/:taskId", deleteTask);

module.exports = router;