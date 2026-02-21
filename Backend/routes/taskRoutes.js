const express = require('express');
const { getAllTasksController, getTaskByIdController, createTaskController, updateTaskController, deleteTaskController } = require('../../Backend/controllers/tasksController');

const router = express.Router();

router.get('/task', getAllTasksController)

router.get('/task/:id', getTaskByIdController)

router.post('/task', createTaskController)

router.put('/task/:id', updateTaskController)

router.delete('/task/:id', deleteTaskController)

module.exports = router;