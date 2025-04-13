const express = require("express");
const {
  addTask,
  getTasks,
  toggleCompleteTask,
  updateTask,
  deleteTask,
  clearCompletedTasks,
} = require("../../controllers/task/task-controller");

const router = express.Router();

router.post("/add", addTask);
router.get("/get/:userId", getTasks);
router.put("/toggle-complete", toggleCompleteTask);

// Update task details
router.put("/update", updateTask);
router.delete("/clear-completed/:userId", clearCompletedTasks);
router.delete("/:userId/:taskId", deleteTask);

module.exports = router;