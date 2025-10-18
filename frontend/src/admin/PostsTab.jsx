import React, { useState, useEffect } from 'react';

const PostsTab = ({ updateProgress, progress, showPostForm, setShowPostForm }) => {
  const [posts, setPosts] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  // Modern Professional Color Palette
  const colors = {
    primary: '#6366f1',      // Indigo
    primaryLight: '#818cf8', // Light Indigo
    secondary: '#06b6d4',    // Cyan
    accent: '#f59e0b',       // Amber
    dark: '#0f172a',         // Dark Slate
    darkLight: '#1e293b',    // Light Dark
    light: '#f8fafc',        // Light Background
    text: '#1e293b',         // Text
    textLight: '#64748b',    // Light Text
    success: '#10b981',      // Emerald
    warning: '#f59e0b',      // Amber
    error: '#ef4444',        // Red
    card: '#ffffff',         // White
    cardDark: '#1e293b'      // Dark Card
  };

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchPosts();
  }, []);

  // Enhanced user details fetch with multiple endpoint attempts
  const fetchUserDetails = async (userId) => {
    if (!userId || userDetails[userId]) return null;

    try {
      const token = localStorage.getItem('adminToken');
      
      // Try multiple possible endpoints
      const endpoints = [
        `${API_BASE_URL}/admin/users/${userId}`,
        `${API_BASE_URL}/users/${userId}`,
        `${API_BASE_URL}/user/${userId}`
      ];

      let userData = null;

      for (let endpoint of endpoints) {
        try {
          console.log(`🔍 Trying endpoint: ${endpoint}`);
          const response = await fetch(endpoint, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            console.log(`✅ User data from ${endpoint}:`, data);
            
            if (data.success && data.user) {
              userData = data.user;
              break;
            } else if (data.user) {
              userData = data.user;
              break;
            } else if (data.data) {
              userData = data.data;
              break;
            }
          }
        } catch (error) {
          console.log(`❌ Endpoint ${endpoint} failed:`, error.message);
          continue;
        }
      }

      if (userData) {
        setUserDetails(prev => ({
          ...prev,
          [userId]: userData
        }));
        return userData;
      } else {
        console.warn(`⚠️ No user data found for ${userId}`);
        // Create fallback user data
        const fallbackUser = {
          name: `User ${userId.substring(0, 8)}`,
          email: `user${userId.substring(0, 6)}@example.com`,
          _id: userId
        };
        setUserDetails(prev => ({
          ...prev,
          [userId]: fallbackUser
        }));
        return fallbackUser;
      }

    } catch (error) {
      console.error(`❌ Error fetching user ${userId}:`, error);
      // Create fallback user data on error
      const fallbackUser = {
        name: `User ${userId.substring(0, 8)}`,
        email: `user${userId.substring(0, 6)}@example.com`,
        _id: userId
      };
      setUserDetails(prev => ({
        ...prev,
        [userId]: fallbackUser
      }));
      return fallbackUser;
    }
  };

  // Alternative: Fetch all users at once and map them
  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('👥 All Users Data:', data);
        
        if (data.success && data.users) {
          const usersMap = {};
          data.users.forEach(user => {
            usersMap[user._id] = user;
          });
          setUserDetails(usersMap);
          return usersMap;
        }
      }
    } catch (error) {
      console.error('Error fetching all users:', error);
    }
    return {};
  };

  // Enhanced posts fetch with user details
  const fetchPosts = async () => {
    setLoading(true);
    try {
      updateProgress('Loading Posts', 30, 'Fetching posts...');
      
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/admin/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📋 Posts API Response:', data);

      if (data.success && data.posts) {
        setPosts(data.posts);
        
        // First, try to fetch all users at once (more efficient)
        const usersMap = await fetchAllUsers();
        
        // Extract all unique user IDs from posts that are not in usersMap
        const uniqueUserIds = new Set();
        data.posts.forEach(post => {
          // From likes
          if (post.likes?.likedBy) {
            post.likes.likedBy.forEach(userId => {
              if (!usersMap[userId]) uniqueUserIds.add(userId);
            });
          }
          // From comments
          if (Array.isArray(post.comments)) {
            post.comments.forEach(comment => {
              if (comment.userId && !usersMap[comment.userId]) {
                uniqueUserIds.add(comment.userId);
              }
            });
          }
        });

        console.log('👥 Remaining User IDs to fetch:', Array.from(uniqueUserIds));

        // Fetch remaining user details in parallel
        if (uniqueUserIds.size > 0) {
          const userPromises = Array.from(uniqueUserIds).map(userId => 
            fetchUserDetails(userId).catch(error => {
              console.error(`Failed to fetch user ${userId}:`, error);
              return null;
            })
          );

          await Promise.all(userPromises);
        }
        
      } else {
        console.error('API Error:', data);
        setPosts([]);
      }

      updateProgress('Complete', 100, 'Posts loaded successfully');
    } catch (error) {
      console.error('Error fetching posts:', error);
      updateProgress('Error', 0, 'Failed to load posts');
    } finally {
      setLoading(false);
      setTimeout(() => updateProgress('', 0, ''), 1000);
    }
  };

  // Enhanced user info with better fallbacks
  const getUserDisplayInfo = (userId) => {
    if (!userId) {
      return {
        name: 'Unknown User',
        email: 'No email',
        display: 'Unknown User'
      };
    }

    const user = userDetails[userId];
    if (user) {
      return {
        name: user.name || `User ${userId.substring(0, 8)}`,
        email: user.email || `user${userId.substring(0, 6)}@example.com`,
        display: user.name || `User ${userId.substring(0, 8)}`
      };
    }

    // If user not loaded yet, show temporary data
    return {
      name: `User ${userId.substring(0, 8)}`,
      email: `user${userId.substring(0, 6)}@example.com`,
      display: `User ${userId.substring(0, 8)}`
    };
  };

  // Enhanced likes info
  const getLikesInfo = (post) => {
    let likesCount = 0;
    let likedUsers = [];

    if (post.likes && typeof post.likes === 'object' && !Array.isArray(post.likes)) {
      likesCount = post.likes.count || 0;
      
      if (Array.isArray(post.likes.likedBy)) {
        likedUsers = post.likes.likedBy.map(userId => {
          const userInfo = getUserDisplayInfo(userId);
          return {
            id: userId,
            name: userInfo.name,
            email: userInfo.email,
            display: userInfo.display
          };
        });
      }
    } 
    else if (Array.isArray(post.likes)) {
      likesCount = post.likes.length;
      likedUsers = post.likes.map((like) => {
        const userId = typeof like === 'object' ? like.userId : like;
        const userInfo = getUserDisplayInfo(userId);
        return {
          id: userId,
          name: userInfo.name,
          email: userInfo.email,
          display: userInfo.display
        };
      });
    }

    return { likesCount, likedUsers };
  };

  // Enhanced comments info
  const getCommentsInfo = (post) => {
    let commentsCount = 0;
    let commentDetails = [];

    if (Array.isArray(post.comments)) {
      commentsCount = post.comments.length;
      
      commentDetails = post.comments.map((comment) => {
        const userId = comment.userId;
        const userInfo = getUserDisplayInfo(userId);
        
        return {
          user: userInfo.name,
          email: userInfo.email,
          text: comment.comment || comment.text || comment.content || 'No comment text',
          date: comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 
               (comment.date ? new Date(comment.date).toLocaleDateString() : 'Recently'),
          avatar: comment.avatar,
          userId: userId
        };
      });
    }

    return { commentsCount, commentDetails };
  };

  // Toggle expanded view
  const toggleExpandedView = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  // Delete post
  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      updateProgress('Deleting', 50, 'Deleting post...');
      
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/admin/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        updateProgress('Complete', 100, 'Post deleted successfully!');
        setTimeout(() => {
          alert('✅ Post deleted successfully!');
          fetchPosts();
          updateProgress('', 0, '');
        }, 1000);
      } else {
        alert(data.message || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Delete post error:', error);
      alert('❌ Failed to delete post');
    }
  };

  // Refresh user data for a specific post
  const refreshUserData = async (post) => {
    const uniqueUserIds = new Set();
    
    if (post.likes?.likedBy) {
      post.likes.likedBy.forEach(userId => uniqueUserIds.add(userId));
    }
    
    if (Array.isArray(post.comments)) {
      post.comments.forEach(comment => {
        if (comment.userId) uniqueUserIds.add(comment.userId);
      });
    }

    const userPromises = Array.from(uniqueUserIds).map(userId => 
      fetchUserDetails(userId)
    );

    await Promise.all(userPromises);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.light }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 mx-auto mb-4" 
               style={{ borderTopColor: colors.primary, borderRightColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}></div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>Loading Posts</h3>
          <p className="text-sm" style={{ color: colors.textLight }}>Fetching latest content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.light }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Content Management
            </h1>
            <p className="mt-2 text-lg" style={{ color: colors.textLight }}>
              Manage blog posts, monitor engagement, and track performance
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchPosts}
              className="inline-flex items-center px-4 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              style={{ backgroundColor: colors.card, color: colors.text, border: `1px solid ${colors.textLight}20` }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button
              onClick={() => setShowPostForm(true)}
              className="inline-flex items-center px-6 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Post
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        {posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-xl mr-4" style={{ backgroundColor: `${colors.primary}10` }}>
                  <svg className="w-6 h-6" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0-12a2 2 0 012-2h2a2 2 0 012 2m-6 9v2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textLight }}>Total Posts</p>
                  <p className="text-2xl font-bold" style={{ color: colors.text }}>{posts.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-xl mr-4" style={{ backgroundColor: `${colors.success}10` }}>
                  <svg className="w-6 h-6" style={{ color: colors.success }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textLight }}>Total Likes</p>
                  <p className="text-2xl font-bold" style={{ color: colors.text }}>
                    {posts.reduce((total, post) => total + (post.likes?.count || 0), 0)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-xl mr-4" style={{ backgroundColor: `${colors.secondary}10` }}>
                  <svg className="w-6 h-6" style={{ color: colors.secondary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textLight }}>Total Comments</p>
                  <p className="text-2xl font-bold" style={{ color: colors.text }}>
                    {posts.reduce((total, post) => total + (post.comments?.length || 0), 0)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-xl mr-4" style={{ backgroundColor: `${colors.accent}10` }}>
                  <svg className="w-6 h-6" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.textLight }}>Categories</p>
                  <p className="text-2xl font-bold" style={{ color: colors.text }}>
                    {new Set(posts.map(post => post.category)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${colors.primary}10` }}>
                <svg className="w-12 h-12" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>No Posts Yet</h3>
              <p className="mb-6" style={{ color: colors.textLight }}>Get started by creating your first blog post</p>
              <button
                onClick={() => setShowPostForm(true)}
                className="inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: colors.primary, color: 'white' }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Post
              </button>
            </div>
          ) : (
            posts.map((post) => {
              const { likesCount, likedUsers } = getLikesInfo(post);
              const { commentsCount, commentDetails } = getCommentsInfo(post);

              return (
                <div key={post._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1 mb-4 lg:mb-0">
                        <h3 className="text-2xl font-bold mb-3 leading-tight" style={{ color: colors.text }}>
                          {post.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="inline-flex items-center px-3 py-1 rounded-full font-medium" 
                                style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {post.author?.name || 'Unknown Author'}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full font-medium" 
                                style={{ backgroundColor: `${colors.success}10`, color: colors.success }}>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            {post.category}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full font-medium" 
                                style={{ backgroundColor: `${colors.textLight}10`, color: colors.textLight }}>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(post.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleExpandedView(post._id)}
                          className="inline-flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200 border"
                          style={{ 
                            borderColor: colors.primary,
                            color: colors.primary,
                            backgroundColor: 'transparent'
                          }}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={expandedPost === post._id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                          </svg>
                          {expandedPost === post._id ? 'Less' : 'More'}
                        </button>
                        <button
                          onClick={() => handleDeletePost(post._id)}
                          className="inline-flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-200 border hover:shadow-sm"
                          style={{ 
                            borderColor: colors.error,
                            color: colors.error,
                            backgroundColor: 'transparent'
                          }}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-6 mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium" 
                             style={{ backgroundColor: `${colors.success}10`, color: colors.success }}>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className="font-bold">{likesCount}</span>
                          <span>Likes</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium" 
                             style={{ backgroundColor: `${colors.secondary}10`, color: colors.secondary }}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="font-bold">{commentsCount}</span>
                          <span>Comments</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Excerpt */}
                    {post.excerpt && (
                      <div className="mb-6">
                        <p className="text-lg leading-relaxed" style={{ color: colors.textLight }}>
                          {post.excerpt}
                        </p>
                      </div>
                    )}

                    {/* Expanded Details */}
                    {expandedPost === post._id && (
                      <div className="mt-8 pt-8 border-t border-gray-100">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                          {/* Likes Section */}
                          <div>
                            <h4 className="text-xl font-bold mb-6 flex items-center" style={{ color: colors.text }}>
                              <div className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center" 
                                   style={{ backgroundColor: `${colors.success}10`, color: colors.success }}>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                              </div>
                              Liked by ({likesCount})
                            </h4>
                            <div className="bg-gray-50 rounded-2xl p-6 max-h-80 overflow-y-auto">
                              {likedUsers.length > 0 ? (
                                <div className="space-y-3">
                                  {likedUsers.map((user, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-100">
                                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                                           style={{ backgroundColor: colors.primary }}>
                                        {user.name.charAt(0).toUpperCase()}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm truncate" style={{ color: colors.text }}>
                                          {user.name}
                                        </p>
                                        <p className="text-sm truncate" style={{ color: colors.textLight }}>
                                          {user.email}
                                        </p>
                                      </div>
                                      <button
                                        onClick={() => refreshUserData(post)}
                                        className="text-xs px-2 py-1 rounded border transition-colors"
                                        style={{ 
                                          borderColor: colors.primary,
                                          color: colors.primary
                                        }}
                                      >
                                        Refresh
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-8">
                                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                                       style={{ backgroundColor: `${colors.textLight}10` }}>
                                    <svg className="w-8 h-8" style={{ color: colors.textLight }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                  </div>
                                  <p className="font-medium" style={{ color: colors.text }}>No likes yet</p>
                                  <p className="text-sm mt-1" style={{ color: colors.textLight }}>Be the first to like this post</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Comments Section */}
                          <div>
                            <h4 className="text-xl font-bold mb-6 flex items-center" style={{ color: colors.text }}>
                              <div className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center" 
                                   style={{ backgroundColor: `${colors.secondary}10`, color: colors.secondary }}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                              </div>
                              Comments ({commentsCount})
                            </h4>
                            <div className="bg-gray-50 rounded-2xl p-6 max-h-80 overflow-y-auto">
                              {commentDetails.length > 0 ? (
                                <div className="space-y-4">
                                  {commentDetails.map((comment, index) => (
                                    <div key={index} className="bg-white rounded-xl border border-gray-100 p-5">
                                      <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                          {comment.avatar ? (
                                            <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full" />
                                          ) : (
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                                                 style={{ backgroundColor: colors.primary }}>
                                              {comment.user.charAt(0).toUpperCase()}
                                            </div>
                                          )}
                                          <div>
                                            <p className="font-semibold text-sm" style={{ color: colors.text }}>
                                              {comment.user}
                                            </p>
                                            <p className="text-xs" style={{ color: colors.textLight }}>
                                              {comment.email}
                                            </p>
                                          </div>
                                        </div>
                                        <span className="text-xs whitespace-nowrap px-2 py-1 rounded-full" 
                                              style={{ backgroundColor: `${colors.textLight}10`, color: colors.textLight }}>
                                          {comment.date}
                                        </span>
                                      </div>
                                      <p className="text-sm leading-relaxed" style={{ color: colors.text }}>
                                        {comment.text}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-8">
                                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                                       style={{ backgroundColor: `${colors.textLight}10` }}>
                                    <svg className="w-8 h-8" style={{ color: colors.textLight }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                  </div>
                                  <p className="font-medium" style={{ color: colors.text }}>No comments yet</p>
                                  <p className="text-sm mt-1" style={{ color: colors.textLight }}>Start a conversation</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Full Content */}
                        {post.content && (
                          <div className="mt-8">
                            <h4 className="text-xl font-bold mb-4 flex items-center" style={{ color: colors.text }}>
                              <div className="w-8 h-8 rounded-lg mr-3 flex items-center justify-center" 
                                   style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              Full Content
                            </h4>
                            <div className="bg-gray-50 rounded-2xl p-6">
                              <p className="leading-relaxed whitespace-pre-line" style={{ color: colors.text }}>
                                {post.content}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsTab;