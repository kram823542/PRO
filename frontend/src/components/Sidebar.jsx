

// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   HomeIcon,
//   DocumentTextIcon,
//   PlusCircleIcon,
//   EnvelopeIcon,
//   ArrowLeftOnRectangleIcon,
// } from "@heroicons/react/24/outline";
// import toast from "react-hot-toast";

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [activeIndex, setActiveIndex] = useState(0);

//   const menuItems = [
//     { path: "/admin/dashboard", name: "Dashboard", icon: HomeIcon },
//     { path: "/admin/posts", name: "Posts", icon: DocumentTextIcon },
//     { path: "/admin/create-post", name: "Create", icon: PlusCircleIcon },
//     { path: "/admin/contacts", name: "Contacts", icon: EnvelopeIcon },
//   ];

//   useEffect(() => {
//     const index = menuItems.findIndex((item) => item.path === location.pathname);
//     if (index !== -1) setActiveIndex(index);
//   }, [location.pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("admin");
//     toast.success("Logged out successfully");
//     navigate("/admin/login");
//   };

//   return (
//     <div className="fixed left-2 top-2 bottom-2 md:left-4 md:top-4 md:bottom-4 
//       w-14 md:w-20 bg-slate-950 flex flex-col items-center py-6 z-[100]
//       rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-white/10 transition-all duration-300">
      
//       {/* Brand Logo */}
//       <div className="mb-8 md:mb-12 group">
//         <div className="h-10 w-10 md:h-12 md:w-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-black text-lg md:text-xl shadow-lg shadow-red-500/20 group-hover:rotate-6 transition-transform">
//           A
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="relative flex flex-col items-center flex-1 w-full px-2 gap-4 md:gap-5">
        
//         {/* Sliding Active Background */}
//         <div 
//           className="absolute left-1/2 -translate-x-1/2 bg-red-600 rounded-xl md:rounded-2xl shadow-xl shadow-red-600/40 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] z-0
//             w-10 h-10 md:w-14 md:h-14" 
//           style={{ 
//             // 40px (icon) + 16px (gap-4) for mobile | 56px + 20px (gap-5) for desktop
//             transform: `translateY(${activeIndex * (window.innerWidth < 768 ? 40 + 16 : 56 + 20)}px)` 
//           }}
//         />

//         {menuItems.map((item, index) => {
//           const Icon = item.icon;
//           const isActive = activeIndex === index;

//           return (
//             <Link 
//               key={item.path} 
//               to={item.path} 
//               className="relative z-10 flex justify-center items-center w-10 h-10 md:w-14 md:h-14 outline-none"
//             >
//               <div className={`transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-200'}`}>
//                 <Icon className="h-5 w-5 md:h-6 md:w-6" />
//               </div>

//               {/* Tooltip (Desktop Only) */}
//               <span className="hidden lg:block absolute left-20 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 bg-white text-slate-950 text-[11px] font-bold px-3 py-2 rounded-xl shadow-2xl whitespace-nowrap pointer-events-none border border-slate-100">
//                 {item.name}
//               </span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Logout */}
//       <div className="w-full px-2 md:px-3 pt-6 border-t border-white/5">
//         <button
//           onClick={handleLogout}
//           className="group relative w-full h-10 md:h-14 flex justify-center items-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl md:rounded-2xl transition-all duration-300"
//         >
//           <ArrowLeftOnRectangleIcon className="h-5 w-5 md:h-6 md:w-6" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   HomeIcon,
//   DocumentTextIcon,
//   PlusCircleIcon,
//   EnvelopeIcon,
//   ArrowLeftOnRectangleIcon,
//   ChevronLeftIcon,
//   Bars3Icon,
// } from "@heroicons/react/24/outline";
// import toast from "react-hot-toast";

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isSidebarView, setIsSidebarView] = useState(true); // Estado para alternar la vista

//   const menuItems = [
//     { path: "/admin/dashboard", name: "Dashboard", icon: HomeIcon },
//     { path: "/admin/posts", name: "Posts", icon: DocumentTextIcon },
//     { path: "/admin/create-post", name: "Create", icon: PlusCircleIcon },
//     { path: "/admin/contacts", name: "Contacts", icon: EnvelopeIcon },
//   ];

//   useEffect(() => {
//     const index = menuItems.findIndex((item) => item.path === location.pathname);
//     if (index !== -1) setActiveIndex(index);
//   }, [location.pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("admin");
//     toast.success("Logged out successfully");
//     navigate("/admin/login");
//   };

//   const handleToggleView = () => {
//     setIsSidebarView(!isSidebarView);
//   };

//   const logoImageUrl = "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png";

//   return (
//     <>
//       {/* Botón de alternancia de vista */}
//       <button
//         onClick={handleToggleView}
//         className="fixed top-4 right-4 z-[200] p-3 bg-slate-900 text-white rounded-full shadow-lg border border-white/10 hover:bg-slate-800 transition-colors md:hidden"
//       >
//         {isSidebarView ? <ChevronLeftIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
//       </button>

//       {/* Menú lateral (Sidebar) */}
//       {isSidebarView && (
//         <div className="fixed left-2 top-2 bottom-2 md:left-4 md:top-4 md:bottom-4 
//           w-14 md:w-20 bg-slate-950 flex flex-col items-center py-6 z-[100]
//           rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-white/10 transition-all duration-300">
          
//           {/* Brand Logo con imagen */}
//           <div className="mb-8 md:mb-12 group">
//             <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:rotate-6 transition-transform">
//               <img src={logoImageUrl} alt="Logo" className="h-full w-full object-cover rounded-xl md:rounded-2xl" />
//             </div>
//           </div>

//           {/* Navigation Menu */}
//           <nav className="relative flex flex-col items-center flex-1 w-full px-2 gap-4 md:gap-5">
            
//             {/* Sliding Active Background */}
//             <div 
//               className="absolute left-1/2 -translate-x-1/2 bg-red-600 rounded-xl md:rounded-2xl shadow-xl shadow-red-600/40 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] z-0
//                 w-10 h-10 md:w-14 md:h-14" 
//               style={{ 
//                 // 40px (icon) + 16px (gap-4) for mobile | 56px + 20px (gap-5) for desktop
//                 transform: `translateY(${activeIndex * (window.innerWidth < 768 ? 40 + 16 : 56 + 20)}px)` 
//               }}
//             />

//             {menuItems.map((item, index) => {
//               const Icon = item.icon;
//               const isActive = activeIndex === index;

//               return (
//                 <Link 
//                   key={item.path} 
//                   to={item.path} 
//                   className="relative z-10 flex justify-center items-center w-10 h-10 md:w-14 md:h-14 outline-none"
//                 >
//                   <div className={`transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-200'}`}>
//                     <Icon className="h-5 w-5 md:h-6 md:w-6" />
//                   </div>

//                   {/* Tooltip (Desktop Only) */}
//                   <span className="hidden lg:block absolute left-20 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 bg-white text-slate-950 text-[11px] font-bold px-3 py-2 rounded-xl shadow-2xl whitespace-nowrap pointer-events-none border border-slate-100">
//                     {item.name}
//                   </span>
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Logout */}
//           <div className="w-full px-2 md:px-3 pt-6 border-t border-white/5">
//             <button
//               onClick={handleLogout}
//               className="group relative w-full h-10 md:h-14 flex justify-center items-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl md:rounded-2xl transition-all duration-300"
//             >
//               <ArrowLeftOnRectangleIcon className="h-5 w-5 md:h-6 md:w-6" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Navegación inferior (Bottom Navigation) */}
//       {!isSidebarView && (
//         <div className="fixed bottom-2 left-2 right-2 md:left-4 md:bottom-4 md:right-4 h-16 bg-slate-950 flex items-center justify-around px-4 z-[100] rounded-full shadow-2xl border border-white/10 transition-all duration-300 md:hidden">
//           {menuItems.map((item, index) => {
//             const Icon = item.icon;
//             const isActive = activeIndex === index;

//             return (
//               <Link 
//                 key={item.path} 
//                 to={item.path} 
//                 className={`relative z-10 flex flex-col items-center justify-center h-12 w-12 rounded-full outline-none transition-all duration-300 ${isActive ? 'bg-red-600 text-white shadow-xl shadow-red-600/40' : 'text-slate-500 hover:text-slate-200'}`}
//               >
//                 <Icon className="h-5 w-5" />
//                 <span className="text-[9px] mt-1">{item.name}</span>
//               </Link>
//             );
//           })}
          
//           {/* Logout en Bottom Nav */}
//           <button
//             onClick={handleLogout}
//             className="flex flex-col items-center justify-center h-12 w-12 rounded-full text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
//           >
//             <ArrowLeftOnRectangleIcon className="h-5 w-5" />
//             <span className="text-[9px] mt-1">Logout</span>
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;


// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   HomeIcon,
//   DocumentTextIcon,
//   PlusCircleIcon,
//   EnvelopeIcon,
//   ArrowLeftOnRectangleIcon,
//   Squares2X2Icon,
//   ArrowsRightLeftIcon,
// } from "@heroicons/react/24/outline";
// import toast from "react-hot-toast";

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isSidebarView, setIsSidebarView] = useState(true);

//   const menuItems = [
//     { path: "/admin/dashboard", name: "Dashboard", icon: HomeIcon },
//     { path: "/admin/posts", name: "Posts", icon: DocumentTextIcon },
//     { path: "/admin/create-post", name: "Create", icon: PlusCircleIcon },
//     { path: "/admin/contacts", name: "Contacts", icon: EnvelopeIcon },
//   ];

//   useEffect(() => {
//     const index = menuItems.findIndex((item) => item.path === location.pathname);
//     if (index !== -1) setActiveIndex(index);
//   }, [location.pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("admin");
//     toast.success("Logged out successfully");
//     navigate("/admin/login");
//   };

//   const logoImageUrl = "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png";

//   return (
//     <>
//       {/* --- SIDEBAR VIEW (Vertical) --- */}
//       {isSidebarView ? (
//         <aside className="fixed left-2 top-2 bottom-2 md:left-4 md:top-4 md:bottom-4 
//           w-14 md:w-20 bg-slate-950 flex flex-col items-center py-5 md:py-8 z-[100]
//           rounded-full shadow-2xl border border-white/10 transition-all duration-500 animate-in slide-in-from-left">
          
//           {/* Logo in Sidebar */}
//           <div className="mb-4 md:mb-6 h-9 w-9 md:h-12 md:w-12 rounded-full overflow-hidden border-2 border-red-500/20 shadow-lg shadow-red-500/10 shrink-0">
//             <img src={logoImageUrl} alt="Logo" className="h-full w-full object-cover" />
//           </div>

//           <button 
//             onClick={() => setIsSidebarView(false)}
//             className="mb-6 md:mb-10 p-2 text-slate-500 hover:text-white hover:bg-red-600 rounded-full transition-all group shrink-0"
//           >
//             <Squares2X2Icon className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:rotate-90" />
//           </button>

//           <nav className="relative flex flex-col items-center flex-1 w-full gap-4 md:gap-7">
//             {/* Sliding Indicator */}
//             <div 
//               className="absolute left-1/2 -translate-x-1/2 bg-red-600 rounded-full shadow-xl shadow-red-600/40 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] z-0 w-9 h-9 md:w-14 md:h-14" 
//               style={{ transform: `translateY(${activeIndex * (window.innerWidth < 768 ? 36 + 16 : 56 + 28)}px)` }}
//             />

//             {menuItems.map((item) => (
//               <Link key={item.path} to={item.path} className="relative z-10 flex justify-center items-center w-9 h-9 md:w-14 md:h-14 rounded-full group">
//                 <item.icon className={`h-4 w-4 md:h-6 md:w-6 transition-all duration-300 ${location.pathname === item.path ? 'text-white' : 'text-slate-500 group-hover:text-slate-200'}`} />
//               </Link>
//             ))}
//           </nav>

//           <button onClick={handleLogout} className="p-2 md:p-3 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-full mt-2 transition-all shrink-0">
//             <ArrowLeftOnRectangleIcon className="h-5 w-5 md:h-6 md:w-6" />
//           </button>
//         </aside>
//       ) : (
//         /* --- BOTTOM NAVIGATION VIEW (Compact & Floating) --- */
//         <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4 z-[100]">
//           <nav className="h-14 md:h-18 bg-slate-950 flex items-center justify-between px-2 md:px-6
//             rounded-full shadow-2xl border border-white/10 transition-all duration-500 animate-in slide-in-from-bottom
//             w-full max-w-[360px] md:max-w-[500px]">
            
//             {/* Logo in Bottom Nav */}
//             <div className="h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden border border-red-500/20 shrink-0 ml-1">
//               <img src={logoImageUrl} alt="Logo" className="h-full w-full object-cover" />
//             </div>

//             <div className="relative flex items-center gap-1.5 md:gap-4">
//               {/* Horizontal Indicator */}
//               <div 
//                 className="absolute bg-red-600 rounded-full shadow-xl shadow-red-600/40 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] z-0 w-9 h-9 md:w-12 md:h-12" 
//                 style={{ 
//                   left: `${activeIndex * (window.innerWidth < 768 ? 36 + 6 : 48 + 16)}px`,
//                 }}
//               />

//               {menuItems.map((item) => (
//                 <Link 
//                   key={item.path} 
//                   to={item.path} 
//                   className="relative z-10 flex items-center justify-center h-9 w-9 md:h-12 md:w-12 rounded-full outline-none"
//                 >
//                   <item.icon className={`h-4.5 w-4.5 md:h-6 md:w-6 transition-all duration-300 ${location.pathname === item.path ? 'text-white' : 'text-slate-500'}`} />
//                 </Link>
//               ))}
//             </div>

//             <div className="flex items-center gap-1 md:gap-2">
//               <button 
//                 onClick={() => setIsSidebarView(true)}
//                 className="p-2 text-slate-500 hover:text-white hover:bg-red-600 rounded-full transition-all"
//               >
//                 <ArrowsRightLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
//               </button>
//               <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-500 rounded-full transition-all">
//                 <ArrowLeftOnRectangleIcon className="h-5 w-5 md:h-6 md:w-6" />
//               </button>
//             </div>
//           </nav>
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;



import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  PlusCircleIcon,
  EnvelopeIcon,
  ArrowLeftOnRectangleIcon,
  Squares2X2Icon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSidebarView, setIsSidebarView] = useState(true);

  const menuItems = [
    { path: "/admin/dashboard", name: "Dashboard", icon: HomeIcon },
    { path: "/admin/posts", name: "Posts", icon: DocumentTextIcon },
    { path: "/admin/create-post", name: "Create", icon: PlusCircleIcon },
    { path: "/admin/contacts", name: "Contacts", icon: EnvelopeIcon },
  ];

  useEffect(() => {
    const index = menuItems.findIndex((item) => item.path === location.pathname);
    if (index !== -1) setActiveIndex(index);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const logoImageUrl = "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png";

  return (
    <>
      {/* --- SIDEBAR VIEW (Desktop/Vertical) --- */}
      {isSidebarView ? (
        <aside className="fixed left-2 top-2 bottom-2 md:left-4 md:top-4 md:bottom-4 
          w-14 md:w-20 bg-black flex flex-col items-center py-5 md:py-8 z-[100]
          rounded-full shadow-2xl border border-white/10 transition-all duration-500 animate-in slide-in-from-left">
          
          {/* Logo */}
          <div className="mb-4 md:mb-6 h-9 w-9 md:h-12 md:w-12 rounded-full overflow-hidden border border-white/20 shrink-0">
            <img src={logoImageUrl} alt="Logo" className="h-full w-full object-cover grayscale" />
          </div>

          <button 
            onClick={() => setIsSidebarView(false)}
            className="mb-6 md:mb-10 p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all group shrink-0"
          >
            <Squares2X2Icon className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:rotate-90" />
          </button>

          <nav className="relative flex flex-col items-center flex-1 w-full gap-4 md:gap-7">
            {/* Sliding Indicator (White BG) */}
            <div 
              className="absolute left-1/2 bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] z-0 w-9 h-9 md:w-14 md:h-14" 
              style={{ 
                transform: `translateX(-50%) translateY(${activeIndex * (window.innerWidth < 768 ? 36 + 16 : 56 + 28)}px)` 
              }}
            />

            {menuItems.map((item) => (
              <Link key={item.path} to={item.path} className="relative z-10 flex justify-center items-center w-9 h-9 md:w-14 md:h-14 rounded-full group">
                <item.icon className={`h-4 w-4 md:h-6 md:w-6 transition-all duration-300 ${location.pathname === item.path ? 'text-black' : 'text-white/40 group-hover:text-white'}`} />
              </Link>
            ))}
          </nav>

          <button onClick={handleLogout} className="p-2 md:p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-full mt-2 transition-all shrink-0">
            <ArrowLeftOnRectangleIcon className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </aside>
      ) : (
        /* --- BOTTOM NAVIGATION VIEW (Mobile/Floating) --- */
        <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4 z-[100]">
          <nav className="h-14 md:h-18 bg-black flex items-center justify-between px-2 md:px-6
            rounded-full shadow-2xl border border-white/10 transition-all duration-500 animate-in slide-in-from-bottom
            w-full max-w-[360px] md:max-w-[500px]">
            
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden border border-white/20 shrink-0 ml-1">
              <img src={logoImageUrl} alt="Logo" className="h-full w-full object-cover grayscale" />
            </div>

            <div className="relative flex items-center gap-1.5 md:gap-4">
              {/* Horizontal Indicator (White BG) */}
              <div 
                className="absolute bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] z-0 w-9 h-9 md:w-12 md:h-12" 
                style={{ 
                  left: `${activeIndex * (window.innerWidth < 768 ? 36 + 6 : 48 + 16)}px`,
                }}
              />

              {menuItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className="relative z-10 flex items-center justify-center h-9 w-9 md:h-12 md:w-12 rounded-full outline-none"
                >
                  <item.icon className={`h-4.5 w-4.5 md:h-6 md:w-6 transition-all duration-300 ${location.pathname === item.path ? 'text-black' : 'text-white/40'}`} />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <button 
                onClick={() => setIsSidebarView(true)}
                className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <ArrowsRightLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button onClick={handleLogout} className="p-2 text-white/40 hover:text-white rounded-full transition-all">
                <ArrowLeftOnRectangleIcon className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;