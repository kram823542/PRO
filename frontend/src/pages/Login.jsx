
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






import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { adminAPI } from '../services/api';
import { Loader2, Lock, Mail } from 'lucide-react';

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const LOGO_URL = "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png"; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      toast.error(error.response?.data?.message || 'Unauthorized Access');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] text-black px-4 font-sans relative overflow-hidden">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-100/50 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-purple-100/50 rounded-full blur-[100px] animate-pulse delay-700"></div>

      <div className="relative z-10 w-full max-w-md transition-all duration-500">
        
        {/* Animated Circle Logo Header */}
        <div className="text-center mb-10">
          <div className="relative inline-block group">
            {/* Rainbow Spinning Border */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 via-purple-500 animate-spin to-pink-500 rounded-full blur-[2px] opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            
            {/* Logo Container */}
            <div className="relative h-24 w-24 bg-white rounded-full p-1 shadow-2xl flex items-center justify-center overflow-hidden">
              <img 
                src={LOGO_URL} 
                alt="Admin" 
                className="h-full w-full object-cover rounded-full" 
              />
            </div>
          </div>
          
          <h2 className="text-3xl font-black mt-6 tracking-tighter bg-gradient-to-r from-black to-zinc-500 bg-clip-text text-transparent">
            Admin Access
          </h2>
          <div className="h-1 w-12 bg-black mx-auto mt-2 rounded-full animate-bounce"></div>
        </div>

        {/* Responsive Login Card */}
        <div className="bg-white/70 backdrop-blur-xl border border-white p-6 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            
            {/* Email */}
            <div className="relative group">
              <label className={`text-[11px] font-bold uppercase tracking-widest mb-2 block transition-all ${focusedField === 'email' ? 'text-blue-500' : 'text-zinc-400'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className={`absolute left-0 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'email' ? 'text-blue-500' : 'text-zinc-300'}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b-2 border-zinc-100 py-3 pl-8 focus:outline-none focus:border-blue-500 transition-all text-sm font-semibold"
                  placeholder="admin@system.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative group">
              <label className={`text-[11px] font-bold uppercase tracking-widest mb-2 block transition-all ${focusedField === 'password' ? 'text-purple-500' : 'text-zinc-400'}`}>
                Password Key
              </label>
              <div className="relative">
                <Lock size={18} className={`absolute left-0 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'password' ? 'text-purple-500' : 'text-zinc-300'}`} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent border-b-2 border-zinc-100 py-3 pl-8 focus:outline-none focus:border-purple-500 transition-all text-sm font-semibold"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Gradient Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-black text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-black/20 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={18} /> : 'Authorize Access'}
              </span>
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-zinc-50 text-center">
            <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">Demo Credentials</p>
            <p className="text-[11px] text-black font-mono mt-1">admin@example.com / admin123</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-10 text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em]">
          System Secured By Kundan Ram
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;