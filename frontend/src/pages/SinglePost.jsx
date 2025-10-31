// src/pages/SinglePost.jsx - ENHANCED PROFESSIONAL VERSION
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Suggestions from '../components/Suggestions';
import Comments from '../components/Comments';

const SinglePost = ({ currentUser, onLoginRequest }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const API_BASE_URL = 'https://pro-muko.onrender.com/api';

  // Calculate reading time
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const content = document.querySelector('.post-content');
      if (!content) return;

      const contentHeight = content.offsetHeight;
      const scrollPosition = window.scrollY - content.offsetTop + 200;
      const progress = (scrollPosition / contentHeight) * 100;
      setReadingProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  // Fetch data on component mount
  useEffect(() => {
    fetchPost();
  }, [id]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Reading Progress Skeleton */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Main Content Skeleton */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
              {/* Image Skeleton */}
              <div className="w-full h-64 md:h-96 bg-gray-300"></div>
              
              <div className="p-6 md:p-8">
                {/* Meta Info Skeleton */}
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-8 bg-gray-300 rounded-full w-24"></div>
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>

                {/* Title Skeleton */}
                <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
                <div className="h-8 bg-gray-300 rounded mb-6 w-1/2"></div>

                {/* Tags Skeleton */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-6 bg-gray-300 rounded w-16"></div>
                  ))}
                </div>

                {/* Content Skeleton */}
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
                  ))}
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-3">
                    <div className="h-16 bg-gray-300 rounded w-16 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Article Not Found</h2>
          <p className="text-gray-600 mb-2">{error || 'The article you are looking for does not exist.'}</p>
          <p className="text-gray-500 text-sm mb-6">It might have been moved or deleted.</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => navigate(-1)}
              className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition duration-300 font-medium flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
            <Link 
              to="/posts" 
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition duration-300 font-medium flex items-center"
            >
              Browse Articles
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <article className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
              {/* Hero Image with Overlay */}
              {post.image && (
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className={`w-full h-64 md:h-96 object-cover transition-all duration-700 ${
                      imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Back Button */}
                  <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-xl hover:bg-white transition duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                </div>
              )}
              
              <div className="p-6 md:p-8">
                {/* Post Meta Info */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform hover:scale-105 transition duration-300 cursor-default">
                      {post.category || 'Uncategorized'}
                    </span>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-medium">by {post.author || 'Unknown Author'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {readingTime} min read
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.date ? formatDate(post.date) : 'Unknown date'}
                    </div>
                  </div>
                </div>

                {/* Title with Animation */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
                  {post.title || 'Untitled Post'}
                </h1>

                {/* Post Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {post.tags.map((tag, index) => (
                      <span 
                        key={tag}
                        className="bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium border border-blue-200 shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-0.5 cursor-default"
                        style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Post Content with Styling */}
                <div 
                  className="post-content text-gray-700 mb-8 leading-relaxed text-lg prose prose-lg max-w-none animate-fade-in-up"
                  style={{ animationDelay: '0.4s' }}
                  dangerouslySetInnerHTML={{ 
                    __html: post.content || '<p class="text-gray-500 italic">No content available for this article.</p>' 
                  }}
                />

                {/* Article Footer */}
                <div className="border-t border-gray-100 pt-6 mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>Thank you for reading!</span>
                    </div>
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300 font-medium flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      Back to Top
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Comments Component */}
            <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Comments 
                postId={id}
                currentUser={currentUser}
                onLoginRequest={onLoginRequest}
              />
            </div>
          </div>

          {/* Sidebar with Suggestions */}
          <div className="lg:w-80 space-y-6">
            {/* Sticky Sidebar */}
            <div className="sticky top-24 space-y-6">
              {/* Suggestions Component */}
              <div className="animate-fade-in-right">
                <Suggestions />
              </div>
              
              {/* Additional Info Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform hover:shadow-2xl transition duration-300 animate-fade-in-right" style={{ animationDelay: '0.3s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">About Climate Intelligence</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  We're dedicated to advancing environmental conservation through cutting-edge AI research and sustainable solutions that make a real impact.
                </p>
                <Link 
                  to="/about"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold group"
                >
                  Learn more about our mission
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              {/* Share Card */}
              <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-6 text-white animate-fade-in-right" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-lg font-bold mb-3">Enjoyed this article?</h3>
                <p className="text-green-100 mb-4 text-sm">Share it with others who might find it valuable!</p>
                <div className="flex gap-2">
                  {['Twitter', 'LinkedIn', 'Facebook'].map((platform) => (
                    <button
                      key={platform}
                      className="flex-1 bg-white/20 backdrop-blur-sm py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition duration-300"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out forwards;
        }
        
        /* Enhanced prose styling */
        .prose {
          line-height: 1.75;
        }
        .prose h2 {
          color: #1f2937;
          font-weight: 700;
          font-size: 1.5em;
          margin-top: 2em;
          margin-bottom: 1em;
        }
        .prose h3 {
          color: #374151;
          font-weight: 600;
          font-size: 1.25em;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .prose p {
          margin-bottom: 1.5em;
        }
        .prose ul, .prose ol {
          margin-bottom: 1.5em;
          padding-left: 1.5em;
        }
        .prose li {
          margin-bottom: 0.5em;
        }
        .prose blockquote {
          border-left: 4px solid #10b981;
          padding-left: 1.5em;
          margin: 2em 0;
          font-style: italic;
          color: #6b7280;
        }
        .prose code {
          background-color: #f3f4f6;
          padding: 0.25em 0.5em;
          border-radius: 0.375em;
          font-size: 0.875em;
        }
        .prose pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1.5em;
          border-radius: 0.75em;
          overflow-x: auto;
          margin: 2em 0;
        }
      `}</style>
    </div>
  );
};

export default SinglePost;