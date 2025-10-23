import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Top Navigation Component - Only for Desktop
const TopNavigation = ({ currentUser, onOpenAuthModal }) => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo and Title - Left Side */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M&M</span>
            </div>
            <div className="text-left">
              <h1 className="text-lg font-bold text-gray-800">MOMENTS & ME</h1>
            </div>
          </Link>

          {/* Centered Navigation Menu */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition duration-200 text-sm ${
                location.pathname === '/' 
                  ? 'text-purple-600 font-semibold' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/posts" 
              className={`font-medium transition duration-200 text-sm ${
                location.pathname === '/posts' 
                  ? 'text-purple-600 font-semibold' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Stories
            </Link>
            
            {/* ABOUT LINK - HIDE ONLY FOR ADMIN USERS */}
            {!currentUser?.isAdmin && (
              <Link 
                to="/about" 
                className={`font-medium transition duration-200 text-sm ${
                  location.pathname === '/about' 
                    ? 'text-purple-600 font-semibold' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                About Me
              </Link>
            )}
            
            <Link 
              to="/contact" 
              className={`font-medium transition duration-200 text-sm ${
                location.pathname === '/contact' 
                  ? 'text-purple-600 font-semibold' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Contact
            </Link>
            
            {/* ADMIN LINK - ONLY SHOW FOR ADMINS */}
            {currentUser?.isAdmin && (
              <Link 
                to="/admin" 
                className={`font-medium transition duration-200 text-sm ${
                  location.pathname.startsWith('/admin') 
                    ? 'text-red-600 font-semibold' 
                    : 'text-red-500 hover:text-red-600'
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Right Side - User Account Section */}
          <div className="flex justify-end">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 hover:opacity-80 transition duration-200"
                >
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{currentUser.name}</span>
                </Link>
              </div>
            ) : (
              <button 
                onClick={onOpenAuthModal}
                className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-200 shadow-sm"
              >
                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Join Journey</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Bottom Navigation Component - Only for Mobile
const BottomNavigation = ({ currentUser, onOpenAuthModal }) => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        <Link 
          to="/" 
          className={`flex flex-col items-center px-3 py-1 rounded transition duration-200 ${
            location.pathname === '/' 
              ? 'text-purple-600' 
              : 'text-gray-600 hover:text-purple-600'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link 
          to="/posts" 
          className={`flex flex-col items-center px-3 py-1 rounded transition duration-200 ${
            location.pathname === '/posts' 
              ? 'text-purple-600' 
              : 'text-gray-600 hover:text-purple-600'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0-12a2 2 0 012-2h2a2 2 0 012 2m-6 9v2" />
          </svg>
          <span className="text-xs mt-1">Stories</span>
        </Link>

        {/* Profile Link - Center Position */}
        {currentUser ? (
          <Link 
            to="/profile" 
            className={`flex flex-col items-center px-3 py-1 rounded transition duration-200 ${
              location.pathname === '/profile' 
                ? 'text-purple-600' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        ) : (
          <button 
            onClick={onOpenAuthModal}
            className={`flex flex-col items-center px-3 py-1 rounded transition duration-200 ${
              location.pathname === '/profile' 
                ? 'text-purple-600' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-xs mt-1">Join</span>
          </button>
        )}

        {/* ABOUT LINK FOR MOBILE - HIDE ONLY FOR ADMIN USERS */}
        {!currentUser?.isAdmin && (
          <Link 
            to="/about" 
            className={`flex flex-col items-center px-3 py-1 rounded transition duration-200 ${
              location.pathname === '/about' 
                ? 'text-purple-600' 
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs mt-1">About</span>
          </Link>
        )}

        <Link 
          to="/contact" 
          className={`flex flex-col items-center px-3 py-1 rounded transition duration-200 ${
            location.pathname === '/contact' 
              ? 'text-purple-600' 
              : 'text-gray-600 hover:text-purple-600'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-xs mt-1">Connect</span>
        </Link>

        {/* ADMIN LINK FOR MOBILE - ONLY SHOW FOR ADMINS */}
        {currentUser?.isAdmin && (
          <Link 
            to="/admin" 
            className={`flex flex-col items-center px-3 py-1 rounded transition duration-200 ${
              location.pathname.startsWith('/admin') 
                ? 'text-red-600' 
                : 'text-red-500 hover:text-red-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs mt-1">Admin</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

// Mobile Top Bar - Centered Logo Only
const MobileTopBar = () => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40 md:hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center py-3">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">M&M</span>
            </div>
            <div className="text-left">
              <h1 className="text-sm font-bold text-gray-800">MOMENTS & ME</h1>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Layout Component - YEH EXPORT KARNA HAI
const Layout = ({ children, currentUser, onLogout, onOpenAuthModal }) => {
  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <TopNavigation 
        currentUser={currentUser}
        onOpenAuthModal={onOpenAuthModal}
      />
      <MobileTopBar />
      <main className="flex-grow">
        {children}
      </main>
      <BottomNavigation 
        currentUser={currentUser}
        onOpenAuthModal={onOpenAuthModal}
      />
    </div>
  );
};

// EXPORTS - YEH IMPORTANT HAI
export { Layout, TopNavigation, BottomNavigation, MobileTopBar };
export default Layout;