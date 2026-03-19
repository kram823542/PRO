
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';

// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';

// import Home from './pages/Home';
// import About from './pages/About';
// import ContactMe from './pages/ContactMe';
// import AdminContacts from './pages/AdminContacts';
// import PublicPost from './pages/PublicPost'; // Import PublicPost component

// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import CreatePost from './pages/CreatePost';
// import EditPost from './pages/EditPost';
// import Posts from './pages/Posts';

// import './App.css';

// function App() {

//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) setIsAuthenticated(true);
//   }, []);

//   const ProtectedRoute = ({ children }) => {
//     if (!isAuthenticated) {
//       return <Navigate to="/admin/login" />;
//     }
//     return children;
//   };

//   return (
//     <Router>

//       <Toaster position="top-right" />

//       <Routes>

//         {/* Public Routes */}

//         <Route path="/" element={
//           <>
//             <Navbar />
//             <Home />
//           </>
//         } />

//         <Route path="/about" element={
//           <>
//             <Navbar />
//             <About />
//           </>
//         } />

//         <Route path="/contactme" element={
//           <>
//             <Navbar />
//             <ContactMe />
//           </>
//         } />

//         {/* Public Post Route - Individual post view */}
//         <Route path="/post/:id" element={
//           <>
//             <Navbar />
//             <PublicPost />
//           </>
//         } />

//         {/* Login */}

//         <Route path="/admin/login"
//           element={
//             isAuthenticated
//               ? <Navigate to="/admin/dashboard" />
//               : <Login setIsAuthenticated={setIsAuthenticated} />
//           }
//         />

//         {/* Dashboard */}

//         <Route path="/admin/dashboard"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Sidebar />
//                 <Dashboard />
//               </>
//             </ProtectedRoute>
//           }
//         />

//         {/* Posts */}

//         <Route path="/admin/posts"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Sidebar />
//                 <Posts />
//               </>
//             </ProtectedRoute>
//           }
//         />

//         {/* Create */}

//         <Route path="/admin/create-post"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Sidebar />
//                 <CreatePost />
//               </>
//             </ProtectedRoute>
//           }
//         />

//         {/* Edit */}

//         <Route path="/admin/edit/:id"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Sidebar />
//                 <EditPost />
//               </>
//             </ProtectedRoute>
//           }
//         />

//         {/* Contacts */}

//         <Route path="/admin/contacts"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Sidebar />
//                 <AdminContacts />
//               </>
//             </ProtectedRoute>
//           }
//         />

//       </Routes>

//     </Router>
//   );
// }

// export default App;



// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';

// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';

// import Home from './pages/Home';
// import About from './pages/About';
// import ContactMe from './pages/ContactMe';
// import AdminContacts from './pages/AdminContacts';
// import PublicPost from './pages/PublicPost'; 

// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import CreatePost from './pages/CreatePost';
// import EditPost from './pages/EditPost';
// import Posts from './pages/Posts';

// import './App.css';

// function App() {
//   // Initial state check direct localStorage se taaki refresh par flicker na ho
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!!token);
//   }, []);

//   // Protected Route Component
//   const ProtectedRoute = ({ children }) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       return <Navigate to="/admin/login" replace />;
//     }
//     return (
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 overflow-auto">
//           {children}
//         </div>
//       </div>
//     );
//   };

//   // Public Layout Wrapper
//   const PublicLayout = ({ children }) => (
//     <>
//       <Navbar />
//       {children}
//     </>
//   );

//   return (
//     <Router>
//       <Toaster position="top-right" />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
//         <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
//         <Route path="/contactme" element={<PublicLayout><ContactMe /></PublicLayout>} />
//         <Route path="/post/:id" element={<PublicLayout><PublicPost /></PublicLayout>} />

//         {/* Login Route */}
//         <Route path="/admin/login"
//           element={
//             isAuthenticated 
//               ? <Navigate to="/admin/dashboard" replace /> 
//               : <Login setIsAuthenticated={setIsAuthenticated} />
//           }
//         />

//         {/* Admin Routes (Protected) */}
//         <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//         <Route path="/admin/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
//         <Route path="/admin/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
//         <Route path="/admin/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
//         <Route path="/admin/contacts" element={<ProtectedRoute><AdminContacts /></ProtectedRoute>} />

//         {/* 404/Catch-all: Isse refresh par error nahi aayega */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';  // ✅ CHANGE 1
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import About from './pages/About';
import ContactMe from './pages/ContactMe';
import AdminContacts from './pages/AdminContacts';
import PublicPost from './pages/PublicPost'; 

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Posts from './pages/Posts';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/admin/login" replace />;
    }
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    );
  };

  const PublicLayout = ({ children }) => (
    <>
      <Navbar />
      {children}
    </>
  );

  return (
    <>  {/* ✅ CHANGE 2: Router हटा दिया */}
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contactme" element={<PublicLayout><ContactMe /></PublicLayout>} />
        <Route path="/post/:id" element={<PublicLayout><PublicPost /></PublicLayout>} />

        {/* Login Route */}
        <Route path="/admin/login"
          element={
            isAuthenticated 
              ? <Navigate to="/admin/dashboard" replace /> 
              : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />

        {/* Admin Routes (Protected) */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
        <Route path="/admin/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/admin/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
        <Route path="/admin/contacts" element={<ProtectedRoute><AdminContacts /></ProtectedRoute>} />

        {/* 404/Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;