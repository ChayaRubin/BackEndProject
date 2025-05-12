
import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCurrentUser } from '../userProvider.jsx';
import Comments from "../comments/comments";
import styles from './singlePost.module.css';

function SinglePost({ post, setPosts, selectedPostId, setSelectedPostId }) {
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [newPostData, setNewPostData] = useState({ title: '', body: '' });
    const [showBody, setShowBody] = useState(false);
    const { currentUser } = useCurrentUser();
    const navigate = useNavigate();
    const location = useLocation();

    // Delete a post from DB
    const handleDelete = async (id) => {
        try {
            // const response = await fetch(`http://localhost:3000/posts/deletePost/${id}`, {

            const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    // Update post title in DB
    const handleUpdatePost = async (updatedPost) => {
        console.log('Updated Post:', updatedPost);
        const postData = {
            user_id: updatedPost.user_id,
            title: updatedPost.title,
            body: updatedPost.body
        };
        try {
            console.log('postData Post:', postData);
            const response = await fetch(`http://localhost:3000/posts/${updatedPost.id}`, {

                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData), // שלח את הנתונים בסדר הנכון
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const updatedResponsePost = await response.json();
            setPosts((prevPosts) =>
                prevPosts.map((p) => (p.id === updatedResponsePost.id ? updatedResponsePost : p))
            );
        } catch (err) {
            setError(err.message);
        }
    };

    // Edit post title and body
    const handleStartEdit = (post) => {
        setEditingId(post.id);
        setNewPostData({ title: post.title, body: post.body });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setNewPostData({ title: '', body: '' });
    };

    const handleSaveEdit = (post) => {
        handleUpdatePost(post);
        setEditingId(null);
        setNewPostData({ title: '', body: '' });
    };

    return (
        <>
            {editingId === post.id ? (
                <div>
                    <input
                        type="text"
                        value={newPostData.title}
                        onChange={(e) =>
                            setNewPostData((prevData) => ({
                                ...prevData,
                                title: e.target.value,
                            }))
                        }
                    />
                </div>
            ) : (
                <span className={styles.title}>
                    #{post.id}: {typeof post.title === "string" ? post.title : JSON.stringify(post.title)}
                </span>
            )}

            {showBody && (editingId === post.id ? (
                <input
                    type="text"
                    value={newPostData.body}
                    onChange={(e) =>
                        setNewPostData((prevData) => ({
                            ...prevData,
                            body: e.target.value,
                        }))
                    }
                />
            ) : (
                <span>
                    {typeof post.body === "string" ? post.body : JSON.stringify(post.body)}
                </span>
            ))}

            <div className={styles.postActions}>
                {showBody ? (
                    <button onClick={() => {
                        setShowBody(false);
                        setEditingId(null);
                    }}>
                        Hide
                    </button>
                ) : (
                    <button onClick={() => setShowBody(true)}>Body</button>
                )}

                {showBody && (editingId !== post.id && (
                    <button onClick={() => handleStartEdit(post)}>
                        {/* <img src="./img/edit" alt="Edit" /> */}
                                                   <span>✏️</span>

                    </button>
                ))}

                {editingId === post.id && (
                    <>
                        <button
                            onClick={() =>
                                handleSaveEdit({
                                    id: post.id,
                                    user_id: post.user_id || currentUser.id,
                                    title: newPostData.title,
                                    body: newPostData.body,
                                })

                            }
                        >
                            {/* <img src="./img/checkmark.png" alt="Save" /> */}
                                                        <span >✔️</span>

                        </button>

                        <button onClick={handleCancelEdit}>
                            {/* <img src="./img/cancel.png" alt="Cancel" /> */}
                            <span>❌</span>
                        </button>
                    </>
                )}

                {editingId !== post.id && (
                    <button onClick={() => handleDelete(post.id)} disabled={currentUser.id != post.user_id}>
                        {/* <img src="./img/trash.png" alt="Delete" /> */}
                        <span>🗑️</span>
                    </button>
                )}
            </div>

            {/* Link to comments page */}
            {editingId !== post.id && (
                <button className="linkBtns">
                    <Link to={`/users/${post.userId}/posts/${post.id}/comments`} state={{ postId: post.id }}>
                        View Comments
                    </Link>
                </button>
            )}
        </>
    );
}

export default SinglePost;
