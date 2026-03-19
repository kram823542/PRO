
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { adminAPI } from '../services/api';
// import { Loader2 } from 'lucide-react';

// const Login = ({ setIsAuthenticated }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await adminAPI.login(formData);
      
//       // Handle different response structures
//       const data = response.data.data || response.data;
      
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('admin', JSON.stringify(data));
      
//       setIsAuthenticated(true);
//       toast.success('Login successful!');
//       navigate('/admin/dashboard');
//     } catch (error) {
//       console.error('Login error:', error);
//       toast.error(error.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-96">
//         <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Login</h2>
        
//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//               required
//               disabled={loading}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-bold disabled:opacity-50 flex items-center justify-center"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="animate-spin mr-2" size={20} />
//                 Logging in...
//               </>
//             ) : (
//               'Login'
//             )}
//           </button>
//         </form>

//         <div className="mt-4 text-sm text-gray-600 text-center">
//           <p>Demo: admin@example.com / admin123</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;






// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { adminAPI } from '../services/api';
// import { Loader2, Lock, Mail } from 'lucide-react';

// const Login = ({ setIsAuthenticated }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [focusedField, setFocusedField] = useState(null);
//   const navigate = useNavigate();

//   const LOGO_URL = "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png"; 

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await adminAPI.login(formData);
//       const data = response.data.data || response.data;
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('admin', JSON.stringify(data));
//       setIsAuthenticated(true);
//       toast.success('Access Granted');
//       navigate('/admin/dashboard');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Unauthorized Access');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#fafafa] text-black px-4 font-sans relative overflow-hidden">
      
//       {/* Dynamic Background Blurs */}
//       <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-100/50 rounded-full blur-[100px] animate-pulse"></div>
//       <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-purple-100/50 rounded-full blur-[100px] animate-pulse delay-700"></div>

//       <div className="relative z-10 w-full max-w-md transition-all duration-500">
        
//         {/* Animated Circle Logo Header */}
//         <div className="text-center mb-10">
//           <div className="relative inline-block group">
//             {/* Rainbow Spinning Border */}
//             <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 via-purple-500 animate-spin to-pink-500 rounded-full blur-[2px] opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            
//             {/* Logo Container */}
//             <div className="relative h-24 w-24 bg-white rounded-full p-1 shadow-2xl flex items-center justify-center overflow-hidden">
//               <img 
//                 src={LOGO_URL} 
//                 alt="Admin" 
//                 className="h-full w-full object-cover rounded-full" 
//               />
//             </div>
//           </div>
          
//           <h2 className="text-3xl font-black mt-6 tracking-tighter bg-gradient-to-r from-black to-zinc-500 bg-clip-text text-transparent">
//             Admin Access
//           </h2>
//           <div className="h-1 w-12 bg-black mx-auto mt-2 rounded-full animate-bounce"></div>
//         </div>

//         {/* Responsive Login Card */}
//         <div className="bg-white/70 backdrop-blur-xl border border-white p-6 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
//           <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            
//             {/* Email */}
//             <div className="relative group">
//               <label className={`text-[11px] font-bold uppercase tracking-widest mb-2 block transition-all ${focusedField === 'email' ? 'text-blue-500' : 'text-zinc-400'}`}>
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail size={18} className={`absolute left-0 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'email' ? 'text-blue-500' : 'text-zinc-300'}`} />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedField('email')}
//                   onBlur={() => setFocusedField(null)}
//                   className="w-full bg-transparent border-b-2 border-zinc-100 py-3 pl-8 focus:outline-none focus:border-blue-500 transition-all text-sm font-semibold"
//                   placeholder="admin@system.com"
//                   required
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="relative group">
//               <label className={`text-[11px] font-bold uppercase tracking-widest mb-2 block transition-all ${focusedField === 'password' ? 'text-purple-500' : 'text-zinc-400'}`}>
//                 Password Key
//               </label>
//               <div className="relative">
//                 <Lock size={18} className={`absolute left-0 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'password' ? 'text-purple-500' : 'text-zinc-300'}`} />
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedField('password')}
//                   onBlur={() => setFocusedField(null)}
//                   className="w-full bg-transparent border-b-2 border-zinc-100 py-3 pl-8 focus:outline-none focus:border-purple-500 transition-all text-sm font-semibold"
//                   placeholder="••••••••"
//                   required
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             {/* Gradient Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full relative group overflow-hidden bg-black text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-black/20 active:scale-[0.97] transition-all disabled:opacity-50"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               <span className="relative flex items-center justify-center gap-2">
//                 {loading ? <Loader2 className="animate-spin" size={18} /> : 'Authorize Access'}
//               </span>
//             </button>
//           </form>

//           {/* Demo Credentials */}
//           <div className="mt-8 pt-6 border-t border-zinc-50 text-center">
//             <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">Demo Credentials</p>
//             <p className="text-[11px] text-black font-mono mt-1">admin@example.com / admin123</p>
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-center mt-10 text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em]">
//           System Secured By Kundan Ram
//         </p>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-spin {
//           animation: spin 3s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { adminAPI } from '../services/api';
// // Eye aur EyeOff icons import kiye
// import { Loader2, Lock, Mail, Eye, EyeOff } from 'lucide-react';

// const Login = ({ setIsAuthenticated }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [focusedField, setFocusedField] = useState(null);
//   // Naya state password toggle ke liye
//   const [showPassword, setShowPassword] = useState(false); 
//   const navigate = useNavigate();

//   const LOGO_URL = "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png"; 

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await adminAPI.login(formData);
//       const data = response.data.data || response.data;
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('admin', JSON.stringify(data));
//       setIsAuthenticated(true);
//       toast.success('Access Granted');
//       navigate('/admin/dashboard');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Unauthorized Access');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#fafafa] text-black px-4 font-sans relative overflow-hidden">
      
//       {/* Dynamic Background Blurs */}
//       <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-100/50 rounded-full blur-[100px] animate-pulse"></div>
//       <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-purple-100/50 rounded-full blur-[100px] animate-pulse delay-700"></div>

//       <div className="relative z-10 w-full max-w-md transition-all duration-500">
        
//         {/* Animated Circle Logo Header */}
//         <div className="text-center mb-10">
//           <div className="relative inline-block group">
//             <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 via-purple-500 animate-spin to-pink-500 rounded-full blur-[2px] opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            
//             <div className="relative h-24 w-24 bg-white rounded-full p-1 shadow-2xl flex items-center justify-center overflow-hidden">
//               <img 
//                 src={LOGO_URL} 
//                 alt="Admin" 
//                 className="h-full w-full object-cover rounded-full" 
//               />
//             </div>
//           </div>
          
//           <h2 className="text-3xl font-black mt-6 tracking-tighter bg-gradient-to-r from-black to-zinc-500 bg-clip-text text-transparent">
//             Admin Access
//           </h2>
//           <div className="h-1 w-12 bg-black mx-auto mt-2 rounded-full animate-bounce"></div>
//         </div>

//         <div className="bg-white/70 backdrop-blur-xl border border-white p-6 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
//           <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            
//             {/* Email */}
//             <div className="relative group">
//               <label className={`text-[11px] font-bold uppercase tracking-widest mb-2 block transition-all ${focusedField === 'email' ? 'text-blue-500' : 'text-zinc-400'}`}>
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail size={18} className={`absolute left-0 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'email' ? 'text-blue-500' : 'text-zinc-300'}`} />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedField('email')}
//                   onBlur={() => setFocusedField(null)}
//                   className="w-full bg-transparent border-b-2 border-zinc-100 py-3 pl-8 focus:outline-none focus:border-blue-500 transition-all text-sm font-semibold"
//                   placeholder="admin@system.com"
//                   required
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             {/* Password with Eye Icon Toggle */}
//             <div className="relative group">
//               <label className={`text-[11px] font-bold uppercase tracking-widest mb-2 block transition-all ${focusedField === 'password' ? 'text-purple-500' : 'text-zinc-400'}`}>
//                 Password Key
//               </label>
//               <div className="relative">
//                 <Lock size={18} className={`absolute left-0 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'password' ? 'text-purple-500' : 'text-zinc-300'}`} />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   onFocus={() => setFocusedField('password')}
//                   onBlur={() => setFocusedField(null)}
//                   className="w-full bg-transparent border-b-2 border-zinc-100 py-3 pl-8 pr-10 focus:outline-none focus:border-purple-500 transition-all text-sm font-semibold"
//                   placeholder="••••••••"
//                   required
//                   disabled={loading}
//                 />
//                 {/* Toggle Button */}
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-purple-500 transition-colors p-1"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Gradient Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full relative group overflow-hidden bg-black text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-black/20 active:scale-[0.97] transition-all disabled:opacity-50"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//               <span className="relative flex items-center justify-center gap-2">
//                 {loading ? <Loader2 className="animate-spin" size={18} /> : 'Authorize Access'}
//               </span>
//             </button>
//           </form>

//           {/* Demo Credentials */}
//           <div className="mt-8 pt-6 border-t border-zinc-50 text-center">
//             <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">Demo Credentials</p>
//             <p className="text-[11px] text-black font-mono mt-1">admin@example.com / admin123</p>
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-center mt-10 text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em]">
//           System Secured By Kundan Ram
//         </p>
//       </div>

//       <style jsx>{`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-spin {
//           animation: spin 3s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { adminAPI } from '../services/api';
// import { Loader2, Eye, EyeOff, ArrowLeft, ShieldCheck, X } from 'lucide-react';

// const Login = ({ setIsAuthenticated }) => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const LOGO_URL = "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png";

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await adminAPI.login(formData);
//       const data = response.data.data || response.data;
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('admin', JSON.stringify(data));
//       setIsAuthenticated(true);
//       toast.success('Access Granted');
//       navigate('/admin/dashboard');
//     } catch (error) {
//       toast.error('Unauthorized Access');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] p-4 font-sans">
      
//       {/* Main Container - Exact Image Style */}
//       <div className="relative w-full max-w-[900px] h-full min-h-[550px] bg-white rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
        
//         {/* --- LEFT SIDE: THE GRAPHIC PANEL --- */}
//         <div className="w-full md:w-[45%] bg-[#1e293b] relative p-8 flex flex-col justify-center items-center text-center overflow-hidden">
          
//           {/* Abstract Red Shapes (Like the Blue ones in your image) */}
//           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-600/20 via-transparent to-transparent"></div>
//           <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
          
//           {/* Logo Section */}
//           <div className="relative z-10 flex flex-col items-center">
//             <div className="w-20 h-20 bg-white p-1 rounded-2xl shadow-2xl mb-6">
//                <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover rounded-xl" />
//             </div>
//             <h2 className="text-white text-xl font-bold tracking-widest uppercase mb-4">Admin Core</h2>
//             <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
//               Secure system gateway for Kundan Ram Infrastructure management.
//             </p>
//           </div>

//           <div className="absolute bottom-8 text-[10px] text-slate-500 uppercase tracking-[0.3em]">
//              © 2026 Company
//           </div>
//         </div>

//         {/* --- RIGHT SIDE: THE LOGIN FORM --- */}
//         <div className="w-full md:w-[55%] bg-white p-8 md:p-16 flex flex-col justify-center relative">
          
//           {/* Close Icon (Top Right) */}
//           <button 
//             onClick={() => navigate('/')}
//             className="absolute top-6 right-6 text-slate-300 hover:text-red-600 transition-colors"
//           >
//             <X size={24} />
//           </button>

//           <div className="mb-10">
//             <h1 className="text-4xl font-black text-slate-900 mb-2">Log in</h1>
//             <p className="text-slate-400 text-sm">Please enter your credentials to access the console.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Input */}
//             <div className="space-y-1">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-5 py-4 bg-[#f1f5f9] text-slate-900 rounded-xl border-2 border-transparent focus:border-red-600 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400"
//                 required
//               />
//             </div>

//             {/* Password Input */}
//             <div className="space-y-1">
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full px-5 py-4 bg-[#f1f5f9] text-slate-900 rounded-xl border-2 border-transparent focus:border-red-600 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Me & Forgot Password Style */}
//             <div className="flex items-center justify-between px-1">
//                <label className="flex items-center gap-2 cursor-pointer group">
//                   <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500" />
//                   <span className="text-xs text-slate-500 group-hover:text-slate-700 transition-colors">Remember me</span>
//                </label>
//                <button type="button" className="text-xs text-slate-400 hover:text-red-600 transition-colors">Forgot Password?</button>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-4 bg-[#1e293b] hover:bg-red-600 text-white rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-slate-200 hover:shadow-red-200 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
//             >
//               {loading ? (
//                 <Loader2 className="animate-spin" size={20} />
//               ) : (
//                 "Login"
//               )}
//             </button>

//             {/* Register Link Style */}
//             <p className="text-center text-xs text-slate-400 pt-4">
//               Don't have an account? <span className="text-red-600 font-bold cursor-pointer hover:underline">Register</span>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { adminAPI } from '../services/api';
import { Loader2, Eye, EyeOff, X, ArrowRight } from 'lucide-react';

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const LOGO_URL = "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await adminAPI.login(formData);
      const data = response.data.data || response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('admin', JSON.stringify(data));
      setIsAuthenticated(true);
      toast.success('Access Granted');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Unauthorized Access');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] p-4 font-sans selection:bg-red-100">
      
      {/* Main Container */}
      <div className="relative w-full max-w-[950px] min-h-[600px] bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]">
        
        {/* --- LEFT SIDE: DESKTOP PANEL (Hidden on Mobile) --- */}
        <div className="hidden md:flex w-[45%] bg-[#1e293b] relative p-12 flex-col justify-between items-center text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-600/20 via-transparent to-transparent animate-pulse"></div>
          <div className="relative z-10 mt-10">
            <div className="w-24 h-24 bg-white p-1 rounded-[2rem] shadow-2xl mb-8 mx-auto transform hover:rotate-12 transition-transform duration-500">
               <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover rounded-[1.8rem]" />
            </div>
            <h2 className="text-white text-2xl font-black tracking-[0.2em] uppercase mb-4">Admin Core</h2>
            <div className="h-1 w-12 bg-red-600 mx-auto rounded-full mb-6"></div>
          </div>
          <div className="relative z-10 text-[10px] text-slate-500 uppercase tracking-[0.4em] font-bold">
             System Secure
          </div>
        </div>

        {/* --- RIGHT SIDE: LOGIN FORM --- */}
        <div className="w-full md:w-[55%] bg-white p-8 md:p-16 flex flex-col justify-center relative">
          
          {/* Mobile Only Logo Section */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-white p-0.5 rounded-2xl shadow-xl mb-3 border border-slate-100">
              <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover rounded-[0.9rem]" />
            </div>
            <h2 className="text-slate-900 text-xs font-black tracking-[0.2em] uppercase">Admin Core</h2>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="absolute top-6 right-6 md:top-8 md:right-8 text-slate-300 hover:text-red-600 transition-all active:scale-75"
          >
            <X size={28} />
          </button>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">Log in<span className="text-red-600">.</span></h1>
            <p className="text-slate-400 font-medium text-sm">Welcome back, Kundan Ram.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Email - Line Style with Left Border */}
            <div className="group relative">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-slate-100 group-focus-within:bg-red-600 transition-colors duration-300"></div>
              <input
                type="email"
                name="email"
                placeholder="Terminal ID"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-6 pr-4 py-3 bg-transparent text-slate-900 border-b-2 border-slate-100 focus:border-red-600 outline-none transition-all duration-300 font-semibold placeholder:text-slate-300 placeholder:font-normal"
                required
              />
            </div>

            {/* Password - Line Style with Left Border */}
            <div className="group relative">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-slate-100 group-focus-within:bg-red-600 transition-colors duration-300"></div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Access Key"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-6 pr-12 py-3 bg-transparent text-slate-900 border-b-2 border-slate-100 focus:border-red-600 outline-none transition-all duration-300 font-semibold placeholder:text-slate-300 placeholder:font-normal"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-600 p-2 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between px-1">
               <label className="flex items-center gap-2 cursor-pointer group/check">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-red-600 focus:ring-red-500 cursor-pointer" />
                  <span className="text-[10px] font-bold text-slate-400 group-hover/check:text-slate-600 transition-colors uppercase tracking-widest">Remember Terminal</span>
               </label>
               <button type="button" className="text-[10px] font-bold text-slate-400 hover:text-red-600 transition-colors uppercase tracking-widest">Forgot Key?</button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="group/btn relative w-full py-5 bg-[#1e293b] text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-red-600/20 active:scale-[0.97]"
            >
              <div className="absolute inset-0 w-0 bg-red-600 transition-all duration-500 ease-out group-hover/btn:w-full"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>Access System <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </span>
            </button>

            <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
              Kundan Ram Infrastructure • 2026
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;