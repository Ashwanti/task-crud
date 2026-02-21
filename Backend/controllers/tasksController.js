const {  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask } = require('../main/task')

async function getAllTasksController(req, res) {
  try {
    const data = await getAllTasks();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
}

async function getTaskByIdController(req, res) {
  try {
    const id = req.params.id;
    const data = await getTaskById(id);
    res.status(200).json(data);
  } catch (error) {
    const statusCode = error.message.includes("not found") ? 404 : 400;
    res.status(statusCode).json({ message: error.message || "Internal Server Error" });
  }
}

async function createTaskController(req, res) {
  try {
    const taskData = req.body;

    if (!taskData || typeof taskData !== 'object' || Object.keys(taskData).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }
    
    if (!taskData.title) {
      return res.status(400).json({ message: "Task title is required" });
    }
    
    if (typeof taskData.title !== "string" || taskData.title.trim() === "") {
      return res.status(400).json({ message: "Task title must be a non-empty string" });
    }
    
    const data = await createTask(taskData);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message || "Invalid request" });
  }
}

async function updateTaskController(req, res) {
  try {
    const id = req.params.id;
    const taskData = req.body;
    
    if (!taskData || Object.keys(taskData).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty" });
    }
    
    const data = await updateTask(id, taskData);
    res.status(200).json(data);
  } catch (error) {
    const statusCode = error.message.includes("not found") ? 404 : 400;
    res.status(statusCode).json({ message: error.message || "Invalid request" });
  }
}

async function deleteTaskController(req, res) {
  try {
    const id = req.params.id;
    const data = await deleteTask(id)
    res.status(200).json(data);
  } catch (error) {
    const statusCode = error.message.includes("not found") ? 404 : 400;
    res.status(statusCode).json({ message: error.message || "Invalid request" });
  }
}

module.exports = {
  getAllTasksController,
  getTaskByIdController,
  createTaskController,
  updateTaskController,
  deleteTaskController
};
