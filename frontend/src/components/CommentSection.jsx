import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import EditIcon from '../assets/edit.png';
import DeleteIcon from '../assets/delete.png';

const CommentSection = ({ postId, currentUser }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Fetch all comments for the post
    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/comments/${postId}`);
            setComments(res.data);
        } catch (err) {
            console.error('Error fetching comments:', err);
        }
    };

    // Run fetchComments on mount and when postId changes
    useEffect(() => {
        fetchComments();
    }, [postId]);

    // Add a new comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            await axios.post(
                'http://localhost:5000/api/v1/comments',
                {
                    postId,
                    content: newComment,
                },
                { withCredentials: true }
            );
            setNewComment('');
            fetchComments();
        } catch (err) {
            console.error('Error adding comment:', err);
        }
    };

    // Delete a comment
    const handleDelete = async (commentId) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/comments/${commentId}`, {
                withCredentials: true,
            });
            fetchComments();
        } catch (err) {
            console.error('Error deleting comment:', err);
        }
    };

    // Edit a comment
    const handleEdit = async (commentId, currentContent) => {
        const editedContent = prompt('Edit your comment:', currentContent);
        if (!editedContent || editedContent.trim() === currentContent) return;

        try {
            await axios.put(
                `http://localhost:5000/api/v1/comments/${commentId}`,
                { content: editedContent },
                { withCredentials: true }
            );
            fetchComments();
        } catch (err) {
            console.error('Error editing comment:', err);
        }
    };

    console.log(comments);
    

    return (
        <div className="mt-6 p-4 border-t border-gray-300">
            <h2 className="text-xl font-bold">Comments</h2>

            {/* Comment Form */}
            <form className="mt-4 flex" onSubmit={handleAddComment}>
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={2}
                />
                <button
                    type="submit"
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                    disabled={!newComment.trim()}
                >
                    Post
                </button>
            </form>

            {/* No comments */}
            {comments.length === 0 && <p className="text-gray-500 mt-4">No comments yet.</p>}

            {/* Comment List */}
            <div className="mt-4 space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-4">
                        {/* Optional avatar */}
                        {/* <img src={`/uploads/${comment.user_img}`} alt={comment.username} className="w-10 h-10 rounded-full" /> */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <span className="font-bold">{comment.username}</span>
                                <span className="text-sm text-gray-500">
                                    {moment(comment.date).fromNow()}
                                </span>
                            </div>
                            <p className="text-gray-700 mt-2 whitespace-pre-wrap">
                                {comment.content}
                            </p>

                            {/* Edit/Delete Buttons (Only for comment owner) */}
                            {/* {currentUser?.id === comment.userId && (
                                <div className="flex space-x-2 mt-2">
                                    <button
                                        onClick={() => handleEdit(comment.id, comment.content)}
                                        className="text-blue-500"
                                        title="Edit"
                                    >
                                        <img src={EditIcon} alt="Edit" className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="text-red-500"
                                        title="Delete"
                                    >
                                        <img src={DeleteIcon} alt="Delete" className="w-5 h-5" />
                                    </button>
                                </div>
                            )} */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
