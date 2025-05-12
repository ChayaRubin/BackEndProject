import express from 'express'; 
import * as userController from '../Controllers/Users.js'; 

const router = express.Router();

router.post("/login", userController.loginUser);
router.get("/get/:name", userController.GetUserByNameTo);
router.post("/addUser", userController.addUserTo);

export default router;
