const Task = require("../../models/Task");
const User = require("../../models/User");

// add task
const addTask = async (req, res) => {
  const { userId, taskData } = req.body;

  try {
    // Check if user exists
    const checkUser = await User.findById(userId);
    if (!checkUser)
      return res.status(404).json({
        success: false,
        message: "User doesn't exist!",
      });

    // Create new task
    const newTask = new Task({
      user: userId,
      title: taskData.title,
      completed: taskData.completed || false,
      // No need to manually add createdAt as timestamps will handle it
    });

    // Save to database
    await newTask.save();

    // Get updated tasks
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Task added successfully",
      data: tasks,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// get all tasks
const getTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if user exists
    const checkUser = await User.findById(userId);
    if (!checkUser)
      return res.status(404).json({
        success: false,
        message: "User doesn't exist!",
      });

    // Get all tasks for the user
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// get single task
const getTask = async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    // Find the task
    const task = await Task.findOne({
      _id: taskId,
      user: userId,
    });

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });

    res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// toggle task completion
const toggleCompleteTask = async (req, res) => {
  const { userId, taskId } = req.body;

  try {
    // Find the task
    const task = await Task.findOne({
      _id: taskId,
      user: userId,
    });

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });

    // Toggle completed status
    task.completed = !task.completed;
    await task.save();

    // Get updated tasks
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: tasks,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// update task
const updateTask = async (req, res) => {
  const { userId, taskId, title, completed } = req.body;

  try {
    // Find the task
    let task = await Task.findOne({
      _id: taskId,
      user: userId,
    });

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });

    // Update fields if provided
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    await task.save();

    // Get updated tasks
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: tasks,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// delete task
const deleteTask = async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    // Find the task
    const task = await Task.findOne({
      _id: taskId,
      user: userId,
    });

    if (!task)
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    // Get updated tasks
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: tasks,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

// clear completed tasks
const clearCompletedTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    // Delete all completed tasks
    await Task.deleteMany({
      user: userId,
      completed: true,
    });

    // Get remaining tasks
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Completed tasks cleared successfully",
      data: tasks,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = {
  addTask,
  getTasks,
  getTask,
  toggleCompleteTask,
  updateTask,
  deleteTask,
  clearCompletedTasks,
};