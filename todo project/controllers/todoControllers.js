const Todo = require('./../models/todoModel');


const getAllTodos = async (req, res) => {

    try {

        const allTodos = await Todo.find({});

        res.status(200).send({
            status: 200,
            message: 'all todos fetched successfully',
            noOfTodos: allTodos.length,
            todos: allTodos
        });

    } catch (error) {
        res.status(500).send({
            success: true,
            message: error.message,
            data: null
        });
    }

}

const getParticularTodo = async (req, res) => {

    try {

        const taskId = req.params.id;

        if (!taskId) {
            return res.status(404).send({
                success: false,
                message: 'taskID is required',
                data: null
            })
        };

        const task = await Todo.findById(taskId);

        if (!task) {
            return res.status(404).send({
                success: false,
                message: 'there is no task associated with this ID',
                data: null
            })
        };

        res.status(200).send({
            success: false,
            message: `task with ID: ${task._id} has been fetched successfully`,
            data: task
        });

    } catch (error) {
        res.status(500).send({
            success: true,
            message: error.message,
            data: null
        });
    }

}

const addTodo = async (req, res) => {

    try {

        const addNewTask = await Todo.create({
            task: req.body.todoAdd
        });

        res.status(201).send({
            success: true,
            message: 'your task has been created successfully',
            data: {
                newTask: addNewTask
            }
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }

}

const updateTodo = async (req, res) => {

    try {

        const taskId = req.params.id;

        const updatedTaskBody = req.body.updatedTask

        if (!taskId) {
            return res.status(404).send({
                success: false,
                message: 'taskID is required',
                data: null
            })
        };

        const isTaskAvailable = await Todo.findById(taskId);

        if (!isTaskAvailable) {
            return res.status(404).send({
                success: false,
                message: `task with this ID is not available.`,
                data: null
            })
        }

        const updateTask = await Todo.findByIdAndUpdate({ _id: taskId }, { task: updatedTaskBody }, { new: true, runValidators: true });


        res.status(200).send({
            success: true,
            message: 'your task has been updated successfully',
            newTask: updateTask
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });
    }

}

const deleteTodo = async (req, res) => {

    try {

        const taskId = req.params.id;

        if (!taskId) {
            return res.status(404).send({
                success: false,
                message: 'taskID is required',
                data: null
            })
        };

        const isTaskAvailable = await Todo.findById(taskId);

        if (!isTaskAvailable) {
            return res.status(404).send({
                success: false,
                message: `task with this ID is not available.`,
                data: null
            })
        }

        await Todo.findByIdAndDelete({ _id: taskId });

        res.status(200).send({
            success: true,
            message: 'your task has been deleted successfully',
            data: null
        });

    } catch (error) {
        res.status(500).send({
            success: true,
            message: error.message,
            data: null
        });
    }

};


module.exports = {
    getAllTodos,
    getParticularTodo,
    addTodo,
    updateTodo,
    deleteTodo
}