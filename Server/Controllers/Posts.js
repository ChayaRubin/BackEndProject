// import { getPostById, addPost, updatePost, deletePost, getAllPosts } from '../Service/Posts.js';

// export const getPostByIdTO = (req, res) => {
//     const postId = req.params.id;
//     getPostById(postId)
//         .then(post => {
//             if (post) {
//                 res.json(post);
//             } else {
//                 res.status(404).send('Post not found.');
//             }
//         })
//         .catch(err => {
//             res.status(500).send('Error retrieving post.');
//         });
// }

// export const addPostTO = (req, res) => {
//     const post = req.body;
//     addPost(post)
//         .then(postId => {
//             res.status(201).json({ id: postId });
//         })
//         .catch(err => {
//             res.status(500).send('Error adding post.');
//         });
// };

// export const updatePostTO = (req, res) => {
//     const post = req.body;
//     updatePost(post)
//         .then(affectedRows => {
//             if (affectedRows > 0) {
//                 res.status(200).send('Post updated successfully.');
//             } else {
//                 res.status(404).send('Post not found.');
//             }
//         })
//         .catch(err => {
//             res.status(500).send('Error updating post.');
//         });
// }

// export const deletePostTo = (req, res) => { 
//     const postId = req.body.id;
//     deletePost(postId)
//         .then(affectedRows => {
//             if (affectedRows > 0) {
//                 res.status(200).send('Post deleted successfully.');
//             } else {
//                 res.status(404).send('Post not found.');
//             }
//         })
//         .catch(err => {
//             res.status(500).send('Error deleting post.');
//         });
// }

// export const getAllPostsTo = (req, res) => {
//     getAllPosts()
//         .then(posts => {
//             res.json(posts);
//         })
//         .catch(err => {
//             res.status(500).send('Error retrieving posts.');
//         });
// };

// export default {
//     getPostByIdTO,
//     addPostTO,
//     updatePostTO,
//     deletePostTo,
//     getAllPostsTo
// };

