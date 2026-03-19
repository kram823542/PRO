
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import About from './pages/About';
import ContactMe from './pages/ContactMe';
import AdminContacts from './pages/AdminContacts';
import PublicPost from './pages/PublicPost'; // Import PublicPost component

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Posts from './pages/Posts';

import './App.css';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/admin/login" />;
    }
    return children;
  };

  return (
    <Router>

      <Toaster position="top-right" />

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={
          <>
            <Navbar />
            <Home />
          </>
        } />

        <Route path="/about" element={
          <>
            <Navbar />
            <About />
          </>
        } />

        <Route path="/contactme" element={
          <>
            <Navbar />
            <ContactMe />
          </>
        } />

        {/* Public Post Route - Individual post view */}
        <Route path="/post/:id" element={
          <>
            <Navbar />
            <PublicPost />
          </>
        } />

        {/* Login */}

        <Route path="/admin/login"
          element={
            isAuthenticated
              ? <Navigate to="/admin/dashboard" />
              : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />

        {/* Dashboard */}

        <Route path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Sidebar />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />

        {/* Posts */}

        <Route path="/admin/posts"
          element={
            <ProtectedRoute>
              <>
                <Sidebar />
                <Posts />
              </>
            </ProtectedRoute>
          }
        />

        {/* Create */}

        <Route path="/admin/create-post"
          element={
            <ProtectedRoute>
              <>
                <Sidebar />
                <CreatePost />
              </>
            </ProtectedRoute>
          }
        />

        {/* Edit */}

        <Route path="/admin/edit/:id"
          element={
            <ProtectedRoute>
              <>
                <Sidebar />
                <EditPost />
              </>
            </ProtectedRoute>
          }
        />

        {/* Contacts */}

        <Route path="/admin/contacts"
          element={
            <ProtectedRoute>
              <>
                <Sidebar />
                <AdminContacts />
              </>
            </ProtectedRoute>
          }
        />

      </Routes>

    </Router>
  );
}

export default App;