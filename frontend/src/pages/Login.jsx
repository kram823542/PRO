// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { adminAPI } from '../services/api';
// import { Loader2, Eye, EyeOff, X, ArrowRight } from 'lucide-react';

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
//     <div className="min-h-screen w-full flex items-center justify-center bg-[#0f172a] p-4 font-sans selection:bg-red-100">
      
//       {/* Main Container */}
//       <div className="relative w-full max-w-[950px] min-h-[600px] bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]">
        
//         {/* --- LEFT SIDE: DESKTOP PANEL (Hidden on Mobile) --- */}
//         <div className="hidden md:flex w-[45%] bg-[#1e293b] relative p-12 flex-col justify-between items-center text-center overflow-hidden">
//           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-600/20 via-transparent to-transparent animate-pulse"></div>
//           <div className="relative z-10 mt-10">
//             <div className="w-24 h-24 bg-white p-1 rounded-[2rem] shadow-2xl mb-8 mx-auto transform hover:rotate-12 transition-transform duration-500">
//                <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover rounded-[1.8rem]" />
//             </div>
//             <h2 className="text-white text-2xl font-black tracking-[0.2em] uppercase mb-4">Admin Core</h2>
//             <div className="h-1 w-12 bg-red-600 mx-auto rounded-full mb-6"></div>
//           </div>
//           <div className="relative z-10 text-[10px] text-slate-500 uppercase tracking-[0.4em] font-bold">
//              System Secure
//           </div>
//         </div>

//         {/* --- RIGHT SIDE: LOGIN FORM --- */}
//         <div className="w-full md:w-[55%] bg-white p-8 md:p-16 flex flex-col justify-center relative">
          
//           {/* Mobile Only Logo Section */}
//           <div className="md:hidden flex flex-col items-center mb-8">
//             <div className="w-16 h-16 bg-white p-0.5 rounded-2xl shadow-xl mb-3 border border-slate-100">
//               <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover rounded-[0.9rem]" />
//             </div>
//             <h2 className="text-slate-900 text-xs font-black tracking-[0.2em] uppercase">Admin Core</h2>
//           </div>

//           <button 
//             onClick={() => navigate('/')}
//             className="absolute top-6 right-6 md:top-8 md:right-8 text-slate-300 hover:text-red-600 transition-all active:scale-75"
//           >
//             <X size={28} />
//           </button>

//           <div className="mb-12">
//             <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">Log in<span className="text-red-600">.</span></h1>
//             <p className="text-slate-400 font-medium text-sm">Welcome back, Kundan Ram.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-10">
            
//             {/* Email - Line Style with Left Border */}
//             <div className="group relative">
//               <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-slate-100 group-focus-within:bg-red-600 transition-colors duration-300"></div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Terminal ID"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full pl-6 pr-4 py-3 bg-transparent text-slate-900 border-b-2 border-slate-100 focus:border-red-600 outline-none transition-all duration-300 font-semibold placeholder:text-slate-300 placeholder:font-normal"
//                 required
//               />
//             </div>

//             {/* Password - Line Style with Left Border */}
//             <div className="group relative">
//               <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-slate-100 group-focus-within:bg-red-600 transition-colors duration-300"></div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Access Key"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full pl-6 pr-12 py-3 bg-transparent text-slate-900 border-b-2 border-slate-100 focus:border-red-600 outline-none transition-all duration-300 font-semibold placeholder:text-slate-300 placeholder:font-normal"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-600 p-2 transition-colors"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             <div className="flex items-center justify-between px-1">
//                <label className="flex items-center gap-2 cursor-pointer group/check">
//                   <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-red-600 focus:ring-red-500 cursor-pointer" />
//                   <span className="text-[10px] font-bold text-slate-400 group-hover/check:text-slate-600 transition-colors uppercase tracking-widest">Remember Terminal</span>
//                </label>
//                <button type="button" className="text-[10px] font-bold text-slate-400 hover:text-red-600 transition-colors uppercase tracking-widest">Forgot Key?</button>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="group/btn relative w-full py-5 bg-[#1e293b] text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-red-600/20 active:scale-[0.97]"
//             >
//               <div className="absolute inset-0 w-0 bg-red-600 transition-all duration-500 ease-out group-hover/btn:w-full"></div>
//               <span className="relative z-10 flex items-center justify-center gap-3">
//                 {loading ? <Loader2 className="animate-spin" size={20} /> : (
//                   <>Access System <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
//                 )}
//               </span>
//             </button>

//             <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
//               Kundan Ram Infrastructure • 2026
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
    <div className="min-h-screen w-full flex items-center justify-center bg-red-950 p-4 font-sans selection:bg-red-500/30">
      
      {/* Main Container - Dark Red/Slate Mix */}
      <div className="relative w-full max-w-[950px] min-h-[600px] bg-red-950 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(220,38,38,0.3)] border border-red-500/20">
        
        {/* --- LEFT SIDE: DESKTOP PANEL --- */}
        <div className="hidden md:flex w-[45%] bg-red-600 relative p-12 flex-col justify-between items-center text-center overflow-hidden">
          {/* Background tint pattern */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-400/20 via-transparent to-transparent animate-pulse"></div>
          
          <div className="relative z-10 mt-10">
            <div className="w-24 h-24 bg-red-950 p-1.5 rounded-[2rem] shadow-2xl mb-8 mx-auto transform hover:rotate-12 transition-transform duration-500 border border-red-400/30">
               <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover rounded-[1.8rem] grayscale brightness-125" />
            </div>
            <h2 className="text-red-50 text-2xl font-black tracking-[0.2em] uppercase mb-4">Admin Core</h2>
            <div className="h-1 w-12 bg-red-400 mx-auto rounded-full mb-6"></div>
            <p className="text-red-100 text-[10px] uppercase tracking-widest font-bold">Authenticated Access Only</p>
          </div>

          <div className="relative z-10 text-[10px] text-red-300 uppercase tracking-[0.4em] font-bold">
              Secure Terminal 2.0
          </div>
        </div>

        {/* --- RIGHT SIDE: LOGIN FORM --- */}
        <div className="w-full md:w-[55%] bg-red-950 p-8 md:p-16 flex flex-col justify-center relative">
          
          {/* Mobile Only Logo Section */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-red-900 p-0.5 rounded-2xl shadow-xl mb-3 border border-red-500/30">
              <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover rounded-[0.9rem] grayscale brightness-125" />
            </div>
            <h2 className="text-red-500 text-xs font-black tracking-[0.2em] uppercase">Admin Core</h2>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="absolute top-6 right-6 md:top-8 md:right-8 text-red-800 hover:text-red-500 transition-all active:scale-75"
          >
            <X size={28} />
          </button>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-red-50 mb-2 tracking-tight">Log in<span className="text-red-600">.</span></h1>
            <p className="text-red-400/60 font-medium text-sm">Welcome back, Kundan Ram.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Email - Red Line Style */}
            <div className="group relative">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-red-900/50 group-focus-within:bg-red-500 transition-colors duration-300"></div>
              <input
                type="email"
                name="email"
                placeholder="Terminal ID"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-6 pr-4 py-3 bg-transparent text-red-50 border-b-2 border-red-900/50 focus:border-red-500 outline-none transition-all duration-300 font-semibold placeholder:text-red-800 placeholder:font-normal"
                required
              />
            </div>

            {/* Password - Red Line Style */}
            <div className="group relative">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-red-900/50 group-focus-within:bg-red-500 transition-colors duration-300"></div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Access Key"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-6 pr-12 py-3 bg-transparent text-red-50 border-b-2 border-red-900/50 focus:border-red-500 outline-none transition-all duration-300 font-semibold placeholder:text-red-800 placeholder:font-normal"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-800 hover:text-red-500 p-2 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between px-1">
               <label className="flex items-center gap-2 cursor-pointer group/check">
                  <input type="checkbox" className="w-4 h-4 rounded border-red-900 bg-transparent text-red-600 focus:ring-red-500 cursor-pointer" />
                  <span className="text-[10px] font-bold text-red-700 group-hover/check:text-red-500 transition-colors uppercase tracking-widest">Remember Terminal</span>
               </label>
               <button type="button" className="text-[10px] font-bold text-red-700 hover:text-red-500 transition-colors uppercase tracking-widest">Forgot Key?</button>
            </div>

            {/* Login Button - Dark Red with Red Glow */}
            <button
              type="submit"
              disabled={loading}
              className="group/btn relative w-full py-5 bg-red-600 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] active:scale-[0.97]"
            >
              <div className="absolute inset-0 w-0 bg-red-700 transition-all duration-500 ease-out group-hover/btn:w-full"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>Access System <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </span>
            </button>

            <p className="text-center text-[10px] text-red-900 font-bold uppercase tracking-[0.2em]">
              Kundan Ram Infrastructure • 2026
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;