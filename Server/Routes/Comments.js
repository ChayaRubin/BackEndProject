import express from 'express';
import * as CommentsController from '../Controllers/Comments.js';

const router = express.Router();

router.get('/:id', CommentsController.getCommentsForPostTo);
// router.get('/:id', CommentsController.getCommentByIdTo);
router.post('/', CommentsController.addCommentToPostTo);
router.put('/:id', CommentsController.updateCommentTo);
router.delete('/:id', CommentsController.deleteCommentTo);

export default router;