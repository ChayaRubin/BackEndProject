import { getAllTodos, addTodo, updateTodo, deleteTodo, getTodosByUserId } from '../Service/Todos.js'; 

const getTodosByUserIdTo = async (req, res) => {
    const userId = req.params.id;
     console.log('Received request for userId:', userId);
    try {
        const todos = await getTodosByUserId(userId);
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving todos.');
    }
};

const addTodoTo = async (req, res) => {
    const todo = req.body;

    if (!todo || !todo.user_id || !todo.title || typeof todo.completed === 'undefined') {
        console.warn('Missing fields in todo:', todo);
        return res.status(400).send('Missing required fields: user_id, title, completed.');
    }

    try {
        const todoId = await addTodo(todo);
        res.status(201).json({ id: todoId });
    } catch (err) {
        console.error('Error adding todo:', err);
        res.status(500).send('Error adding todo.');
    }
};

const updateTodoTo = async (req, res) => {
    const todoId = req.params.id; 
    const todoBody = req.body;
    try {
        const affectedRows = await updateTodo(todoBody, todoId);
        if (affectedRows > 0) {
            res.status(200).send('Todo updated successfully.');
        } else {
            res.status(404).send('Todo not found.');
        }
    } catch (err) {
        res.status(500).send('Error updating todo.');
    }
};

const deleteTodoTo = async (req, res) => {
    const todoId = req.params.id;
    try {
        const affectedRows = await deleteTodo(todoId);
        if (affectedRows > 0) {
            res.status(200).send('Todo deleted successfully.');
        } else {
            res.status(404).send('Todo not found.');
        }
    } catch (err) {
        res.status(500).send('Error deleting todo.');
    }
};

const getAllTodosTo = async (req, res) => {
    try {
        const todos = await getAllTodos(); 
        res.status(200).json(todos);
    } catch (err) {
        console.error('Error retrieving todos:', err); 
        res.status(500).send('Error retrieving todos.');
    }
};

export {
    getTodosByUserIdTo,
    addTodoTo,
    updateTodoTo,
    deleteTodoTo,
    getAllTodosTo
};
