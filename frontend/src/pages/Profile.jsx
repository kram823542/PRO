// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, onLogout, darkMode, onToggleDarkMode }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userStats, setUserStats] = useState({
    posts: 0,
    comments: 0,
    likes: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const API_BASE_URL = 'https://pro-muko.onrender.com/api';

  // Show toast message
  const showComingSoonToast = (feature) => {
    setToastMessage(`${feature} - Coming Soon!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Fetch user statistics
  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user?.token) return;
      
      try {
        setIsLoading(true);
        
        const postsResponse = await fetch(`${API_BASE_URL}/posts/user`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        
        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          setUserStats(prev => ({
            ...prev,
            posts: postsData.count || 0
          }));
        }

        // Mock data for other stats
        setUserStats(prev => ({
          ...prev,
          comments: Math.floor(Math.random() * 20),
          likes: Math.floor(Math.random() * 50)
        }));

      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        console.log('Account deletion requested for:', user.id);
        alert('Account deletion feature will be implemented soon');
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  const handleEditProfile = () => {
    showComingSoonToast('Edit Profile');
  };

  const handleWritePost = () => {
    showComingSoonToast('Write Post');
  };

  const handleToggleSetting = (settingName) => {
    showComingSoonToast(`${settingName} Setting`);
  };

  if (!user) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-4 pt-20`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Please Login</h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} pb-20 md:pb-0 pt-16 md:pt-0 transition-colors duration-300`}>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border rounded-lg shadow-lg p-4 max-w-sm transform transition-all duration-300`}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">⚡</span>
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {toastMessage}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Feature under development
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                {user.name}
              </h1>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600 transition-colors duration-300'}>
                {user.email}
              </p>
              <p className="text-sm text-blue-500 font-medium capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 space-y-2 transition-colors duration-300`}>
              {[
                { id: 'profile', label: 'Profile Info', icon: '👤' },
                { id: 'activity', label: 'My Activity', icon: '📊' },
                { id: 'settings', label: 'Settings', icon: '⚙️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                    activeTab === tab.id
                      ? darkMode 
                        ? 'bg-blue-900 text-blue-100 border border-blue-700' 
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                      : darkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 mt-6 space-y-3 transition-colors duration-300`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
                Quick Actions
              </h3>
              <button
                onClick={handleEditProfile}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={handleWritePost}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                📝 Write Post
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                🚪 Logout
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Profile Info Tab */}
            {activeTab === 'profile' && (
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 transition-colors duration-300`}>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 transition-colors duration-300`}>
                  Profile Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Full Name', value: user.name },
                    { label: 'Email Address', value: user.email },
                    { label: 'Account Type', value: user.role },
                    { label: 'Member Since', value: new Date().toLocaleDateString() }
                  ].map((field, index) => (
                    <div key={index}>
                      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>
                        {field.label}
                      </label>
                      <div className={`p-3 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg border transition-colors duration-300`}>
                        <p className={darkMode ? 'text-white' : 'text-gray-900 transition-colors duration-300'}>
                          {field.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>
                    Bio
                  </h3>
                  <div className={`p-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg border min-h-20 transition-colors duration-300`}>
                    <p className={darkMode ? 'text-gray-300 italic' : 'text-gray-600 italic transition-colors duration-300'}>
                      {user.bio || "No bio added yet. Click 'Edit Profile' to add a bio."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 transition-colors duration-300`}>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 transition-colors duration-300`}>
                  My Activity
                </h2>
                
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                      Loading your activity...
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                      { count: userStats.posts, label: 'Posts Published', color: 'blue' },
                      { count: userStats.comments, label: 'Comments Made', color: 'green' },
                      { count: userStats.likes, label: 'Posts Liked', color: 'purple' }
                    ].map((stat, index) => (
                      <div 
                        key={index}
                        className={`p-6 rounded-xl border text-center shadow-md ${
                          darkMode 
                            ? `bg-gray-700 border-${stat.color}-500`
                            : `bg-${stat.color}-50 border-${stat.color}-200`
                        } transition-colors duration-300`}
                      >
                        <div className={`text-2xl font-bold ${
                          darkMode ? 'text-white' : `text-${stat.color}-700`
                        } mb-2 transition-colors duration-300`}>
                          {stat.count}
                        </div>
                        <div className={`font-medium ${
                          darkMode ? 'text-gray-300' : `text-${stat.color}-600`
                        } transition-colors duration-300`}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {[
                      { type: 'Published a new post', time: '2 hours ago', icon: '📝', color: 'green' },
                      { type: 'Commented on a post', time: '1 day ago', icon: '💬', color: 'blue' },
                      { type: 'Liked a post', time: '2 days ago', icon: '❤️', color: 'purple' }
                    ].map((activity, index) => (
                      <div 
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-50'
                        } transition-colors duration-300`}
                      >
                        <div className={`w-8 h-8 ${
                          darkMode ? 'bg-gray-600' : `bg-${activity.color}-100`
                        } rounded-full flex items-center justify-center transition-colors duration-300`}>
                          <span className={`text-sm ${
                            darkMode ? 'text-white' : `text-${activity.color}-600`
                          }`}>
                            {activity.icon}
                          </span>
                        </div>
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                            {activity.type}
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 transition-colors duration-300`}>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 transition-colors duration-300`}>
                  Account Settings
                </h2>
                
                <div className="space-y-6">
                  {[
                    { 
                      title: 'Dark Mode', 
                      description: 'Switch between light and dark theme',
                      checked: darkMode,
                      onChange: onToggleDarkMode
                    },
                    { 
                      title: 'Email Notifications', 
                      description: 'Receive updates about your activity',
                      checked: true,
                      onChange: () => handleToggleSetting('Email Notifications')
                    },
                    { 
                      title: 'Push Notifications', 
                      description: 'Get notified about new posts',
                      checked: true,
                      onChange: () => handleToggleSetting('Push Notifications')
                    }
                  ].map((setting, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                      } transition-colors duration-300`}
                    >
                      <div>
                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                          {setting.title}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
                          {setting.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={setting.checked}
                          onChange={setting.onChange}
                        />
                        <div className={`w-11 h-6 ${
                          darkMode ? 'bg-gray-600' : 'bg-gray-200'
                        } peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 transition-colors duration-300`}></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    🗑️ Delete Account
                  </button>
                  <p className="text-red-500 text-sm mt-2">
                    Warning: This action cannot be undone. All your data will be permanently deleted.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add custom animation for toast */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;