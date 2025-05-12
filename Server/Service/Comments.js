import db from '../../DB/dbConnection.js';

export const addComment = async (comment) => {
    try {
        const [results] = await db.query('INSERT INTO comments SET ?', comment);
        return results.insertId;  
    } catch (err) {
        console.error('Error adding comment to DB:', err);
        throw new Error('Failed to insert comment into database.');
    }
};

export const getCommentsByPostId = async (postId) => {
  const [results] = await db.query('SELECT * FROM comments WHERE post_id = ?', [postId]);
  return results;
};

export const getCommentById = async (id) => {
  const [results] = await db.query('SELECT * FROM comments WHERE id = ?', [id]);
  return results[0];
};

export const updateComment = async (comment, id) => {
  try {
    const [results] = await db.query('UPDATE comments SET ? WHERE id = ?', [comment, id]);
    return results.affectedRows;
  } catch (error) {
    throw new Error('DB query failed: ' + error.message);
  }
}

export const deleteComment = async (commentId) => {
  const [results] = await db.query('DELETE FROM comments WHERE id = ?', [commentId]);
  return results.affectedRows;
};

export const getAllComments = async () => {
  const [results] = await db.query('SELECT * FROM comments');
  return results;
};

export default {
    addComment,
    getCommentsByPostId,
    getCommentById,
    updateComment,
    deleteComment,
    getAllComments,
};
