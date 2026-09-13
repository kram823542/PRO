// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Loader from '../components/Loader';

// const Login = () => {
//   const [userId, setUserId] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const result = await login(userId, password);

//     if (result.success) {
//       if (result.user.role === 'SUPER_ADMIN') {
//         navigate('/admin-super');
//       } else if (result.user.role === 'CLF_ADMIN') {
//         navigate('/admin-clf');
//       } else {
//         navigate('/employee');
//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-light to-secondary p-4">
//       <div className="w-full max-w-md">
//         {/* Logo/Brand */}
//         <div className="text-center mb-8">
//           <div className="w-20 h-20 bg-secondary rounded-2xl mx-auto flex items-center justify-center shadow-2xl mb-4">
//             <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//               />
//             </svg>
//           </div>
//           <h1 className="text-3xl font-extrabold text-white">CLF Attendance</h1>
//           <p className="text-white/70 mt-2">Employee Attendance Management System</p>
//         </div>

//         {/* Login Form */}
//         <div className="bg-white rounded-2xl shadow-2xl p-8">
//           <h2 className="text-2xl font-bold text-primary mb-6 text-center">Sign In</h2>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="label">User ID</label>
//               <input
//                 type="text"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//                 placeholder="e.g. kundan@82"
//                 className="input-field"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div>
//               <label className="label">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="input-field"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="btn-primary w-full flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   Signing in...
//                 </>
//               ) : (
//                 'Sign In'
//               )}
//             </button>
//           </form>

//           <p className="text-xs text-gray-500 text-center mt-6">
//             Contact your CLF Admin for account access
//           </p>
//         </div>

//         <p className="text-center text-white/60 text-sm mt-6">
//           © 2026 CLF Attendance System
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;






// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Loader from '../components/Loader';

// const Login = () => {
//   const [userId, setUserId] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const result = await login(userId, password);

//     if (result.success) {
//       if (result.user.role === 'SUPER_ADMIN') {
//         navigate('/admin-super');
//       } else if (result.user.role === 'CLF_ADMIN') {
//         navigate('/admin-clf');
//       } else {
//         navigate('/employee');
//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen relative flex items-center justify-center bg-slate-900 overflow-hidden p-4 sm:p-6">
//       {/* Background Decorative Blur Elements */}
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />

//       <div className="w-full max-w-md relative z-10">
//         {/* Brand Header */}
//         <div className="text-center mb-8">
//           <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4 ring-1 ring-white/20 transition-transform duration-300 hover:scale-105">
//             <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//               />
//             </svg>
//           </div>
//           <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">CLF Attendance</h1>
//           <p className="text-slate-400 mt-2 text-sm sm:text-base">Employee Attendance Management System</p>
//         </div>

//         {/* Glassmorphic Login Form Card */}
//         <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl shadow-2xl p-6 sm:p-8">
//           <div className="mb-6 text-center">
//             <h2 className="text-2xl font-bold text-white tracking-wide">Sign In</h2>
//             <p className="text-slate-400 text-xs mt-1">Please enter your details to continue</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
//                 User ID
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   value={userId}
//                   onChange={(e) => setUserId(e.target.value)}
//                   placeholder="e.g. kundan@82"
//                   className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
//                   required
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
//                   required
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   <span>Signing in...</span>
//                 </>
//               ) : (
//                 'Sign In'
//               )}
//             </button>
//           </form>

//           <p className="text-xs text-slate-400 text-center mt-6 pt-4 border-t border-slate-700/50">
//             Contact your <span className="text-indigo-400 font-medium">CLF Admin</span> for account access
//           </p>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-slate-500 text-xs mt-6">
//           © 2026 CLF Attendance System. All rights reserved.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(userId, password);

    if (result.success) {
      if (result.user.role === 'SUPER_ADMIN') {
        navigate('/admin-super');
      } else if (result.user.role === 'CLF_ADMIN') {
        navigate('/admin-clf');
      } else {
        navigate('/employee');
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-zinc-950 text-zinc-100 overflow-hidden p-4 sm:p-6 selection:bg-zinc-800 selection:text-white">
      {/* Background Decorative Blur Elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-zinc-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-zinc-800/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-zinc-700/60 rounded-2xl mx-auto flex items-center justify-center shadow-xl mb-4 transition-transform duration-300 hover:scale-105">
            <svg className="w-10 h-10 text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">CLF Attendance</h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base font-medium">Employee Attendance Management System</p>
        </div>

        {/* Glassmorphic Dark Zinc Login Form Card */}
        <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-zinc-100 tracking-wide">Sign In</h2>
            <p className="text-zinc-400 text-xs mt-1">Please enter your details to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                User ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="e.g. kundan@82"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all disabled:opacity-50 text-sm"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-all disabled:opacity-50 text-sm"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    /* Eye Off Icon */
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 014.122-.963c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m-3.177-3.177a3 3 0 00-4.243-4.243M9.878 9.878l4.242 4.242M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    /* Eye Icon */
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-xs text-zinc-400 text-center mt-6 pt-4 border-t border-zinc-800">
            Contact your <span className="text-zinc-200 font-semibold">CLF Admin</span> for account access
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-600 text-xs mt-6">
          © 2026 CLF Attendance System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;