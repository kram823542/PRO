// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   Home, User, Mail, ChevronLeft, ChevronRight,
//   Github, Twitter, Youtube, Facebook, Instagram, MessageCircle
// } from "lucide-react";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const navItems = [
//     { path: "/", label: "Home", icon: Home },
//     { path: "/about", label: "About", icon: User },
//     { path: "/contactme", label: "Contact", icon: Mail },
//   ];

//   const socialLinks = [
//     { icon: Github, href: "https://github.com/kram823542" },
//     { icon: Instagram, href: "https://www.instagram.com/k_ambedkar.8235?igsh=aHVlNHFoZTcxYWZh" },
//     { icon: Twitter, href: "https://x.com/KundanR8235" },
//     { icon: Youtube, href: "https://youtube.com/@kundan993?si=-j-J1w8yzNtF31b0" },
//   ];

//   const activeIndex = navItems.findIndex((item) => item.path === location.pathname);
//   const safeIndex = activeIndex === -1 ? 0 : activeIndex;

//   const goPrev = () => {
//     const prevIndex = safeIndex <= 0 ? navItems.length - 1 : safeIndex - 1;
//     navigate(navItems[prevIndex].path);
//   };

//   const goNext = () => {
//     const nextIndex = safeIndex === navItems.length - 1 ? 0 : safeIndex + 1;
//     navigate(navItems[nextIndex].path);
//   };

//   return (
//     <>
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Outfit:wght@300;400;500;600&display=swap');
//           .font-pacifico { font-family: 'Pacifico', cursive; }
//           .font-nav-modern { font-family: 'Outfit', sans-serif; }
//           .antialiased-text { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
//           .nav-transition { transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); }
//         `}
//       </style>

//       {/* ================= SOCIAL SIDEBAR (Desktop: Right | Mobile: Left) ================= */}
//       {/* ================= SOCIAL MEDIA BAR (B&W - REPOSITIONED) ================= */}
//       <div className={`fixed z-[100] transition-all duration-500 
//   /* Desktop: Left Center Sidebar */
//   md:left-2 md:top-1/2 md:-translate-y-1/2 
//   /* Mobile: Bottom-Right */
//   right-2 bottom-6 md:right-auto md:top-auto md:translate-y-0`}>

//         <div className="flex flex-col gap-3 md:gap-5 p-2 bg-black border border-white/20 rounded-full shadow-2xl items-center backdrop-blur-md">
//           {socialLinks.map((social, index) => (
//             <a
//               key={index}
//               href={social.href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-zinc-500 transition-all duration-300 hover:scale-125 hover:text-white active:scale-90 p-1"
//             >
//               {/* Desktop icons are 20px (size 5), Mobile icons are 14px */}
//               <social.icon size={14} className="md:w-5 md:h-5" strokeWidth={2} />
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* ================= MOBILE FIXED LOGO (TOP) ================= */}
//       <div className="md:hidden fixed top-0 left-0 w-full flex justify-center py-4 z-[100] bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
//         <Link to="/" className="flex items-center gap-2 px-4 py-1.5 bg-black border border-white/20 rounded-full shadow-lg pointer-events-auto">
//           <img src="https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png" className="w-5 h-5 rounded-full" alt="Logo" />
//           <span className="font-pacifico text-sm text-white">Kundan</span>
//         </Link>
//       </div>

//       {/* ================= DESKTOP NAV ================= */}
//       <nav className="hidden md:flex fixed top-6 w-full justify-center z-40 font-nav-modern">
//         <div className="relative flex items-center bg-black border border-white/20 px-6 py-2 rounded-full shadow-2xl overflow-hidden antialiased-text">
//           <Link to="/" className="flex items-center gap-3 pr-6 border-r border-white/10 group z-20">
//             <img
//               src="https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png"
//               alt="Logo"
//               className="w-8 h-8 rounded-full border border-white/20 group-hover:invert transition-all"
//             />
//             <span className="font-pacifico text-2xl text-white">Kundan</span>
//           </Link>

//           <div className="relative flex items-center ml-2">
//             <div
//               className="absolute h-8 rounded-full bg-white transition-all duration-500 ease-out"
//               style={{ width: "110px", left: `${activeIndex * 110}px` }}
//             />
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`relative z-10 w-[110px] text-center py-2 text-[15px] font-medium transition-all duration-300 ${location.pathname === item.path ? "text-black font-bold" : "text-zinc-500 hover:text-white"
//                   }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* ================= COMPACT MOBILE BOTTOM NAV ================= */}
//       <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[80%] max-w-[280px] font-nav-modern">
//         <div className="relative flex items-center bg-black border border-white/20 rounded-full p-1 shadow-2xl overflow-hidden">
//           <div
//             className="absolute h-[80%] rounded-full bg-white transition-all duration-500"
//             style={{
//               width: `calc(${100 / navItems.length}% - 6px)`,
//               left: `calc(${safeIndex * (100 / navItems.length)}% + 3px)`,
//             }}
//           />
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.path;
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`relative z-10 flex flex-1 flex-col items-center justify-center py-1.5 transition-all ${isActive ? "text-black" : "text-zinc-500"
//                   }`}
//               >
//                 <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
//                 <span className="text-[9px] font-bold uppercase tracking-tight">{item.label}</span>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;



import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home, User, Mail, ChevronLeft, ChevronRight,
  Github, Twitter, Youtube, Facebook, Instagram, MessageCircle,
  Shield // Admin icon ke liye Shield import kiya
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: User },
    { path: "/contactme", label: "Contact", icon: Mail },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/kram823542" },
    { icon: Instagram, href: "https://www.instagram.com/k_ambedkar.8235?igsh=aHVlNHFoZTcxYWZh" },
    { icon: Twitter, href: "https://x.com/KundanR8235" },
    { icon: Youtube, href: "https://youtube.com/@kundan993?si=-j-J1w8yzNtF31b0" },
  ];

  const activeIndex = navItems.findIndex((item) => item.path === location.pathname);
  const safeIndex = activeIndex === -1 ? 0 : activeIndex;

  const goPrev = () => {
    const prevIndex = safeIndex <= 0 ? navItems.length - 1 : safeIndex - 1;
    navigate(navItems[prevIndex].path);
  };

  const goNext = () => {
    const nextIndex = safeIndex === navItems.length - 1 ? 0 : safeIndex + 1;
    navigate(navItems[nextIndex].path);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Outfit:wght@300;400;500;600&display=swap');
          .font-pacifico { font-family: 'Pacifico', cursive; }
          .font-nav-modern { font-family: 'Outfit', sans-serif; }
          .antialiased-text { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
          .nav-transition { transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); }
        `}
      </style>

      {/* ================= SOCIAL MEDIA BAR (B&W - REPOSITIONED) ================= */}
      <div className={`fixed z-[100] transition-all duration-500 
  /* Desktop: Left Center Sidebar */
  md:left-2 md:top-1/2 md:-translate-y-1/2 
  /* Mobile: Bottom-Right */
  right-2 bottom-6 md:right-auto md:top-auto md:translate-y-0`}>

        <div className="flex flex-col gap-3 md:gap-5 p-2 bg-black border border-white/20 rounded-full shadow-2xl items-center backdrop-blur-md">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition-all duration-300 hover:scale-125 hover:text-white active:scale-90 p-1"
            >
              <social.icon size={14} className="md:w-5 md:h-5" strokeWidth={2} />
            </a>
          ))}

          {/* ================= ADMIN LOGIN ICON ================= */}
          <div className="w-full h-[1px] bg-white/10 my-1 md:my-2"></div> {/* Separator Line */}
          <button
            onClick={() => navigate('/admin/login')}
            className="text-zinc-500 transition-all duration-300 hover:scale-125 hover:text-purple-400 active:scale-90 p-1"
            title="Admin Login"
          >
            <Shield size={14} className="md:w-5 md:h-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* ================= MOBILE FIXED LOGO (TOP) ================= */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-center py-4 z-[100] bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <Link to="/" className="flex items-center gap-2 px-4 py-1.5 bg-black border border-white/20 rounded-full shadow-lg pointer-events-auto">
          <img src="https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png" className="w-5 h-5 rounded-full" alt="Logo" />
          <span className="font-pacifico text-sm text-white">Kundan</span>
        </Link>
      </div>

      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden md:flex fixed top-6 w-full justify-center z-40 font-nav-modern">
        <div className="relative flex items-center bg-black border border-white/20 px-6 py-2 rounded-full shadow-2xl overflow-hidden antialiased-text">
          <Link to="/" className="flex items-center gap-3 pr-6 border-r border-white/10 group z-20">
            <img
              src="https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png"
              alt="Logo"
              className="w-8 h-8 rounded-full border border-white/20 group-hover:invert transition-all"
            />
            <span className="font-pacifico text-2xl text-white">Kundan</span>
          </Link>

          <div className="relative flex items-center ml-2">
            <div
              className="absolute h-8 rounded-full bg-white transition-all duration-500 ease-out"
              style={{ width: "110px", left: `${activeIndex * 110}px` }}
            />
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative z-10 w-[110px] text-center py-2 text-[15px] font-medium transition-all duration-300 ${location.pathname === item.path ? "text-black font-bold" : "text-zinc-500 hover:text-white"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* ================= COMPACT MOBILE BOTTOM NAV ================= */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[80%] max-w-[280px] font-nav-modern">
        <div className="relative flex items-center bg-black border border-white/20 rounded-full p-1 shadow-2xl overflow-hidden">
          <div
            className="absolute h-[80%] rounded-full bg-white transition-all duration-500"
            style={{
              width: `calc(${100 / navItems.length}% - 6px)`,
              left: `calc(${safeIndex * (100 / navItems.length)}% + 3px)`,
            }}
          />
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative z-10 flex flex-1 flex-col items-center justify-center py-1.5 transition-all ${isActive ? "text-black" : "text-zinc-500"
                  }`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[9px] font-bold uppercase tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;