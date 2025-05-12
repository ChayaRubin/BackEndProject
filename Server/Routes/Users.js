import express from 'express'; 
import * as userController from '../Controllers/Users.js'; 

const router = express.Router();
router.post("/", userController.addUserTo);
router.get('/:name', userController.getUserByNameTo);

export default router;

