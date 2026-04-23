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
//       {/* --- SIDEBAR VIEW (Desktop/Vertical) --- */}
//       {isSidebarView ? (
//         <aside className="fixed left-2 top-2 bottom-2 md:left-4 md:top-4 md:bottom-4 
//           w-14 md:w-20 bg-black flex flex-col items-center py-5 md:py-8 z-[100]
//           rounded-full shadow-2xl border border-white/10 transition-all duration-500 animate-in slide-in-from-left">
          
//           {/* Logo */}
//           <div className="mb-4 md:mb-6 h-9 w-9 md:h-12 md:w-12 rounded-full overflow-hidden border border-white/20 shrink-0">
//             <img src={logoImageUrl} alt="Logo" className="h-full w-full object-cover grayscale" />
//           </div>

//           <button 
//             onClick={() => setIsSidebarView(false)}
//             className="mb-6 md:mb-10 p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all group shrink-0"
//           >
//             <Squares2X2Icon className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:rotate-90" />
//           </button>

//           <nav className="relative flex flex-col items-center flex-1 w-full gap-4 md:gap-7">
//             {/* Sliding Indicator (White BG) */}
//             <div 
//               className="absolute left-1/2 bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] z-0 w-9 h-9 md:w-14 md:h-14" 
//               style={{ 
//                 transform: `translateX(-50%) translateY(${activeIndex * (window.innerWidth < 768 ? 36 + 16 : 56 + 28)}px)` 
//               }}
//             />

//             {menuItems.map((item) => (
//               <Link key={item.path} to={item.path} className="relative z-10 flex justify-center items-center w-9 h-9 md:w-14 md:h-14 rounded-full group">
//                 <item.icon className={`h-4 w-4 md:h-6 md:w-6 transition-all duration-300 ${location.pathname === item.path ? 'text-black' : 'text-white/40 group-hover:text-white'}`} />
//               </Link>
//             ))}
//           </nav>

//           <button onClick={handleLogout} className="p-2 md:p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-full mt-2 transition-all shrink-0">
//             <ArrowLeftOnRectangleIcon className="h-5 w-5 md:h-6 md:w-6" />
//           </button>
//         </aside>
//       ) : (
//         /* --- BOTTOM NAVIGATION VIEW (Mobile/Floating) --- */
//         <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4 z-[100]">
//           <nav className="h-14 md:h-18 bg-black flex items-center justify-between px-2 md:px-6
//             rounded-full shadow-2xl border border-white/10 transition-all duration-500 animate-in slide-in-from-bottom
//             w-full max-w-[360px] md:max-w-[500px]">
            
//             <div className="h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden border border-white/20 shrink-0 ml-1">
//               <img src={logoImageUrl} alt="Logo" className="h-full w-full object-cover grayscale" />
//             </div>

//             <div className="relative flex items-center gap-1.5 md:gap-4">
//               {/* Horizontal Indicator (White BG) */}
//               <div 
//                 className="absolute bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] z-0 w-9 h-9 md:w-12 md:h-12" 
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
//                   <item.icon className={`h-4.5 w-4.5 md:h-6 md:w-6 transition-all duration-300 ${location.pathname === item.path ? 'text-black' : 'text-white/40'}`} />
//                 </Link>
//               ))}
//             </div>

//             <div className="flex items-center gap-1 md:gap-2">
//               <button 
//                 onClick={() => setIsSidebarView(true)}
//                 className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
//               >
//                 <ArrowsRightLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
//               </button>
//               <button onClick={handleLogout} className="p-2 text-white/40 hover:text-white rounded-full transition-all">
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
          w-14 md:w-20 bg-red-950 flex flex-col items-center py-5 md:py-8 z-[100]
          rounded-full shadow-2xl border border-red-500/30 transition-all duration-500 animate-in slide-in-from-left">
          
          {/* Logo with Red Tint border */}
          <div className="mb-4 md:mb-6 h-9 w-9 md:h-12 md:w-12 rounded-full overflow-hidden border border-red-400/40 shrink-0 bg-red-900/50 p-0.5">
            <img src={logoImageUrl} alt="Logo" className="h-full w-full object-cover rounded-full grayscale brightness-75 contrast-125" />
          </div>

          <button 
            onClick={() => setIsSidebarView(false)}
            className="mb-6 md:mb-10 p-2 text-red-400/60 hover:text-red-100 hover:bg-red-500/20 rounded-full transition-all group shrink-0"
          >
            <Squares2X2Icon className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:rotate-90" />
          </button>

          <nav className="relative flex flex-col items-center flex-1 w-full gap-4 md:gap-7">
            {/* Sliding Indicator (Bright Red Tint) */}
            <div 
              className="absolute left-1/2 bg-red-500 rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] z-0 w-9 h-9 md:w-14 md:h-14 shadow-[0_0_20px_rgba(239,68,68,0.4)]" 
              style={{ 
                transform: `translateX(-50%) translateY(${activeIndex * (window.innerWidth < 768 ? 36 + 16 : 56 + 28)}px)` 
              }}
            />

            {menuItems.map((item) => (
              <Link key={item.path} to={item.path} className="relative z-10 flex justify-center items-center w-9 h-9 md:w-14 md:h-14 rounded-full group">
                <item.icon className={`h-4 w-4 md:h-6 md:w-6 transition-all duration-300 ${location.pathname === item.path ? 'text-red-950' : 'text-red-400 group-hover:text-red-100'}`} />
              </Link>
            ))}
          </nav>

          <button onClick={handleLogout} className="p-2 md:p-3 text-red-400/60 hover:text-red-100 hover:bg-red-500/20 rounded-full mt-2 transition-all shrink-0">
            <ArrowLeftOnRectangleIcon className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </aside>
      ) : (
        /* --- BOTTOM NAVIGATION VIEW (Mobile/Floating) --- */
        <div className="fixed bottom-4 left-0 right-0 flex justify-center px-4 z-[100]">
          <nav className="h-14 md:h-18 bg-red-950 flex items-center justify-between px-2 md:px-6
            rounded-full shadow-2xl border border-red-500/30 transition-all duration-500 animate-in slide-in-from-bottom
            w-full max-w-[360px] md:max-w-[500px]">
            
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full overflow-hidden border border-red-400/40 shrink-0 ml-1 bg-red-900/50 p-0.5">
              <img src={logoImageUrl} alt="Logo" className="h-full w-full object-cover rounded-full grayscale brightness-75" />
            </div>

            <div className="relative flex items-center gap-1.5 md:gap-4">
              {/* Horizontal Indicator (Bright Red Tint) */}
              <div 
                className="absolute bg-red-500 rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] z-0 w-9 h-9 md:w-12 md:h-12 shadow-[0_0_15px_rgba(239,68,68,0.3)]" 
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
                  <item.icon className={`h-4.5 w-4.5 md:h-6 md:w-6 transition-all duration-300 ${location.pathname === item.path ? 'text-red-950' : 'text-red-400'}`} />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <button 
                onClick={() => setIsSidebarView(true)}
                className="p-2 text-red-400/60 hover:text-red-100 hover:bg-red-500/20 rounded-full transition-all"
              >
                <ArrowsRightLeftIcon className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button onClick={handleLogout} className="p-2 text-red-400/60 hover:text-red-100 rounded-full transition-all">
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