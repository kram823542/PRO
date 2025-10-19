import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersTab from '../admin/UsersTab';
import PostsTab from '../admin/PostsTab';
import PostForm from '../admin/PostForm';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [progress, setProgress] = useState({
    step: '',
    percentage: 0,
    message: ''
  });
  const navigate = useNavigate();

  // Professional Color Scheme - Same as before
  const colors = {
    primary: '#2563eb',      // Professional Blue
    secondary: '#1e40af',    // Dark Blue
    accent: '#f59e0b',       // Amber
    dark: '#0f172a',         // Dark Slate
    light: '#f8fafc',        // Light Background
    text: '#1e293b',         // Text Color
    textLight: '#64748b',    // Light Text
    success: '#10b981',      // Green
    warning: '#f59e0b',      // Amber
    error: '#ef4444'         // Red
  };

  // const API_BASE_URL = '${process.env.REACT_APP_API_URL}/api';
  const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api`;

  // Progress tracking function
  const updateProgress = (step, percentage, message = '') => {
    setProgress({
      step,
      percentage,
      message
    });
    console.log(`🔄 ${step}: ${percentage}% - ${message}`);
  };

  // Admin authentication check
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    verifyAdminAndLoadData();
  }, [navigate]);

  // Admin verify and load data with progress tracking
  const verifyAdminAndLoadData = async () => {
    try {
      updateProgress('Authentication', 30, 'Verifying admin access...');
      
      const token = localStorage.getItem('adminToken');
      
      const statsResponse = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!statsResponse.ok) {
        throw new Error('Not authorized');
      }

      updateProgress('Loading Data', 60, 'Fetching platform statistics...');

      const statsData = await statsResponse.json();
      if (statsData.success) {
        setStats(statsData.stats);
      }

      updateProgress('Complete', 100, 'Admin panel ready!');
      setLoading(false);
      
      setTimeout(() => {
        setProgress({ step: '', percentage: 0, message: '' });
      }, 2000);

    } catch (error) {
      console.error('Authentication error:', error);
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  // Tab change handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', color: colors.primary },
    { id: 'users', label: 'Users', icon: '👥', color: colors.success },
    { id: 'posts', label: 'Posts', icon: '📝', color: colors.warning }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.light }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: colors.primary }}></div>
          <p className="mt-4" style={{ color: colors.text }}>Loading Admin Panel...</p>
          {progress.step && (
            <div className="mt-4">
              <div className="w-64 rounded-full h-2 mx-auto" style={{ backgroundColor: colors.light }}>
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%`, backgroundColor: colors.primary }}
                ></div>
              </div>
              <p className="text-sm mt-2" style={{ color: colors.textLight }}>{progress.message}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.light }}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-xl transition-all duration-300 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b" style={{ borderColor: colors.light }}>
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold" style={{ color: colors.dark }}>Admin Panel</h1>
                <p className="text-sm mt-1" style={{ color: colors.textLight }}>Management Console</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition duration-200"
              style={{ color: colors.text }}
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition duration-200 ${
                    activeTab === item.id ? 'shadow-md' : 'hover:bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: activeTab === item.id ? item.color : 'transparent',
                    color: activeTab === item.id ? 'white' : colors.text
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {sidebarOpen && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t" style={{ borderColor: colors.light }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg transition duration-200 hover:bg-red-50"
            style={{ color: colors.error }}
          >
            <span className="text-lg">🚪</span>
            {sidebarOpen && (
              <span className="ml-3 font-medium">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b" style={{ borderColor: colors.light }}>
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                {/* WELCOME BOSS! Heading Added Here */}
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  WELCOME BOSS! 👑
                </h1>
                <p className="mt-1" style={{ color: colors.textLight }}>
                  {activeTab === 'dashboard' && 'Platform Overview & Analytics'}
                  {activeTab === 'users' && 'User Management & Insights'}
                  {activeTab === 'posts' && 'Content Management & Performance'}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Quick Stats */}
                {stats && activeTab === 'dashboard' && (
                  <div className="hidden md:flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm" style={{ color: colors.textLight }}>Users</p>
                      <p className="text-lg font-bold" style={{ color: colors.primary }}>{stats.totalUsers}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm" style={{ color: colors.textLight }}>Posts</p>
                      <p className="text-lg font-bold" style={{ color: colors.success }}>{stats.totalPosts}</p>
                    </div>
                  </div>
                )}

                {/* New Post Button */}
                {activeTab === 'posts' && (
                  <button
                    onClick={() => setShowPostForm(true)}
                    className="px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-2 font-medium"
                    style={{ backgroundColor: colors.primary, color: 'white' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = colors.secondary}
                    onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
                  >
                    <span>+</span>
                    <span>New Post</span>
                  </button>
                )}

                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" 
                    style={{ backgroundColor: colors.primary }}>
                    A
                  </div>
                  {sidebarOpen && (
                    <div className="text-right">
                      <p className="text-sm font-medium" style={{ color: colors.text }}>Admin</p>
                      <p className="text-xs" style={{ color: colors.textLight }}>Administrator</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Global Progress Bar */}
        {progress.step && progress.percentage > 0 && progress.percentage < 100 && (
          <div className="bg-blue-50 border-b" style={{ borderColor: colors.light }}>
            <div className="px-6 py-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: colors.primary }}>{progress.step}</span>
                <span className="text-sm" style={{ color: colors.primary }}>{progress.percentage}%</span>
              </div>
              <div className="w-full rounded-full h-2 mt-1" style={{ backgroundColor: colors.light }}>
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%`, backgroundColor: colors.primary }}
                ></div>
              </div>
              <p className="text-xs mt-1" style={{ color: colors.textLight }}>{progress.message}</p>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && stats && (
              <div>
                {/* Welcome Section */}
                <div className="mb-8">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">Welcome Back, Boss! 🚀</h2>
                    <p className="text-blue-100 text-lg mb-6">
                      Here's what's happening with your platform today. Everything is under your command!
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                        <span className="font-semibold">Total Users:</span> {stats.totalUsers}
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                        <span className="font-semibold">Total Posts:</span> {stats.totalPosts}
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                        <span className="font-semibold">Recent Activity:</span> {stats.recentPosts?.length || 0} posts
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition duration-200">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.primary}20` }}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium" style={{ color: colors.textLight }}>Total Users</p>
                        <p className="text-2xl font-bold" style={{ color: colors.text }}>{stats.totalUsers}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition duration-200">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.success}20` }}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.success }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0-12a2 2 0 012-2h2a2 2 0 012 2m-6 9v2" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium" style={{ color: colors.textLight }}>Total Posts</p>
                        <p className="text-2xl font-bold" style={{ color: colors.text }}>{stats.totalPosts}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition duration-200">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.warning}20` }}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.warning }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium" style={{ color: colors.textLight }}>Recent Posts</p>
                        <p className="text-2xl font-bold" style={{ color: colors.text }}>{stats.recentPosts?.length || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition duration-200">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.error}20` }}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.error }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium" style={{ color: colors.textLight }}>Categories</p>
                        <p className="text-2xl font-bold" style={{ color: colors.text }}>{stats.categories || 5}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Posts */}
                  <div className="bg-white rounded-xl shadow-sm border">
                    <div className="px-6 py-4 border-b" style={{ borderColor: colors.light }}>
                      <h3 className="text-lg font-semibold" style={{ color: colors.text }}>Recent Posts</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y" style={{ borderColor: colors.light }}>
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textLight }}>Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textLight }}>Author</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.textLight }}>Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y" style={{ borderColor: colors.light }}>
                          {stats.recentPosts?.map((post) => (
                            <tr key={post._id} className="hover:bg-gray-50 transition duration-150">
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium" style={{ color: colors.text }}>{post.title}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm" style={{ color: colors.textLight }}>{post.author?.name || 'Unknown'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.textLight }}>
                                {new Date(post.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Quick Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowPostForm(true)}
                        className="w-full flex items-center justify-between p-4 rounded-lg border transition duration-200 hover:shadow-md"
                        style={{ borderColor: colors.light }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.primary}20` }}>
                            <span style={{ color: colors.primary }}>📝</span>
                          </div>
                          <span style={{ color: colors.text }}>Create New Post</span>
                        </div>
                        <span style={{ color: colors.textLight }}>→</span>
                      </button>
                      
                      <button
                        onClick={() => handleTabChange('users')}
                        className="w-full flex items-center justify-between p-4 rounded-lg border transition duration-200 hover:shadow-md"
                        style={{ borderColor: colors.light }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.success}20` }}>
                            <span style={{ color: colors.success }}>👥</span>
                          </div>
                          <span style={{ color: colors.text }}>Manage Users</span>
                        </div>
                        <span style={{ color: colors.textLight }}>→</span>
                      </button>

                      <button
                        onClick={() => handleTabChange('posts')}
                        className="w-full flex items-center justify-between p-4 rounded-lg border transition duration-200 hover:shadow-md"
                        style={{ borderColor: colors.light }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colors.warning}20` }}>
                            <span style={{ color: colors.warning }}>📊</span>
                          </div>
                          <span style={{ color: colors.text }}>View All Posts</span>
                        </div>
                        <span style={{ color: colors.textLight }}>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <UsersTab 
                updateProgress={updateProgress}
                progress={progress}
              />
            )}

            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <PostsTab 
                updateProgress={updateProgress}
                progress={progress}
                showPostForm={showPostForm}
                setShowPostForm={setShowPostForm}
              />
            )}
          </div>
        </main>
      </div>

      {/* Post Form Modal */}
      {showPostForm && (
        <PostForm 
          setShowPostForm={setShowPostForm}
          updateProgress={updateProgress}
          progress={progress}
          onPostCreated={() => {
            if (activeTab === 'posts') {
              setActiveTab('posts');
            }
          }}
        />
      )}
    </div>
  );
};

export default AdminPanel;