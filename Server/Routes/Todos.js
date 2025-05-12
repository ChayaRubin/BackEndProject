import express from 'express'; 
import * as todosController from '../Controllers/Todos.js'; 

const router = express.Router();

router.get("/:id", todosController.getTodosByUserIdTo);
router.post("/addTodo", todosController.addTodoTo);
router.get("/getAllTodos", todosController.getAllTodosTo);
router.put("/updateTodo/:id", todosController.updateTodoTo);
router.delete("/deleteTodo/:id", todosController.deleteTodoTo);

export default router; 
