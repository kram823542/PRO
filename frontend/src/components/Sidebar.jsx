// import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = ({ menuItems, title }) => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <aside className="hidden md:flex flex-col w-64 bg-primary text-white h-screen fixed left-0 top-0 z-40">
//       {/* Logo/Brand */}
//       <div className="p-5 border-b border-white/10">
//         <h1 className="text-xl font-bold text-white">{title}</h1>
//         <p className="text-xs text-white/60 mt-1 truncate">{user?.name}</p>
//         <span className="inline-block mt-2 text-xs bg-secondary px-2 py-0.5 rounded-full">
//           {user?.role?.replace('_', ' ')}
//         </span>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 overflow-y-auto p-4 space-y-1">
//         {menuItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
//                 isActive
//                   ? 'bg-secondary text-white shadow-lg'
//                   : 'text-white/70 hover:bg-white/10 hover:text-white'
//               }`
//             }
//           >
//             <span className="text-lg">{item.icon}</span>
//             <span className="font-medium">{item.label}</span>
//           </NavLink>
//         ))}
//       </nav>

//       {/* Logout */}
//       <div className="p-4 border-t border-white/10">
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition-colors"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//             />
//           </svg>
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;




// import { useEffect, useState } from 'react';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = ({ menuItems, title }) => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const index = menuItems.findIndex((item) => item.path === location.pathname);
//     if (index !== -1) setActiveIndex(index);
//   }, [location.pathname, menuItems]);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <aside className="hidden md:flex flex-col fixed left-4 top-4 bottom-4 w-64 bg-[#141e30]/95 backdrop-blur-xl border border-[#35577d]/30 text-white rounded-3xl shadow-2xl shadow-[#141e30]/50 z-40 p-5 overflow-hidden justify-between transition-all duration-500 animate-in slide-in-from-left">
//       <div>
//         {/* Brand Header & User Profile Info */}
//         <div className="pb-5 mb-5 border-b border-[#35577d]/40 text-center">
//           <div className="w-12 h-12 bg-[#35577d]/30 border border-[#35577d]/50 rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-xl shadow-lg mb-3">
//             {title ? title.charAt(0) : 'C'}
//           </div>
//           <h1 className="text-lg font-bold text-white tracking-wide truncate">{title}</h1>
//           <p className="text-xs text-slate-300 mt-0.5 truncate">{user?.name}</p>
//           <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-semibold bg-[#35577d] text-white border border-white/10 px-2.5 py-0.5 rounded-full shadow-sm">
//             {user?.role?.replace('_', ' ')}
//           </span>
//         </div>

//         {/* Dynamic Vertical Sliding Navigation Menu */}
//         <nav className="relative flex flex-col gap-2">
//           {/* Sliding Indicator (Active State using #35577d) */}
//           {activeIndex !== -1 && (
//             <div
//               className="absolute left-0 right-0 bg-[#35577d] rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] z-0 h-12 shadow-lg shadow-[#35577d]/40 border border-white/10"
//               style={{
//                 transform: `translateY(${activeIndex * (48 + 8)}px)`,
//               }}
//             />
//           )}

//           {menuItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) =>
//                 `relative z-10 flex items-center gap-3.5 px-4 h-12 rounded-2xl transition-all duration-300 font-medium ${
//                   isActive
//                     ? 'text-white font-bold'
//                     : 'text-slate-300 hover:text-white hover:bg-[#35577d]/20'
//                 }`
//               }
//             >
//               <span className="text-xl flex items-center justify-center">{item.icon}</span>
//               <span className="text-sm tracking-wide">{item.label}</span>
//             </NavLink>
//           ))}
//         </nav>
//       </div>

//       {/* Logout Action Button */}
//       <div className="pt-4 border-t border-[#35577d]/40">
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center gap-2 bg-red-600/80 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-md border border-red-500/30 group"
//         >
//           <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//             />
//           </svg>
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;








// import { useEffect, useState } from 'react';
// import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// // Modern Professional SVG Icons Renderer
// const renderProfessionalIcon = (item) => {
//   const path = item.path.toLowerCase();

//   if (path.includes('dashboard')) {
//     return (
//       <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//       </svg>
//     );
//   }

//   if (path.includes('submit')) {
//     return (
//       <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//       </svg>
//     );
//   }

//   if (path.includes('history')) {
//     return (
//       <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//       </svg>
//     );
//   }

//   if (path.includes('attendance')) {
//     return (
//       <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//       </svg>
//     );
//   }

//   if (path.includes('profile')) {
//     return (
//       <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//       </svg>
//     );
//   }

//   return (
//     <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//     </svg>
//   );
// };

// const Sidebar = ({ menuItems, title }) => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isCollapsed, setIsCollapsed] = useState(true);

//   useEffect(() => {
//     const index = menuItems.findIndex((item) => item.path === location.pathname);
//     if (index !== -1) setActiveIndex(index);
//   }, [location.pathname, menuItems]);

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <aside
//       className={`hidden md:flex flex-col fixed left-4 top-4 bottom-4 bg-slate-900/95 backdrop-blur-xl border border-slate-800 text-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-40 py-4 px-2.5 justify-between transition-all duration-300 ease-in-out ${
//         isCollapsed ? 'w-16 items-center' : 'w-52 px-3.5'
//       }`}
//     >
//       <div className="flex flex-col w-full">
//         {/* Header Profile Info & Embedded Highlighted Glass Toggle */}
//         <div className="relative pb-3 mb-3 border-b border-slate-800 w-full flex flex-col gap-2.5">
          
//           {/* Header Row */}
//           <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
//             <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-indigo-400 font-black text-base shadow-[0_0_20px_rgba(99,102,241,0.2)] shrink-0">
//               {title ? title.charAt(0) : 'C'}
//             </div>

//             {/* Embedded Highlighted Toggle Button (Expanded State) */}
//             {!isCollapsed && (
//               <button
//                 onClick={() => setIsCollapsed(true)}
//                 className="w-7 h-7 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 border border-indigo-400/50 hover:border-indigo-300 text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_12px_rgba(99,102,241,0.4)] hover:scale-105"
//                 title="Collapse Sidebar"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
//                 </svg>
//               </button>
//             )}
//           </div>

//           {/* User Details on Expand */}
//           {!isCollapsed && (
//             <div className="flex flex-col overflow-hidden animate-in fade-in duration-300 px-0.5">
//               <h1 className="text-xs font-bold text-slate-100 truncate">{title}</h1>
//               <p className="text-[10px] text-slate-400 truncate">{user?.name}</p>
//               <span className="w-max mt-1 text-[8px] uppercase tracking-wider font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
//                 {user?.role?.replace('_', ' ')}
//               </span>
//             </div>
//           )}

//           {/* Expand Highlighted Toggle Bar (Collapsed State) */}
//           {isCollapsed && (
//             <button
//               onClick={() => setIsCollapsed(false)}
//               className="w-10 h-6 bg-gradient-to-r from-indigo-600/90 to-violet-600/90 hover:from-indigo-500 hover:to-violet-500 border border-indigo-400/50 rounded-full flex items-center justify-center text-white shadow-[0_0_14px_rgba(99,102,241,0.45)] hover:scale-105 transition-all duration-300 mt-0.5"
//               title="Expand Sidebar"
//             >
//               <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2.8" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7" />
//               </svg>
//             </button>
//           )}
//         </div>

//         {/* Dynamic Navigation Menu */}
//         <nav className="relative flex flex-col gap-2.5 w-full">
//           {/* Vertical Active Sliding Background Pill */}
//           {activeIndex !== -1 && (
//             <div
//               className={`absolute bg-indigo-500/15 border border-indigo-500/40 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0 h-10 shadow-[0_4px_20px_rgba(99,102,241,0.25)] ${
//                 isCollapsed ? 'w-10 left-1/2 -translate-x-1/2' : 'w-full left-0'
//               }`}
//               style={{
//                 transform: `translateY(${activeIndex * (40 + 10)}px) ${
//                   isCollapsed ? 'translateX(-50%)' : ''
//                 }`,
//               }}
//             />
//           )}

//           {menuItems.map((item, idx) => {
//             const isActive = activeIndex === idx;

//             return (
//               <div key={item.path} className="relative group flex items-center w-full">
//                 {/* Tooltip on Collapsed Mode */}
//                 {isCollapsed && (
//                   <div className="absolute left-14 bg-slate-900 text-slate-100 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl border border-indigo-500/40 backdrop-blur-md whitespace-nowrap opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-50 flex items-center gap-1.5">
//                     <span className={isActive ? 'text-indigo-400 font-extrabold' : ''}>
//                       {item.label}
//                     </span>
//                     <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 border-l border-b border-indigo-500/40 rotate-45" />
//                   </div>
//                 )}

//                 <NavLink
//                   to={item.path}
//                   className={`relative z-10 flex items-center h-10 rounded-2xl transition-all duration-300 w-full ${
//                     isCollapsed ? 'justify-center' : 'px-3 gap-2.5'
//                   } ${
//                     isActive
//                       ? 'text-indigo-400 font-bold'
//                       : 'text-slate-400 hover:text-slate-200'
//                   }`}
//                 >
//                   <span
//                     className={`flex items-center justify-center transition-transform duration-300 ${
//                       isActive ? 'scale-110' : 'group-hover:scale-110'
//                     }`}
//                   >
//                     {renderProfessionalIcon(item)}
//                   </span>

//                   {!isCollapsed && (
//                     <span className="text-xs font-semibold tracking-wide truncate transition-opacity duration-300">
//                       {item.label}
//                     </span>
//                   )}

//                   {/* Active Blue Dot/Bar Indicator */}
//                   {isActive && (
//                     <span
//                       className={`absolute bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,1)] ${
//                         isCollapsed
//                           ? '-bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-1'
//                           : 'right-2 top-1/2 -translate-y-1/2 w-1.5 h-3.5'
//                       }`}
//                     />
//                   )}
//                 </NavLink>
//               </div>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Logout Action Button */}
//       <div className="relative group pt-3 border-t border-slate-800 w-full flex justify-center">
//         {/* Logout Tooltip on Collapsed Mode */}
//         {isCollapsed && (
//           <div className="absolute left-14 bg-red-950/90 text-red-300 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl border border-red-500/40 backdrop-blur-md whitespace-nowrap opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-50 flex items-center">
//             Logout
//             <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-950 border-l border-b border-red-500/40 rotate-45" />
//           </div>
//         )}

//         <button
//           onClick={handleLogout}
//           className={`h-10 flex items-center justify-center bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white rounded-2xl transition-all duration-300 border border-red-500/30 shadow-sm hover:shadow-[0_4px_15px_rgba(239,68,68,0.4)] ${
//             isCollapsed ? 'w-10' : 'w-full gap-2 px-2.5'
//           }`}
//         >
//           <svg className="w-5 h-5 transition-transform group-hover:scale-110 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//             />
//           </svg>
//           {!isCollapsed && <span className="text-xs font-bold">Logout</span>}
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;


import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Modern Professional SVG Icons Renderer (Optimized & Unique Icon Mapping)
const renderProfessionalIcon = (item) => {
  const label = (item.label || '').toLowerCase();
  const path = (item.path || '').toLowerCase();

  // 1. Dashboard
  if (label.includes('dashboard') || path.includes('dashboard')) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    );
  }

  // 2. Employees / Users (Priority before CLFs to avoid route path overlap)
  if (label.includes('employee') || label.includes('user') || path.includes('employee')) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5 5 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  }

  // 3. Approvals / Submissions / Requests
  if (
    label.includes('approval') ||
    label.includes('submit') ||
    label.includes('submission') ||
    label.includes('pending') ||
    path.includes('approval') ||
    path.includes('submission')
  ) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  // 4. Attendance / Log / History
  if (
    label.includes('attendance') ||
    label.includes('log') ||
    label.includes('history') ||
    path.includes('attendance')
  ) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  }

  // 5. Reports / Analytics
  if (label.includes('report') || path.includes('report')) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    );
  }

  // 6. Profile / Settings / Account
  if (label.includes('profile') || label.includes('setting') || path.includes('profile')) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    );
  }

  // 7. CLFs / Node / Organization Units
  if (label.includes('clf') || path.includes('/clfs')) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0V7m0 4h4m-4 0H7" />
      </svg>
    );
  }

  // Default Fallback Icon
  return (
    <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
};

const Sidebar = ({ menuItems = [], title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const index = menuItems.findIndex((item) => item.path === location.pathname);
    if (index !== -1) setActiveIndex(index);
  }, [location.pathname, menuItems]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`hidden md:flex flex-col fixed left-4 top-4 bottom-4 bg-zinc-900 border border-zinc-800 text-white rounded-3xl shadow-2xl z-40 py-4 px-2.5 justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16 items-center' : 'w-52 px-3.5'
      }`}
    >
      <div className="flex flex-col w-full">
        {/* Header Profile Info & Toggle Button */}
        <div className="relative pb-3 mb-3 border-b border-zinc-800 w-full flex flex-col gap-2.5">
          {/* Header Row */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 rounded-2xl flex items-center justify-center text-white font-black text-base shrink-0">
              {title ? title.charAt(0) : 'C'}
            </div>

            {/* Toggle Button (Expanded State) */}
            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="w-7 h-7 rounded-xl bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white flex items-center justify-center transition-all duration-300"
                title="Collapse Sidebar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>

          {/* User Details on Expand */}
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden animate-in fade-in duration-300 px-0.5">
              <h1 className="text-xs font-bold text-white truncate">{title}</h1>
              <p className="text-[10px] text-zinc-400 truncate">{user?.name}</p>
              <span className="w-max mt-1 text-[8px] uppercase tracking-wider font-extrabold bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded-full">
                {user?.role?.replace('_', ' ')}
              </span>
            </div>
          )}

          {/* Toggle Button (Collapsed State) */}
          {isCollapsed && (
            <button
              onClick={() => setIsCollapsed(false)}
              className="w-10 h-6 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full flex items-center justify-center text-white transition-all duration-300 mt-0.5"
              title="Expand Sidebar"
            >
              <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Dynamic Navigation Menu */}
        <nav className="relative flex flex-col gap-2.5 w-full">
          {/* Active Sliding Background Pill */}
          {activeIndex !== -1 && (
            <div
              className={`absolute bg-zinc-800 border border-zinc-700 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0 h-10 ${
                isCollapsed ? 'w-10 left-1/2 -translate-x-1/2' : 'w-full left-0'
              }`}
              style={{
                transform: `translateY(${activeIndex * (40 + 10)}px) ${
                  isCollapsed ? 'translateX(-50%)' : ''
                }`,
              }}
            />
          )}

          {menuItems.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div key={item.path} className="relative group flex items-center w-full">
                {/* Tooltip on Collapsed Mode */}
                {isCollapsed && (
                  <div className="absolute left-14 bg-zinc-900 text-zinc-100 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl border border-zinc-700 whitespace-nowrap opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-50 flex items-center gap-1.5">
                    <span className={isActive ? 'text-white font-extrabold' : ''}>
                      {item.label}
                    </span>
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                  </div>
                )}

                <NavLink
                  to={item.path}
                  className={`relative z-10 flex items-center h-10 rounded-2xl transition-all duration-300 w-full ${
                    isCollapsed ? 'justify-center' : 'px-3 gap-2.5'
                  } ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span
                    className={`flex items-center justify-center transition-transform duration-300 ${
                      isActive ? 'scale-110 text-white' : 'group-hover:scale-110'
                    }`}
                  >
                    {renderProfessionalIcon(item)}
                  </span>

                  {!isCollapsed && (
                    <span className="text-xs font-semibold tracking-wide truncate transition-opacity duration-300">
                      {item.label}
                    </span>
                  )}

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <span
                      className={`absolute bg-white rounded-full ${
                        isCollapsed
                          ? '-bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-1'
                          : 'right-2 top-1/2 -translate-y-1/2 w-1.5 h-3.5'
                      }`}
                    />
                  )}
                </NavLink>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Logout Action Button */}
      <div className="relative group pt-3 border-t border-zinc-800 w-full flex justify-center">
        {/* Logout Tooltip on Collapsed Mode */}
        {isCollapsed && (
          <div className="absolute left-14 bg-zinc-900 text-red-400 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl border border-red-900 whitespace-nowrap opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-50 flex items-center">
            Logout
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-red-900 rotate-45" />
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`h-10 flex items-center justify-center bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 rounded-2xl transition-all duration-300 border border-red-800/60 shadow-sm ${
            isCollapsed ? 'w-10' : 'w-full gap-2 px-2.5'
          }`}
        >
          <svg className="w-5 h-5 transition-transform group-hover:scale-110 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {!isCollapsed && <span className="text-xs font-bold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;