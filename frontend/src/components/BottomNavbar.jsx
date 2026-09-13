// import { NavLink } from 'react-router-dom';

// const BottomNavbar = ({ menuItems }) => {
//   return (
//     <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-primary border-t border-white/10 z-40">
//       <div className="flex justify-around items-center py-2">
//         {menuItems.slice(0, 5).map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
//                 isActive ? 'text-secondary' : 'text-white/60'
//               }`
//             }
//           >
//             <span className="text-xl">{item.icon}</span>
//             <span className="text-[10px] font-medium">{item.label}</span>
//           </NavLink>
//         ))}
//       </div>
//     </nav>
//   );
// };

// export default BottomNavbar;




// import { useEffect, useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';

// // Professional SVG Icons mapping based on path/label
// const renderProfessionalIcon = (item) => {
//   const path = item.path.toLowerCase();
  
//   if (path.includes('dashboard')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//       </svg>
//     );
//   }
  
//   if (path.includes('submit')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//       </svg>
//     );
//   }

//   if (path.includes('history')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//       </svg>
//     );
//   }

//   if (path.includes('attendance')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//       </svg>
//     );
//   }

//   if (path.includes('profile')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//       </svg>
//     );
//   }

//   // Fallback icon
//   return (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//     </svg>
//   );
// };

// const BottomNavbar = ({ menuItems }) => {
//   const location = useLocation();
//   const visibleItems = menuItems.slice(0, 5);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     const index = visibleItems.findIndex((item) => item.path === location.pathname);
//     if (index !== -1) setActiveIndex(index);
//   }, [location.pathname, visibleItems]);

//   return (
//     <div className="md:hidden fixed bottom-4 left-0 right-0 flex justify-center px-4 z-50">
//       <nav className="h-14 bg-slate-900/90 backdrop-blur-md flex items-center justify-around px-3 rounded-full shadow-2xl border border-slate-700/50 w-full max-w-[360px] relative transition-all duration-500 animate-in slide-in-from-bottom">
        
//         {/* Dynamic Sliding Active Pill Indicator (Indigo Glow) */}
//         {activeIndex !== -1 && (
//           <div
//             className="absolute top-1/2 -translate-y-1/2 bg-indigo-600 rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] z-0 w-10 h-10 shadow-[0_0_18px_rgba(79,70,229,0.6)]"
//             style={{
//               left: `calc(${activeIndex} * (100% / ${visibleItems.length}) + (100% / ${visibleItems.length} / 2) - 20px)`,
//             }}
//           />
//         )}

//         {visibleItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `relative z-10 flex flex-col items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
//                 isActive ? 'text-white font-bold scale-110' : 'text-slate-400 hover:text-slate-100'
//               }`
//             }
//           >
//             <span className="flex items-center justify-center">
//               {renderProfessionalIcon(item)}
//             </span>
//           </NavLink>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default BottomNavbar;



// import { useEffect, useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';

// // Modern SVG Icons Renderer
// const renderProfessionalIcon = (item) => {
//   const path = item.path.toLowerCase();

//   if (path.includes('dashboard')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//       </svg>
//     );
//   }

//   if (path.includes('submit')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//       </svg>
//     );
//   }

//   if (path.includes('history')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//       </svg>
//     );
//   }

//   if (path.includes('attendance')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//       </svg>
//     );
//   }

//   if (path.includes('profile')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//       </svg>
//     );
//   }

//   return (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//     </svg>
//   );
// };

// const BottomNavbar = ({ menuItems }) => {
//   const location = useLocation();
//   const visibleItems = menuItems.slice(0, 5);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   useEffect(() => {
//     const index = visibleItems.findIndex((item) => item.path === location.pathname);
//     if (index !== -1) setActiveIndex(index);
//   }, [location.pathname, visibleItems]);

//   return (
//     <div className="md:hidden fixed bottom-4 left-0 right-0 flex justify-center px-4 z-50">
//       <nav className="h-16 bg-slate-900/95 backdrop-blur-xl flex items-center justify-between px-3 rounded-full shadow-[0_12px_35px_rgba(0,0,0,0.6)] border border-slate-800 w-full max-w-[360px] relative">
        
//         {visibleItems.map((item, index) => {
//           const isHovered = hoveredIndex === index;
//           const isActive = activeIndex === index;

//           return (
//             <div 
//               key={item.path} 
//               className="relative flex flex-col items-center justify-center flex-1"
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//             >
//               {/* Tooltip Popup */}
//               <div
//                 className={`absolute -top-12 bg-slate-900 text-slate-100 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xl border border-indigo-500/40 backdrop-blur-md whitespace-nowrap pointer-events-none transition-all duration-300 ease-out flex items-center gap-1 z-20 ${
//                   isHovered || isActive
//                     ? 'opacity-100 -translate-y-1 scale-100'
//                     : 'opacity-0 translate-y-2 scale-90'
//                 }`}
//               >
//                 <span className={isActive ? 'text-indigo-400 font-bold' : ''}>
//                   {item.label}
//                 </span>
//                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-indigo-500/40 rotate-45" />
//               </div>

//               {/* NavLink Container */}
//               <NavLink
//                 to={item.path}
//                 className={`relative z-10 flex flex-col items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
//                   isActive
//                     ? 'text-indigo-400 -translate-y-1 bg-indigo-500/10 border border-indigo-500/30 shadow-[0_4px_15px_rgba(99,102,241,0.25)]'
//                     : 'text-slate-400 hover:text-slate-200'
//                 }`}
//               >
//                 <span
//                   className={`flex items-center justify-center transition-all duration-300 ${
//                     isActive ? 'scale-110' : isHovered ? 'scale-110' : ''
//                   }`}
//                 >
//                   {renderProfessionalIcon(item)}
//                 </span>
//               </NavLink>

//               {/* Exact Center-Aligned Active Blue Indicator Line */}
//               {isActive && (
//                 <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-1 bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.9)] transition-all duration-300 animate-in fade-in zoom-in-75" />
//               )}
//             </div>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default BottomNavbar;



// import { useEffect, useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';

// // Modern Professional SVG Icons Renderer (Matches Label & Path)
// const renderProfessionalIcon = (item) => {
//   const label = (item.label || '').toLowerCase();
//   const path = (item.path || '').toLowerCase();

//   // Dashboard
//   if (label.includes('dashboard') || path.includes('dashboard')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//       </svg>
//     );
//   }

//   // CLFs / Organizations / Units
//   if (label.includes('clf') || path.includes('clf')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0V7m0 4h4m-4 0H7" />
//       </svg>
//     );
//   }

//   // Employees / Users
//   if (label.includes('employee') || label.includes('user') || path.includes('employee')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5 5 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//       </svg>
//     );
//   }

//   // Approvals / Submissions
//   if (label.includes('approval') || label.includes('submit') || path.includes('approval') || path.includes('submit')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     );
//   }

//   // Attendance / Calendar
//   if (label.includes('attendance') || path.includes('attendance')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//       </svg>
//     );
//   }

//   // Reports / History / Analytics
//   if (label.includes('report') || label.includes('history') || path.includes('report') || path.includes('history')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//       </svg>
//     );
//   }

//   // Profile / Settings
//   if (label.includes('profile') || path.includes('profile')) {
//     return (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//       </svg>
//     );
//   }

//   // Default Fallback Icon
//   return (
//     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//     </svg>
//   );
// };

// const BottomNavbar = ({ menuItems }) => {
//   const location = useLocation();
//   const visibleItems = menuItems.slice(0, 5);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   useEffect(() => {
//     const index = visibleItems.findIndex((item) => item.path === location.pathname);
//     if (index !== -1) setActiveIndex(index);
//   }, [location.pathname, visibleItems]);

//   return (
//     <div className="md:hidden fixed bottom-4 left-0 right-0 flex justify-center px-4 z-50">
//       <nav className="h-16 bg-slate-900/95 backdrop-blur-xl flex items-center justify-between px-3 rounded-full shadow-[0_12px_35px_rgba(0,0,0,0.6)] border border-slate-800 w-full max-w-[360px] relative">
        
//         {visibleItems.map((item, index) => {
//           const isHovered = hoveredIndex === index;
//           const isActive = activeIndex === index;

//           return (
//             <div 
//               key={item.path} 
//               className="relative flex flex-col items-center justify-center flex-1"
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//             >
//               {/* Tooltip Popup */}
//               <div
//                 className={`absolute -top-12 bg-slate-900 text-slate-100 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xl border border-indigo-500/40 backdrop-blur-md whitespace-nowrap pointer-events-none transition-all duration-300 ease-out flex items-center gap-1 z-20 ${
//                   isHovered || isActive
//                     ? 'opacity-100 -translate-y-1 scale-100'
//                     : 'opacity-0 translate-y-2 scale-90'
//                 }`}
//               >
//                 <span className={isActive ? 'text-indigo-400 font-bold' : ''}>
//                   {item.label}
//                 </span>
//                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-indigo-500/40 rotate-45" />
//               </div>

//               {/* NavLink Container */}
//               <NavLink
//                 to={item.path}
//                 className={`relative z-10 flex flex-col items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
//                   isActive
//                     ? 'text-indigo-400 -translate-y-1 bg-indigo-500/10 border border-indigo-500/30 shadow-[0_4px_15px_rgba(99,102,241,0.25)]'
//                     : 'text-slate-400 hover:text-slate-200'
//                 }`}
//               >
//                 <span
//                   className={`flex items-center justify-center transition-all duration-300 ${
//                     isActive ? 'scale-110' : isHovered ? 'scale-110' : ''
//                   }`}
//                 >
//                   {renderProfessionalIcon(item)}
//                 </span>
//               </NavLink>

//               {/* Exact Center-Aligned Active Blue Indicator Line */}
//               {isActive && (
//                 <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-1 bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.9)] transition-all duration-300 animate-in fade-in zoom-in-75" />
//               )}
//             </div>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default BottomNavbar;

import { useEffect, useState, isValidElement } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Sidebar ka exact icon render karne ke liye helper function
const renderItemIcon = (item) => {
  if (!item) return null;

  // 1. Agar item.icon koi Direct JSX Element ho (<Icon />)
  if (isValidElement(item.icon)) {
    return item.icon;
  }

  // 2. Agar item.icon Component Class/Function ho (lucide-react icons, etc.)
  if (typeof item.icon === 'function' || typeof item.icon === 'object') {
    const IconComponent = item.icon;
    return <IconComponent className="w-5 h-5" />;
  }

  // 3. Fallback: Routing/Label matching agar `item.icon` pass nahi hua ho
  const label = (item.label || '').toLowerCase();
  const path = (item.path || '').toLowerCase();

  if (label.includes('dashboard') || path.includes('dashboard')) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    );
  }

  if (label.includes('attendance') || path.includes('attendance')) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  }

  if (label.includes('report') || label.includes('history') || path.includes('report') || path.includes('history')) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    );
  }

  if (label.includes('employee') || label.includes('staff') || label.includes('user') || path.includes('employee') || path.includes('user')) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5 5 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  }

  if (label.includes('approval') || label.includes('request') || label.includes('submit') || path.includes('approval') || path.includes('submit')) {
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
};

const BottomNavbar = ({ menuItems = [] }) => {
  const location = useLocation();
  const visibleItems = menuItems.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const index = visibleItems.findIndex((item) => item.path === location.pathname);
    if (index !== -1) setActiveIndex(index);
  }, [location.pathname, visibleItems]);

  return (
    <div className="md:hidden fixed bottom-4 left-0 right-0 flex justify-center px-4 z-50">
      <nav className="h-16 bg-zinc-900/95 backdrop-blur-xl flex items-center justify-between px-3 rounded-full shadow-[0_12px_35px_rgba(0,0,0,0.8)] border border-zinc-800 w-full max-w-[360px] relative">
        {visibleItems.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isActive = activeIndex === index;

          return (
            <div 
              key={item.path || index} 
              className="relative flex flex-col items-center justify-center flex-1"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip Popup */}
              <div
                className={`absolute -top-12 bg-zinc-900 text-zinc-100 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xl border border-zinc-700 backdrop-blur-md whitespace-nowrap pointer-events-none transition-all duration-300 ease-out flex items-center gap-1 z-20 ${
                  isHovered || isActive
                    ? 'opacity-100 -translate-y-1 scale-100'
                    : 'opacity-0 translate-y-2 scale-90'
                }`}
              >
                <span className={isActive ? 'text-white font-bold' : ''}>
                  {item.label}
                </span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 border-r border-b border-zinc-700 rotate-45" />
              </div>

              {/* NavLink Container */}
              <NavLink
                to={item.path}
                className={`relative z-10 flex flex-col items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-white -translate-y-1 bg-zinc-800 border border-zinc-700 shadow-[0_4px_15px_rgba(255,255,255,0.1)]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span
                  className={`flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'scale-110' : isHovered ? 'scale-110' : ''
                  }`}
                >
                  {renderItemIcon(item)}
                </span>
              </NavLink>

              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-1 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-300 animate-in fade-in zoom-in-75" />
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNavbar;