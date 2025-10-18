import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:5000/api';

  // State for popular tags - Updated for vlog style
  const [popularTags] = useState(['Adventure', 'Fantasy', 'Challenge', 'Travel', 'Exploration', 'Dreams', 'Journey', 'Discovery']);

  // Fetch posts from MongoDB
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/posts`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data.posts || []);
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Show only latest 3 posts on home page
  const latestPosts = posts.slice(0, 3);

  // Function to format post date
  const formatPostDate = (postDate) => {
    const date = new Date(postDate);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Handle share click
  const handleShareClick = (post, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const shareText = `Check out this story: ${post.title} - MOMENTS & ME`;
    const shareUrl = window.location.origin + `/post/${post._id}`;
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: shareText,
        url: shareUrl,
      })
      .catch(console.error);
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch(() => {
          window.open(shareUrl, '_blank');
        });
    }
  };

  // Handle tag click
  const handleTagClick = (tag) => {
    navigate('/posts', { state: { selectedTag: tag } });
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    navigate('/posts', { state: { selectedCategory: category } });
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Loading amazing stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Unable to Load Content</h2>
          <p className="text-red-100 mb-6">{error}</p>
          <button 
            onClick={fetchPosts}
            className="bg-white text-purple-600 px-8 py-3 rounded-xl hover:bg-gray-100 transition duration-300 font-semibold shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Vlog Style Hero Section */}
      <section className="relative text-white py-20 md:py-32 overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-sm font-medium">✨ Live Your Dreams, Share Your Journey</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                Adventure
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-200 to-pink-300 bg-clip-text text-transparent">
                Awaits You
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 leading-relaxed max-w-3xl mx-auto font-light text-purple-100">
              Join me on an extraordinary journey through fantasy realms, thrilling challenges, 
              and unforgettable adventures that push the boundaries of imagination
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link 
                to="/posts" 
                className="group bg-white text-purple-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg hover:scale-105 flex items-center"
              >
                <svg className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0-12a2 2 0 012-2h2a2 2 0 012 2m-6 9v2" />
                </svg>
                Explore Stories
              </Link>
              <Link 
                to="/about" 
                className="group bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all duration-300 text-lg transform hover:-translate-y-1 flex items-center"
              >
                <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                My Journey
              </Link>
            </div>

            {/* Stats Section - Updated for Vlog */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-purple-200 text-sm">Adventures</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">25+</div>
                <div className="text-purple-200 text-sm">Fantasy Tales</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-purple-200 text-sm">Challenges</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100K+</div>
                <div className="text-purple-200 text-sm">Dreamers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Latest Stories Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-600 font-semibold text-sm mb-4">
              📖 LATEST STORIES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Recent <span className="text-purple-600">Adventures</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Dive into my latest journeys through fantasy worlds and real-life challenges
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {latestPosts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                  <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">No Stories Yet</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">The adventure begins soon! Stay tuned for amazing stories</p>
                  <Link 
                    to="/posts" 
                    className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 font-semibold"
                  >
                    Browse All Stories
                  </Link>
                </div>
              ) : (
                <div className="grid gap-8">
                  {latestPosts.map((post, index) => (
                    <article 
                      key={post._id} 
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-100 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Post Image */}
                        <div className="md:w-2/5 relative overflow-hidden">
                          {post.image ? (
                            <img 
                              src={post.image}
                              alt={post.title}
                              className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-64 md:h-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                              <div className="text-center text-white p-6">
                                <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="text-lg font-bold">Adventure Story</h3>
                              </div>
                            </div>
                          )}
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span 
                              onClick={() => handleCategoryClick(post.category)}
                              className="bg-white/90 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-lg text-sm font-bold hover:bg-purple-600 hover:text-white cursor-pointer transition-all duration-300 shadow-lg"
                            >
                              {post.category || 'Adventure'}
                            </span>
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="md:w-3/5 p-8">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500 text-sm font-medium flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatPostDate(post.date)}
                            </span>
                            
                            <div className="flex items-center space-x-4">
                              {post.likes?.count > 0 && (
                                <span className="text-red-600 text-sm font-semibold flex items-center">
                                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                  </svg>
                                  {post.likes.count}
                                </span>
                              )}
                              
                              <button 
                                onClick={(e) => handleShareClick(post, e)}
                                className="text-gray-400 hover:text-purple-600 transition-colors duration-300"
                                title="Share this story"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold mb-4 text-gray-900 leading-tight group-hover:text-purple-600 transition-colors duration-300">
                            <Link to={`/post/${post._id}`} className="hover:text-purple-600 transition-colors duration-300">
                              {post.title}
                            </Link>
                          </h3>
                          
                          <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                            {post.excerpt || post.content?.substring(0, 200) + '...'}
                          </p>
                          
                          {/* Tags */}
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                              {post.tags.slice(0, 4).map(tag => (
                                <span 
                                  key={tag}
                                  onClick={() => handleTagClick(tag)}
                                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-purple-100 hover:text-purple-700 cursor-pointer transition-all duration-300 font-medium"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                {post.author ? post.author.split(' ').map(n => n[0]).join('').toUpperCase() : 'MM'}
                              </div>
                              <div className="ml-3">
                                <span className="text-gray-800 font-bold block text-sm">{post.author || 'MOMENTS & ME'}</span>
                                <span className="text-gray-500 text-xs">Storyteller</span>
                              </div>
                            </div>
                            <Link 
                              to={`/post/${post._id}`}
                              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm"
                            >
                              Read Story
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              {/* Popular Topics */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold mb-6 flex items-center text-gray-900">
                  <svg className="w-5 h-5 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Popular Themes
                </h3>
                <div className="flex flex-wrap gap-3">
                  {popularTags.map(tag => (
                    <span 
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg text-sm hover:bg-purple-100 cursor-pointer transition-all duration-300 font-medium border border-purple-200 hover:border-purple-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Newsletter - Updated for Vlog */}
              <Newsletter 
                title="Adventure Updates"
                description="Get notified when new fantasy adventures and challenges are published"
                buttonText="Join the Journey"
                successMessage="Welcome to our adventure community! You'll receive our next story update."
                variant="default"
              />
            </div>
          </div>

          {/* View All Posts CTA */}
          {posts.length > 3 && (
            <div className="text-center mt-16">
              <Link 
                to="/posts"
                className="inline-flex items-center bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
              >
                Explore All Adventures
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;