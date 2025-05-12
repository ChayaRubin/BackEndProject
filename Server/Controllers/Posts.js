import {
    getPostById, getAllPosts, getPostsByUserId, addPost, updatePost,
    deletePost
} from '../Service/Posts.js';

export const getPostByIdTO = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await getPostById(postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).send('Post not found.');
        }
    } catch (err) {
        console.error('Error retrieving post:', err);
        res.status(500).send('Error retrieving post.');
    }
}

export const getPostByUserIdTO = async (req, res) => {
const userId = req.params.userId;
    try {
        const posts = await getPostsByUserId(userId);
        if (posts) {
            res.json(posts);
        } else {
            res.status(404).send('Post not found.');
        }
    } catch (err) {
        console.error('Error retrieving post:', err);
        res.status(500).send('Error retrieving post.');
    }
}

export const getAllPostsTo = async (req, res) => {
    const posts = await getAllPosts();

    try {
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error retrieving posts:', err);
        res.status(500).send('Error retrieving posts.');
    }
};

export const addPostTO = async (req, res) => {
    const post = req.body;
    // if (!post || !post.user_id || !post.title) 
    //     return res.status(400).send('Missing required fields: user_id, title, completed.');
    
    try {
        const postId = await addPost(post);
        console.log('Post added with ID:', postId);
        res.status(201).json({ id: postId });
    } catch (err) {
        console.error('Error adding post:', err);
        res.status(500).send('Error adding post.');
    }
};



export const updatePostTO = async (req, res) => {
    const postId = req.params.id;
    const updatedPost = req.body;

    // if (!updatedPost || !updatedPost.title || !updatedPost.user_id) {
    //     return res.status(400).send('Missing required fields: user_id, title');
    // }

    try {
        const result = await updatePost(postId, updatedPost);
        if (result.affectedRows > 0) {
            res.status(200).send('Post updated successfully');
        } else {
            res.status(404).send('Post not found');
        }
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).send('Error updating post');
    }
};

export const deletePostTo = async (req, res) => {
    const postId = req.params.id;

    try {
        const result = await deletePost(postId);
        if (result.affectedRows > 0) {
            res.status(200).send('Post deleted successfully');
        } else {
            res.status(404).send('Post not found');
        }
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).send('Error deleting post');
    }
};


export default {
    getPostByIdTO,
    getPostByUserIdTO,
    addPostTO,
    updatePostTO,
    deletePostTo,
    getAllPostsTo
};