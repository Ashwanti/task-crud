const Task = require("../models/taskModel");

async function getAllTasks() {
  try {
    const allTasks = await Task.find();
    return allTasks;
  } catch (error) {
    throw new Error(`Failed to retrieve tasks: ${error.message}`);
  }
}

async function getTaskById(id) {
  try {
    if (!id) {
      throw new Error("Task ID is required");
    }
    const task = await Task.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (error) {
    throw new Error(`Failed to retrieve task: ${error.message}`);
  }
}

async function createTask(taskData) {
  try {
    if (!taskData || !taskData.title) {
      throw new Error("Task title is required");
    }
    if (typeof taskData.title !== "string" || taskData.title.trim() === "") {
      throw new Error("Task title must be a non-empty string");
    }
    const newTask = await Task.create(taskData);
    return newTask;
  } catch (error) {
    throw new Error(`Failed to create task: ${error.message}`);
  }
}

async function updateTask(id, taskData) {
  try {
    if (!id) {
      throw new Error("Task ID is required");
    }
    if (!taskData || Object.keys(taskData).length === 0) {
      throw new Error("Update data is required");
    }
    const updatedTask = await Task.findByIdAndUpdate(id, taskData, { new: true });
    if (!updatedTask) {
      throw new Error("Task not found");
    }
    return updatedTask;
  } catch (error) {
    throw new Error(`Failed to update task: ${error.message}`);
  }
}

async function deleteTask(id) {
  try {
    if (!id) {
      throw new Error("Task ID is required");
    }
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      throw new Error("Task not found");
    }
    return deletedTask;
  } catch (error) {
    throw new Error(`Failed to delete task: ${error.message}`);
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
