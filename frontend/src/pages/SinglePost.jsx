// src/pages/SinglePost.jsx - CLEANED UP VERSION
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Suggestions from '../components/Suggestions';
import Comments from '../components/Comments';

const SinglePost = ({ currentUser, onLoginRequest }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const API_BASE_URL = '${process.env.REACT_APP_API_URL}/api';
  const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api`;

  // Fetch post function
  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/posts/${id}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch post' }));
        throw new Error(errorData.message || 'Failed to fetch post');
      }
      const data = await response.json();
      setPost(data);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
          <p className="text-red-600 mb-4">{error || 'The article you are looking for does not exist.'}</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {post.image && (
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-64 md:h-96 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              
              <div className="p-6 md:p-8">
                {/* Post Meta Info */}
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {post.category || 'Uncategorized'}
                    </span>
                    <span className="text-gray-600 font-medium">by {post.author || 'Unknown Author'}</span>
                  </div>
                  <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-lg text-sm">
                    {post.date ? new Date(post.date).toLocaleDateString() : 'Unknown date'}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title || 'Untitled Post'}
                </h1>

                {/* Post Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map(tag => (
                      <span 
                        key={tag}
                        className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium border border-blue-200 shadow-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Post Content */}
                <div 
                  className="text-gray-700 mb-8 leading-relaxed text-lg prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content || '<p>No content available.</p>' }}
                />
              </div>
            </article>

            {/* Comments Component */}
            <Comments 
              postId={id}
              currentUser={currentUser}
              onLoginRequest={onLoginRequest}
            />
          </div>

          {/* Sidebar with Suggestions */}
          <div className="lg:w-80 space-y-6">
            {/* Suggestions Component */}
            <Suggestions />
            
            {/* Additional sidebar content */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-900">About Climate Intelligence</h3>
              <p className="text-gray-600 mb-4">
                Climate Intelligence is dedicated to advancing environmental conservation through cutting-edge AI research and sustainable solutions.
              </p>
              <Link 
                to="/about"
                className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;