import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useCurrentUser } from '../userProvider.jsx';
import styles from './comments.module.css';

const Comments = () => {
    const [editingId, setEditingId] = useState(null);
    const location = useLocation();
    const { currentUser } = useCurrentUser();
    const postId = location.state?.postId;
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newCommentData, setNewCommentData] = useState({ name: '', body: '' });

    // Get comments from server
    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3000/comments/${postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();
            setComments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (postId) fetchComments();
    }, [postId]);

    const handleAddComment = async () => {
        if (!newCommentData.name || !newCommentData.body) return;
        try {
            const response = await fetch(`http://localhost:3000/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    post_id: postId,
                    name: newCommentData.name,
                    email: currentUser.email,
                    body: newCommentData.body.toString(),
                }),
            });
            if (!response.ok) throw new Error(`${response.status}`);
            await response.json();
            await fetchComments(); 
            setIsAdding(false);
            setNewCommentData({ name: '', body: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/comments/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error(`${response.status}`);
            await fetchComments(); 
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateComments = async (updatedComment) => {
        try {
            const response = await fetch(`http://localhost:3000/comments/${updatedComment.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedComment),
            });
            if (!response.ok) throw new Error(`${response.status}`);
            await response.json();
            await fetchComments(); 
        } catch (err) {
            setError(err.message);
        }
    };

    const handleStartEdit = (comment) => {
        setEditingId(comment.id);
        setNewCommentData({ name: comment.name, body: comment.body });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setNewCommentData({ name: '', body: '' });
    };

    const handleSaveEdit = async (comment) => {
        await handleUpdateComments({
            ...comment,
            name: newCommentData.name,
            body: newCommentData.body,
        });
        setEditingId(null);
        setNewCommentData({ name: '', body: '' });
    };

    if (loading) return <p>Loading comments...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.commentsContainer}>
            <h1>Comments for Post #{postId}</h1>
            <ul>
                {comments.length > 0 ? comments.map((comment) => (
                    <li key={comment.id}>
                        {editingId === comment.id ? (
                            <>
                                <input
                                    type="text"
                                    value={newCommentData.name}
                                    onChange={(e) => setNewCommentData((prev) => ({ ...prev, name: e.target.value }))}
                                    className={styles.inputField}
                                />
                                <input
                                    type="text"
                                    value={newCommentData.body}
                                    onChange={(e) => setNewCommentData((prev) => ({ ...prev, body: e.target.value }))}
                                    className={styles.inputField}
                                />
                            </>
                        ) : (
                            <>
                                <strong>{comment.name}</strong>
                                <div>{comment.body}</div>
                            </>
                        )}
                        <div><strong>By:</strong> {comment.email}</div>
                        <div className={styles.commentActionBtn}>
                            {editingId !== comment.id && (
                                <>
                                    <button onClick={() => handleStartEdit(comment)} disabled={currentUser.email !== comment.email}>
                                        <img src="/img/edit.png" alt="Edit" />
                                    </button>
                                    <button onClick={() => handleDelete(comment.id)} disabled={currentUser.email !== comment.email}>
                                        <img src="/img/trash.png" alt="Delete" />
                                    </button>
                                </>
                            )}
                            {editingId === comment.id && (
                                <>
                                    <button onClick={() => handleSaveEdit(comment)}>
                                        <img src="/img/checkmark.png" alt="Save" />
                                    </button>
                                    <button onClick={handleCancelEdit}>
                                        <img src="/img/cancel.png" alt="Cancel" />
                                    </button>
                                </>
                            )}
                        </div>
                    </li>
                )) : <p>no Comments found 😒</p>}
            </ul>

            {/* Add new comment form */}
            {isAdding ? (
                <div>
                    <input
                        type="text"
                        value={newCommentData.name}
                        onChange={(e) => setNewCommentData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter new comment name"
                        className={styles.inputField}
                    />
                    <textarea
                        rows="10"
                        cols="50"
                        value={newCommentData.body}
                        placeholder="Enter new comment body"
                        onChange={(e) => setNewCommentData((prev) => ({ ...prev, body: e.target.value }))}
                        className={styles.inputField}
                    />
                    <button onClick={handleAddComment} className={styles.addButton}>Add Comment</button>
                    <button onClick={() => setIsAdding(false)} className={styles.cancelButton}>Cancel</button>
                </div>
            ) : (
                <button onClick={() => setIsAdding(true)} className={styles.addButton}>Add New Comment</button>
            )}
        </div>
    );
};

export default Comments;

