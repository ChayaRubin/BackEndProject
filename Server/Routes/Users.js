import express from 'express'; 
import * as userController from '../Controllers/Users.js'; 

const router = express.Router();
router.get('/get/:name', userController.getUserByNameTo);
router.post("/addUser", userController.addUserTo);

export default router;

