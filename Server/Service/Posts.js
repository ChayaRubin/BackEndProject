
import db from '../../DB/dbConnection.js'; 
export const getPostById = async (postId) => {
    try {
        const [results] = await db.query('SELECT * FROM posts WHERE id = ?', [postId]);
        return results; 
    } catch (err) {
        throw err;
    }
};

export const getAllPosts = async () => {
    const [results] = await db.query('SELECT * FROM posts');
    return results;
};
export const getPostsByUserId = async (userId) => {
    try {
        const [results] = await db.query('SELECT * FROM posts WHERE user_id = ?', [userId]);
        return results;
    } catch (err) {
        throw err;
    }
};

export const addPost = async (post) => {
    try {
        const [results] = await db.query('INSERT INTO posts SET ?', [post]);
        return results.insertId;
    } catch (err) {
        throw err;
    }
};
export const updatePost = async (postId, updatedPost) => {
    try {
        const [results] = await db.query(
            'UPDATE posts SET ? WHERE id = ?',
            [updatedPost, postId]
        );
        return results;
    } catch (err) {
        throw err;
    }
};

export const deletePost = async (postId) => {
    try {
        const [results] = await db.query(
            'DELETE FROM posts WHERE id = ?',
            [postId]
        );
        return results;
    } catch (err) {
        throw err;
    }
};
