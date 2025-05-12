import express from 'express';
import * as PostsController from '../Controllers/Posts.js'; 

const router = express.Router();

router.get('/getAllPosts', PostsController.getAllPostsTo);
router.get('/getById/:id', PostsController.getPostByIdTO);
router.get('/getByUserId/:userId', PostsController.getPostByUserIdTO);
router.post('/addPost', PostsController.addPostTO);
router.put("/updatePost/:id", PostsController.updatePostTO);
router.delete("/deletePost/:id", PostsController.deletePostTo);

export default router;


