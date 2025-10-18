// src/components/Suggestions.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Suggestions = () => {
  const [suggestedPosts, setSuggestedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = 'http://localhost:5000/api';

  // Fetch suggested posts from MongoDB
  const fetchSuggestedPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/posts/suggestions`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch suggested posts');
      }
      
      const data = await response.json();
      setSuggestedPosts(data.posts || []);
    } catch (err) {
      console.error('Error fetching suggested posts:', err);
      setError('Failed to load suggestions');
      // Fallback: fetch all posts and take first 4
      fetchAllPosts();
    } finally {
      setLoading(false);
    }
  };

  // Fallback function to fetch all posts
  const fetchAllPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`);
      if (response.ok) {
        const data = await response.json();
        // Sort by likes and take top 4
        const sortedPosts = (data.posts || [])
          .sort((a, b) => (b.likes?.count || 0) - (a.likes?.count || 0))
          .slice(0, 4);
        setSuggestedPosts(sortedPosts);
      }
    } catch (err) {
      console.error('Error fetching all posts:', err);
    }
  };

  // Format number with K/M suffix
  const formatCount = (count) => {
    if (!count) return '0';
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  // Format date to relative time
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSuggestedPosts();
    
    // Refresh suggestions every 2 minutes
    const interval = setInterval(fetchSuggestedPosts, 120000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
          <svg className="w-6 h-6 mr-3 text-[#033f63]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Suggested For You
        </h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="flex space-x-4 mt-2">
                    <div className="h-3 bg-gray-200 rounded w-10"></div>
                    <div className="h-3 bg-gray-200 rounded w-10"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && suggestedPosts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Suggested For You</h3>
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Unable to load suggestions</p>
          <button 
            onClick={fetchSuggestedPosts}
            className="mt-3 text-[#033f63] hover:text-[#28666e] font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
        <svg className="w-6 h-6 mr-3 text-[#033f63]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Suggested For You
      </h3>
      
      <div className="space-y-4">
        {suggestedPosts.map((post) => (
          <Link 
            key={post._id}
            to={`/post/${post._id}`}
            className="block p-4 rounded-xl border border-gray-100 hover:border-[#033f63]/20 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex space-x-3">
              {/* Post Image */}
              <div className="flex-shrink-0">
                {post.image ? (
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-12 h-12 rounded-lg object-cover shadow-sm group-hover:shadow-md transition-shadow duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}
                <div 
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br from-[#033f63] to-[#28666e] flex items-center justify-center text-white text-xs font-bold shadow-sm ${post.image ? 'hidden' : 'block'}`}
                >
                  {post.title?.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase() || 'CI'}
                </div>
              </div>

              {/* Post Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 group-hover:text-[#033f63] transition-colors duration-300 line-clamp-2 text-sm leading-tight mb-1">
                  {post.title}
                </h4>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                  {/* Likes */}
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span>{formatCount(post.likes?.count || 0)}</span>
                  </div>

                  {/* Comments */}
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{formatCount(post.comments?.length || 0)}</span>
                  </div>

                  {/* Time */}
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatRelativeTime(post.date)}</span>
                  </div>
                </div>

                {/* Category Tag */}
                {post.category && (
                  <div className="mt-2">
                    <span className="inline-block bg-[#033f63]/10 text-[#033f63] text-xs px-2 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Trending Badge for popular posts */}
              {(post.likes?.count || 0) > 50 && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#b5b682] to-[#c5c592] text-[#033f63]">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    Hot
                  </span>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      {suggestedPosts.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Link 
            to="/posts"
            className="flex items-center justify-center text-[#033f63] hover:text-[#28666e] font-medium text-sm group"
          >
            View All Posts
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Suggestions;