import db from '../../DB/dbConnection.js';

const getAllTodos = async () => {
    const [results] = await db.query('SELECT * FROM todos');
    return results;
};

const addTodo = async (todo) => {
    console.log('Inserting todo into DB:', todo);
    const [results] = await db.query('INSERT INTO todos SET ?', todo);
    return results.insertId;
};

const updateTodo = async (todoBody, todoId) => {
    const [results] = await db.query('UPDATE todos SET ? WHERE id = ?', [todoBody, todoId]);
    return results.affectedRows;
};

const deleteTodo = async (todoId) => {
    const [results] = await db.query('DELETE FROM todos WHERE id = ?', [todoId]);
    return results.affectedRows;
};

const getTodosByUserId = async (userId) => {
    const query = 'SELECT * FROM todos WHERE user_id = ?';
    const [rows] = await db.execute(query, [userId]);
    return rows;
};

// ייצוא אחד בלבד – מומלץ באובייקט אחד
export {
    getAllTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    getTodosByUserId
};
