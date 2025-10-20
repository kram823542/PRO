// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Layout } from './components/Navigation';
// import Home from './pages/Home';
// import Posts from './pages/Posts';
// import SinglePost from './pages/SinglePost';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Profile from './pages/Profile';
// import AdminPanel from './pages/AdminPanel';
// import AdminLogin from './pages/AdminLogin';
// import LoginForm from './components/LoginForm';

// function App() {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [showAuthModal, setShowAuthModal] = useState(false);

//   // Check if user is already logged in on app start
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (token && userData) {
//       try {
//         const user = JSON.parse(userData);
//         setCurrentUser({
//           ...user,
//           token: token,
//           isAdmin: user.role === 'admin' || user.isAdmin
//         });
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//       }
//     }
//   }, []);

//   const handleLogin = (userData) => {
//     setCurrentUser(userData);
//     console.log('User logged in:', userData);
//   };

//   const handleRegister = (userData) => {
//     setCurrentUser(userData);
//     console.log('User registered:', userData);
//   };

//   const handleLogout = () => {
//     setCurrentUser(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     console.log('User logged out');
//   };

//   const handleOpenAuthModal = () => {
//     setShowAuthModal(true);
//   };

//   const handleCloseAuthModal = () => {
//     setShowAuthModal(false);
//   };

//   return (
//     <Router>
//       <LoginForm 
//         isOpen={showAuthModal}
//         onClose={handleCloseAuthModal}
//         onLogin={handleLogin}
//         onRegister={handleRegister}
//         currentUser={currentUser}
//         onLogout={handleLogout}
//       />
      
//       <Routes>
//         <Route path="/" element={
//           <Layout 
//             currentUser={currentUser}
//             onLogout={handleLogout}
//             onOpenAuthModal={handleOpenAuthModal}
//           >
//             <Home />
//           </Layout>
//         } />
//         <Route path="/posts" element={
//           <Layout 
//             currentUser={currentUser}
//             onLogout={handleLogout}
//             onOpenAuthModal={handleOpenAuthModal}
//           >
//             <Posts />
//           </Layout>
//         } />
//         <Route path="/post/:id" element={
//           <Layout 
//             currentUser={currentUser}
//             onLogout={handleLogout}
//             onOpenAuthModal={handleOpenAuthModal}
//           >
//             <SinglePost currentUser={currentUser} />
//           </Layout>
//         } />
//         <Route path="/about" element={
//           <Layout 
//             currentUser={currentUser}
//             onLogout={handleLogout}
//             onOpenAuthModal={handleOpenAuthModal}
//           >
//             <About />
//           </Layout>
//         } />
//         <Route path="/contact" element={
//           <Layout 
//             currentUser={currentUser}
//             onLogout={handleLogout}
//             onOpenAuthModal={handleOpenAuthModal}
//           >
//             <Contact />
//           </Layout>
//         } />
//         <Route path="/profile" element={
//           currentUser ? (
//             <Layout 
//               currentUser={currentUser}
//               onLogout={handleLogout}
//               onOpenAuthModal={handleOpenAuthModal}
//             >
//               <Profile user={currentUser} onLogout={handleLogout} />
//             </Layout>
//           ) : (
//             <Navigate to="/" replace />
//           )
//         } />
        
//         {/* ADMIN ROUTES */}
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin" element={<AdminPanel />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Navigation';
import Home from './pages/Home';
import Posts from './pages/Posts';
import SinglePost from './pages/SinglePost';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import LoginForm from './components/LoginForm';

// ✅ API BASE URL
const API_BASE_URL = 'https://pro-muko.onrender.com';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Check if user is already logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser({
          ...user,
          token: token,
          isAdmin: user.role === 'admin' || user.isAdmin
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // ✅ Global API URL access
  useEffect(() => {
    window.API_BASE_URL = API_BASE_URL;
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    console.log('User logged in:', userData);
  };

  const handleRegister = (userData) => {
    setCurrentUser(userData);
    console.log('User registered:', userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('adminToken'); // ✅ Admin token bhi remove karo
    console.log('User logged out');
  };

  const handleOpenAuthModal = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  // ✅ Admin route protection
  const AdminRoute = ({ children }) => {
    const adminToken = localStorage.getItem('adminToken');
    return adminToken ? children : <Navigate to="/admin/login" />;
  };

  return (
    <Router>
      <LoginForm 
        isOpen={showAuthModal}
        onClose={handleCloseAuthModal}
        onLogin={handleLogin}
        onRegister={handleRegister}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <Layout 
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenAuthModal={handleOpenAuthModal}
          >
            <Home API_BASE_URL={API_BASE_URL} />
          </Layout>
        } />
        
        <Route path="/posts" element={
          <Layout 
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenAuthModal={handleOpenAuthModal}
          >
            <Posts API_BASE_URL={API_BASE_URL} />
          </Layout>
        } />
        
        <Route path="/post/:id" element={
          <Layout 
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenAuthModal={handleOpenAuthModal}
          >
            <SinglePost currentUser={currentUser} API_BASE_URL={API_BASE_URL} />
          </Layout>
        } />
        
        <Route path="/about" element={
          <Layout 
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenAuthModal={handleOpenAuthModal}
          >
            <About />
          </Layout>
        } />
        
        <Route path="/contact" element={
          <Layout 
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenAuthModal={handleOpenAuthModal}
          >
            <Contact />
          </Layout>
        } />
        
        <Route path="/profile" element={
          currentUser ? (
            <Layout 
              currentUser={currentUser}
              onLogout={handleLogout}
              onOpenAuthModal={handleOpenAuthModal}
            >
              <Profile user={currentUser} onLogout={handleLogout} />
            </Layout>
          ) : (
            <Navigate to="/" replace />
          )
        } />
        
        {/* ✅ ADMIN ROUTES ADD KARO */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;