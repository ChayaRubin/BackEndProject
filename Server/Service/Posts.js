// export const getPostByUserId = (userId) => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * FROM posts WHERE user_id = ?', [userId], (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// }
// // 
// export const addPost = (post) => {
//     return new Promise((resolve, reject) => {
//         db.query('INSERT INTO posts SET ?', post, (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results.insertId);
//             }
//         });
//     });
// };  

// export const updatePost = (post) => {
//     return new Promise((resolve, reject) => {
//         db.query('UPDATE posts SET ? WHERE id = ?', [post, post.id], (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results.affectedRows);
//             }
//         });
//     });
// };

// export const deletePost = (postId) => {
//     return new Promise((resolve, reject) => {
//         db.query('DELETE FROM posts WHERE id = ?', [postId], (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results.affectedRows);
//             }
//         });
//     });
// };  

// export const getPostById = (postId) => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results[0]);
//             }
//         });
//     });
// };

// export const getAllPosts = () => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * FROM posts', (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// };

// export const getPostsByUserId = (userId) => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * FROM posts WHERE user_id = ?', [userId], (err, results) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// };
