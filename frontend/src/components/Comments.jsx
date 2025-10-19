// src/components/Comments.jsx
import React, { useState, useEffect, useRef } from 'react';

const Comments = ({ postId, currentUser, onLoginRequest }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingLikes, setLoadingLikes] = useState(true);
  
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);

  const menuRef = useRef(null);
  // const API_BASE_URL = '${process.env.REACT_APP_API_URL}/api';
  const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api`;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch post data to get current likes and like status
  const fetchPostData = async () => {
    try {
      setLoadingLikes(true);
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch post' }));
        throw new Error(errorData.message || 'Failed to fetch post');
      }
      const data = await response.json();
      
      // ✅ SET LIKES COUNT - Always update from server
      setLikes(data.likes?.count || 0);
      
      // ✅ SIMPLIFIED LIKE CHECKING - Only check if user ID exists in likedBy array
      if (currentUser && data.likes?.likedBy) {
        // Convert all likedBy entries to strings for comparison
        const likedByUserIds = data.likes.likedBy.map(like => {
          if (typeof like === 'object' && like.userId) {
            return like.userId.toString();
          }
          return like.toString();
        });
        
        const userLiked = likedByUserIds.includes(currentUser.id.toString());
        
        console.log("🔍 LIKE STATUS CHECK:", {
          userId: currentUser.id,
          userLiked: userLiked,
          totalLikes: data.likes.count,
          likedBy: likedByUserIds
        });
        
        setHasLiked(userLiked);
      } else {
        setHasLiked(false);
      }
    } catch (err) {
      console.error('Error fetching post data:', err);
    } finally {
      setLoadingLikes(false);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch comments' }));
        throw new Error(errorData.message || 'Failed to fetch comments');
      }
      const data = await response.json();
      if (data.success) {
        setComments(data.comments || []);
      } else {
        throw new Error(data.message || 'Failed to fetch comments');
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  // ✅ FIXED: Handle like with better error handling and real-time updates
  const handleLike = async () => {
    if (!currentUser) {
      if (onLoginRequest) {
        onLoginRequest();
      } else {
        alert('Please login to like posts');
      }
      return;
    }

    try {
      console.log("❤️ SENDING LIKE REQUEST", {
        userId: currentUser.id,
        currentLikes: likes,
        currentlyLiked: hasLiked
      });

      const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: currentUser.id,
          userName: currentUser.name
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to like post' }));
        throw new Error(errorData.message || 'Failed to like post');
      }
      
      const data = await response.json();
      console.log("❤️ LIKE RESPONSE:", data);
      
      if (data.success) {
        // ✅ IMMEDIATE UI UPDATE with optimistic update
        const newLikeCount = data.likes;
        const newLikeStatus = data.liked;
        
        setLikes(newLikeCount);
        setHasLiked(newLikeStatus);
        
        console.log(`✅ LIKE UPDATED: Count=${newLikeCount}, UserLiked=${newLikeStatus}`);
        
        // ✅ OPTIONAL: Refresh post data to ensure sync with server
        // This ensures we have the most up-to-date data
        setTimeout(() => {
          fetchPostData();
        }, 100);
        
      } else {
        throw new Error(data.message || 'Failed to like post');
      }
    } catch (err) {
      console.error('❌ ERROR LIKING POST:', err);
      alert(err.message || 'Failed to like post. Please try again.');
      
      // ✅ REVERT OPTIMISTIC UPDATE ON ERROR
      // Refresh post data to get correct state from server
      fetchPostData();
    }
  };

  // Handle comment submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      if (onLoginRequest) {
        onLoginRequest();
        return;
      } else {
        alert('Please login to post comments');
        return;
      }
    }

    if (!newComment.comment.trim()) {
      alert('Please enter your comment');
      return;
    }

    const commentData = {
      comment: newComment.comment.trim(),
      name: currentUser.name,
      userId: currentUser.id
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to post comment' }));
        throw new Error(errorData.message || 'Failed to post comment');
      }

      const data = await response.json();
      
      if (data.success) {
        setComments(prev => [data.comment, ...prev]);
        setNewComment({ name: '', comment: '' });
      } else {
        throw new Error(data.message || 'Failed to post comment');
      }
    } catch (err) {
      console.error('❌ ERROR POSTING COMMENT:', err);
      alert(err.message || 'Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle comment edit
  const handleEditComment = async (commentId) => {
    if (!commentId) {
      alert('Error: Comment ID not found');
      return;
    }

    if (!editCommentText.trim()) {
      alert('Please enter comment text');
      return;
    }

    if (!currentUser) {
      alert('Please login to edit comments');
      return;
    }

    try {
      const requestBody = {
        comment: editCommentText.trim(),
        userId: currentUser.id
      };

      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to edit comment' }));
        throw new Error(errorData.message || 'Failed to edit comment');
      }

      const data = await response.json();
      
      if (data.success) {
        setComments(prev => prev.map(comment => 
          comment._id === commentId ? { ...comment, comment: editCommentText.trim() } : comment
        ));
        setEditingCommentId(null);
        setEditCommentText('');
        setActiveMenu(null);
      } else {
        throw new Error(data.message || 'Failed to edit comment');
      }
    } catch (err) {
      console.error('❌ ERROR EDITING COMMENT:', err);
      alert(err.message || 'Failed to edit comment. Please try again.');
    }
  };

  // Handle comment delete
  const handleDeleteComment = async (commentId) => {
    if (!commentId) {
      alert('Error: Comment ID not found');
      return;
    }

    if (!currentUser) {
      alert('Please login to delete comments');
      return;
    }

    const commentToDelete = comments.find(comment => comment._id === commentId);
    if (!commentToDelete) {
      alert('Error: Comment not found');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      return;
    }

    try {
      const requestBody = {
        userId: currentUser.id,
        isAdmin: currentUser.isAdmin || false
      };

      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      if (data.success) {
        setComments(prev => prev.filter(comment => comment._id !== commentId));
        setActiveMenu(null);
      } else {
        throw new Error(data.message || 'Failed to delete comment');
      }
    } catch (err) {
      console.error('❌ ERROR DELETING COMMENT:', err);
      alert(err.message || 'Failed to delete comment. Please try again.');
    }
  };

  // Check edit permission (15 minutes window)
  const canEditComment = (commentDate) => {
    if (!commentDate) return false;
    
    try {
      const commentTime = new Date(commentDate).getTime();
      const currentTime = new Date().getTime();
      const fifteenMinutes = 15 * 60 * 1000;
      return (currentTime - commentTime) < fifteenMinutes;
    } catch (err) {
      return false;
    }
  };

  // Check user permissions for comment modification
  const canUserModifyComment = (comment) => {
    if (!currentUser || !comment) {
      return false;
    }
    
    try {
      const commentUserId = comment.userId;
      const currentUserId = currentUser.id;
      
      const isAuthor = commentUserId && commentUserId.toString() === currentUserId.toString();
      const isAdmin = currentUser.isAdmin === true;
      return isAuthor || isAdmin;
    } catch (err) {
      return false;
    }
  };

  // Toggle menu
  const toggleMenu = (commentId, e) => {
    if (e) e.stopPropagation();
    setActiveMenu(activeMenu === commentId ? null : commentId);
  };

  // Start editing comment
  const startEditing = (comment) => {
    if (!comment || !comment._id) {
      return;
    }
    
    setEditingCommentId(comment._id);
    setEditCommentText(comment.comment || '');
    setActiveMenu(null);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditCommentText('');
  };

  const handleCommentChange = (e) => {
    setNewComment({
      ...newComment,
      [e.target.name]: e.target.value
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Recently';
      
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays}d ago`;
      
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (err) {
      return 'Recently';
    }
  };

  // Get default avatar
  const getDefaultAvatar = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=random&color=fff&bold=true`;
  };

  // Handle login required actions
  const handleLoginRequired = (action) => {
    if (onLoginRequest) {
      onLoginRequest();
    } else {
      alert(`Please login to ${action}`);
    }
  };

  // Initialize data when component mounts
  useEffect(() => {
    fetchPostData();
    fetchComments();
  }, [postId]);

  // Refresh likes when user changes
  useEffect(() => {
    if (currentUser) {
      fetchPostData();
    }
  }, [currentUser]);

  return (
    <div className="mt-8">
      {/* Like Button Section */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
            hasLiked 
              ? 'bg-red-500 text-white border border-red-600 shadow-lg' 
              : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300 hover:from-gray-200 hover:to-gray-300'
          } ${!currentUser ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          disabled={!currentUser || loadingLikes}
          title={!currentUser ? "Please login to like posts" : hasLiked ? "Unlike this post" : "Like this post"}
        >
          {loadingLikes ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
          ) : (
            <svg 
              className={`w-5 h-5 ${hasLiked ? 'fill-white' : 'fill-none stroke-2'}`} 
              stroke={hasLiked ? "white" : "currentColor"}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
          <span className={`font-semibold ${hasLiked ? 'text-white' : 'text-gray-700'}`}>
            {loadingLikes ? '...' : `${likes} ${likes === 1 ? 'Like' : 'Likes'}`}
          </span>
        </button>
        
        {/* Like status indicator */}
        {currentUser && !loadingLikes && (
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
            hasLiked 
              ? 'bg-red-100 text-red-700 border border-red-200' 
              : 'bg-gray-100 text-gray-600 border border-gray-200'
          }`}>
            {hasLiked ? 'You liked this' : 'Like this post'}
          </span>
        )}
        
        {!currentUser && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            Login to like
          </span>
        )}

        {loadingLikes && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            Loading...
          </span>
        )}
      </div>

      {/* Comments Section */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Discussion ({comments.length})
          </h2>
          <div className="flex items-center space-x-2 text-green-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">{comments.length} comments</span>
          </div>
        </div>

        {/* Comment Form */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 mb-8 border border-green-200 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Join the Conversation</h3>
              <p className="text-gray-600 text-sm">
                {currentUser ? `Commenting as ${currentUser.name}` : 'Login to share your thoughts'}
              </p>
            </div>
          </div>

          {!currentUser ? (
            <div className="text-center py-6">
              <p className="text-gray-600 mb-4">Please login to post comments</p>
              <button
                onClick={() => handleLoginRequired('post comments')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition duration-300"
              >
                Login to Comment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitComment} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Your Comment *
                </label>
                <textarea
                  name="comment"
                  value={newComment.comment}
                  onChange={handleCommentChange}
                  rows="5"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm transition duration-300 resize-none text-lg"
                  placeholder="What are your thoughts on this article?"
                  required
                  minLength="1"
                  maxLength="1000"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-xl font-bold text-white transition duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Posting...</span>
                  </span>
                ) : (
                  'Post Comment'
                )}
              </button>
            </form>
          )}
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {loadingComments ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-dashed border-blue-200">
              <svg className="w-16 h-16 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No comments yet</h3>
              <p className="text-gray-600 mb-4">Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map(comment => (
              <div key={comment._id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition duration-300">
                <div className="flex items-start space-x-4">
                  <img 
                    src={comment.avatar || getDefaultAvatar(comment.name)} 
                    alt={comment.name} 
                    className="w-12 h-12 rounded-xl shadow-md object-cover"
                    onError={(e) => {
                      e.target.src = getDefaultAvatar(comment.name);
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{comment.name || 'Anonymous'}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-gray-500 text-sm">{formatDate(comment.date)}</span>
                          {currentUser && comment.userId && comment.userId.toString() === currentUser?.id?.toString() && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">You</span>
                          )}
                          {comment.edited && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">Edited</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Three dots menu for comment actions */}
                      {canUserModifyComment(comment) && editingCommentId !== comment._id && (
                        <div className="relative" ref={menuRef}>
                          <button 
                            onClick={(e) => toggleMenu(comment._id, e)}
                            className="text-gray-400 hover:text-gray-600 transition duration-300 p-2 rounded-lg hover:bg-gray-100"
                            aria-label="Comment options"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                          </button>
                          
                          {activeMenu === comment._id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                              {canEditComment(comment.date) ? (
                                <button
                                  onClick={() => startEditing(comment)}
                                  className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 flex items-center space-x-2 transition duration-200"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  <span>Edit Comment</span>
                                </button>
                              ) : (
                                <div className="px-4 py-3 text-sm text-gray-500 bg-gray-50 flex items-center space-x-2 cursor-not-allowed">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>Edit (expired)</span>
                                </div>
                              )}
                              <button
                                onClick={() => handleDeleteComment(comment._id)}
                                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 border-t border-gray-100 transition duration-200"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span>Delete Comment</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Comment Text or Edit Form */}
                    {editingCommentId === comment._id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editCommentText}
                          onChange={(e) => setEditCommentText(e.target.value)}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
                          placeholder="Edit your comment..."
                          minLength="1"
                          maxLength="1000"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditComment(comment._id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300 font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 rounded-xl p-4">
                        {comment.comment}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;