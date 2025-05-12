import express from 'express'; 
import * as todosController from '../Controllers/Todos.js'; 

const router = express.Router();

router.get("/:id", todosController.getTodosByUserIdTo);
router.post("/", todosController.addTodoTo);
router.put("/:id", todosController.updateTodoTo);
router.delete("/:id", todosController.deleteTodoTo);
export default router; 
