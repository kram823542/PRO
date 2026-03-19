

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import About from './pages/About';
// import ContactMe from './pages/ContactMe';
// import AdminContacts from './pages/AdminContacts';

// // Admin Pages
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import CreatePost from './pages/CreatePost';
// import EditPost from './pages/EditPost';
// import Posts from './pages/Posts';
// import Sidebar from './components/Sidebar';

// import './App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   // Admin Layout with Sidebar
//   const AdminLayout = ({ children }) => {
//     return (
//       <div className="admin-layout flex">
//         <Sidebar />
//         <div className="admin-content flex-1 ml-1">
//           {children}
//         </div>
//       </div>
//     );
//   };

//   // Protected Route wrapper
//   const ProtectedRoute = ({ children }) => {
//     if (!isAuthenticated) {
//       return <Navigate to="/admin/login" />;
//     }
//     return children;
//   };

//   return (
//     <Router>
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 4000,
//           style: {
//             background: '#363636',
//             color: '#fff',
//           },
//           success: {
//             duration: 3000,
//             iconTheme: {
//               primary: '#10b981',
//               secondary: '#fff',
//             },
//           },
//           error: {
//             duration: 4000,
//             iconTheme: {
//               primary: '#ef4444',
//               secondary: '#fff',
//             },
//           },
//         }}
//       />
      
//       <Routes>
//         {/* Public Portfolio Routes */}
//         <Route 
//           path="/" 
//           element={
//             <>
//               <Navbar />
//               <main className="main-content">
//                 <Home />
//               </main>
//             </>
//           } 
//         />
        
//         <Route 
//           path="/about" 
//           element={
//             <>
//               <Navbar />
//               <main className="main-content">
//                 <About />
//               </main>
//             </>
//           } 
//         />
        
//         <Route 
//           path="/contactme" 
//           element={
//             <>
//               <Navbar />
//               <main className="main-content">
//                 <ContactMe />
//               </main>
//             </>
//           } 
//         />

//         {/* Public Post Viewing Routes */}
//         <Route 
//           path="/posts" 
//           element={
//             <>
//               <Navbar />
//               <main className="main-content">
//                 <Navigate to="/" />
//               </main>
//             </>
//           } 
//         />
        
//         <Route 
//           path="/posts/:id" 
//           element={
//             <>
//               <Navbar />
//               <main className="main-content">
//                 <Navigate to="/" />
//               </main>
//             </>
//           } 
//         />

//         {/* Admin Routes */}
//         <Route 
//           path="/admin/login" 
//           element={
//             isAuthenticated ? 
//             <Navigate to="/admin/dashboard" /> : 
//             <Login setIsAuthenticated={setIsAuthenticated} />
//           } 
//         />
        
//         <Route 
//           path="/admin/dashboard" 
//           element={
//             <ProtectedRoute>
//               <AdminLayout>
//                 <Dashboard />
//               </AdminLayout>
//             </ProtectedRoute>
//           } 
//         />
        
//         <Route 
//           path="/admin/posts" 
//           element={
//             <ProtectedRoute>
//               <AdminLayout>
//                 <Posts />
//               </AdminLayout>
//             </ProtectedRoute>
//           } 
//         />
        
//         <Route 
//           path="/admin/create-post" 
//           element={
//             <ProtectedRoute>
//               <AdminLayout>
//                 <CreatePost />
//               </AdminLayout>
//             </ProtectedRoute>
//           } 
//         />

//         {/* Edit Post Route */}
//         <Route 
//           path="/admin/edit/:id" 
//           element={
//             <ProtectedRoute>
//               <AdminLayout>
//                 <EditPost />
//               </AdminLayout>
//             </ProtectedRoute>
//           } 
//         />

//         {/* ✅ NEW: Admin Contacts Route - यहाँ सही जगह पर */}
//         <Route 
//           path="/admin/contacts" 
//           element={
//             <ProtectedRoute>
//               <AdminLayout>
//                 <AdminContacts />
//               </AdminLayout>
//             </ProtectedRoute>
//           } 
//         />

//         {/* Admin Profile Route */}
//         <Route 
//           path="/admin/profile" 
//           element={
//             <ProtectedRoute>
//               <AdminLayout>
//                 <div className="p-8">
//                   <h1 className="text-3xl font-bold">Profile Page</h1>
//                   <p className="text-gray-600 mt-4">Coming soon...</p>
//                 </div>
//               </AdminLayout>
//             </ProtectedRoute>
//           } 
//         />

//         {/* Redirect /admin to dashboard or login */}
//         <Route 
//           path="/admin" 
//           element={
//             isAuthenticated ? 
//             <Navigate to="/admin/dashboard" /> : 
//             <Navigate to="/admin/login" />
//           } 
//         />

//         {/* 404 Route */}
//         <Route 
//           path="*" 
//           element={
//             <div className="min-h-screen flex items-center justify-center bg-gray-100">
//               <div className="text-center">
//                 <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
//                 <p className="text-xl text-gray-600 mb-8">Page not found</p>
//                 <button 
//                   onClick={() => window.history.back()}
//                   className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Go Back
//                 </button>
//               </div>
//             </div>
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