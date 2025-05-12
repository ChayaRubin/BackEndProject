import {
    addComment,
    getCommentsByPostId,
    updateComment,
    deleteComment,
    getCommentById
  } from '../Service/Comments.js';
  
  export const getCommentsForPostTo = (req, res) => {
    console.log('Received request for postId:', req);
    const postId = req.params.id;
    getCommentsByPostId(postId)
      .then(comments => res.json(comments))
      .catch(() => res.status(500).send('Error retrieving comments.'));
  };
  
export const addCommentToPostTo = (req, res) => {
    console.log('Received request to add comment:', req.body);  

    const { name, email, body } = req.body;  
console.log('Received request to add comment:', name, email, body); 
    const comment = {
        post_id: req.body.post_id,  
        name,
        email,
        body
    };

    addComment(comment)
        .then(id => res.status(201).json({ id }))
        .catch((err) => {
            console.error('Error adding comment:', err);
            res.status(500).send('Error adding comment.');
        });
};

export const updateCommentTo = async (req, res) => {
  const comment = req.body;
  const id = req.params.id;

  try {
    const existing = await getCommentById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Comment not found.' });
    }

    const affectedRows = await updateComment(comment, id);

    if (affectedRows > 0) {
      return res.status(200).json({ message: 'Comment updated.' });
    } else {
      return res.status(400).json({ message: 'No changes made to the comment.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error updating comment', error: error.message });
  }
};
  
  export const deleteCommentTo = async (req, res) => {
    const commentId = req.params.id;
    console.log('Received request to delete comment with ID:', commentId);  
    const existing = await getCommentById(commentId);
    if (!existing) return res.status(404).send('Comment not found.');
  
    deleteComment(commentId)
      .then(() => res.send('Comment deleted.'))
      .catch(() => res.status(500).send('Error deleting comment.'));
  };

  export const getCommentByIdTo = (req, res) => { 
    const commentId = req.params.id;
    getCommentById(commentId)
        .then(comment => {
            if (comment) {
                res.json(comment);
            } else {
                res.status(404).send('Comment not found.');
            }
        })
        .catch(err => {
            res.status(500).send('Error retrieving comment.');
        })};

export default{
    getCommentsForPostTo,
    addCommentToPostTo,
    updateCommentTo,
    deleteCommentTo,
    getCommentByIdTo
};
  