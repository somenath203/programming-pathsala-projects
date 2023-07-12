const router = require('express').Router();

const { getAllTodos, getParticularTodo, addTodo, updateTodo, deleteTodo } = require('../controllers/todoControllers');


router.get('/get-all-todos', getAllTodos);

router.get('/get-part-todo/:id', getParticularTodo);

router.post('/add-todo', addTodo);

router.put('/update-todo/:id', updateTodo);

router.delete('/delete-todo/:id', deleteTodo);


module.exports = router;