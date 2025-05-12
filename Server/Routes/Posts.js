import express from 'express';
import * as PostsController from '../Controllers/Posts.js'; 

const router = express.Router();

router.get('/:userId', PostsController.getPostByUserIdTO);
router.post('/', PostsController.addPostTO);
router.put("/:id", PostsController.updatePostTO);
router.delete("/:id", PostsController.deletePostTo);
export default router;


