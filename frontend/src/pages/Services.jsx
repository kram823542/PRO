
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   Layout, Database, Smartphone, MessageCircle, ArrowRight,
//   CheckCircle2, Globe, ShoppingCart, Monitor, PenTool, 
//   Newspaper, Laptop, Zap, Sparkles, Search, Code, Rocket, Target
// } from 'lucide-react';

// const Services = () => {
//   const whatsappNumber = "8235420468";
//   const [searchTerm, setSearchTerm] = useState("");

//   const websiteSolutions = [
//     {
//       id: "portfolio",
//       name: "Portfolio Website",
//       icon: <PenTool className="text-pink-400" />,
//       tagline: "Showcase Your Identity",
//       price: "₹3,999+",
//       features: ["Creative Project Gallery", "Resume Download", "Skills Progress Bars", "Contact Form", "Dark Mode Support"]
//     },
//     {
//       id: "landing",
//       name: "Landing Page",
//       icon: <Zap className="text-yellow-500" />,
//       tagline: "High-Conversion Page",
//       price: "₹2,500+",
//       features: ["Single Page Design", "Call-to-Action Buttons", "Fast Loading Speed", "Mobile Responsive", "Lead Capture Form"]
//     },
//     {
//       id: "static",
//       name: "Static Website",
//       icon: <Monitor className="text-blue-400" />,
//       tagline: "Ultra-Fast & Secure",
//       price: "₹4,999+",
//       features: ["Informational Pages", "SEO Friendly", "Zero Database Lag", "Perfect for Small Shops", "Modern UI Design"]
//     },
//     {
//       id: "blog",
//       name: "Blog Website",
//       icon: <Newspaper className="text-orange-400" />,
//       tagline: "Content Sharing Hub",
//       price: "₹8,000+",
//       features: ["Easy Article Posting", "Category System", "Comment Section", "Social Media Sharing", "Clean Typography"]
//     },
//     {
//       id: "dynamic",
//       name: "Dynamic Website",
//       icon: <Database className="text-purple-400" />,
//       tagline: "Smart Data Control",
//       price: "₹12,000+",
//       features: ["Admin Control Panel", "User Login/Signup", "Database (MongoDB)", "Real-time Updates", "Search Functionality"]
//     },
//     {
//       id: "ecommerce",
//       name: "E-Commerce Store",
//       icon: <ShoppingCart className="text-emerald-400" />,
//       tagline: "Start Selling Online",
//       price: "₹25,000+",
//       features: ["Product Management", "Shopping Cart", "Payment Integration", "Order Dashboard", "Inventory Tracking"]
//     },
//     {
//       id: "freelance",
//       name: "Service Website",
//       icon: <Laptop className="text-teal-400" />,
//       tagline: "Get More Clients",
//       price: "₹12,000+",
//       features: ["Service Packages", "Testimonials Section", "Booking Form", "WhatsApp Integration", "Work Process Timeline"]
//     },
//     {
//       id: "edu",
//       name: "Educational Site",
//       icon: <Globe className="text-yellow-400" />,
//       tagline: "LMS & Notes Sharing",
//       price: "₹15,000+",
//       features: ["Chapter-wise Notes", "Student Login", "Video Gallery", "Quiz/Test Setup", "Simple Admin Panel"]
//     },
//     {
//       id: "social",
//       name: "Community Site",
//       icon: <Layout className="text-cyan-400" />,
//       tagline: "Connect Your Users",
//       price: "₹20,000+",
//       features: ["User Profiles", "Post Creation", "Like/Comment System", "Friend Directory", "Notification Alerts"]
//     },
//     {
//       id: "forum",
//       name: "Q&A Forum",
//       icon: <MessageCircle className="text-lime-400" />,
//       tagline: "Discussion Platform",
//       price: "₹10,000+",
//       features: ["Ask & Answer System", "Topic Categories", "User Reputation", "Search Discussions", "Moderation Tools"]
//     }
//   ];

//   // Improved Search Logic: Checks name, tagline, and features list
//   const filteredServices = websiteSolutions.filter(service => {
//     const searchLower = searchTerm.toLowerCase();
//     const matchesName = service.name.toLowerCase().includes(searchLower);
//     const matchesTagline = service.tagline.toLowerCase().includes(searchLower);
//     const matchesFeatures = service.features.some(feat => feat.toLowerCase().includes(searchLower));
    
//     return matchesName || matchesTagline || matchesFeatures;
//   });

//   const steps = [
//     { title: "Planning", icon: <Target size={20}/>, desc: "Requirements & Strategy" },
//     { title: "Design", icon: <PenTool size={20}/>, desc: "Modern UI/UX Mockups" },
//     { title: "Build", icon: <Code size={20}/>, desc: "Clean & Optimized Code" },
//     { title: "Launch", icon: <Rocket size={20}/>, desc: "Deployment & Support" }
//   ];

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-300 font-sans pb-20 selection:bg-blue-500/30">
      
//       {/* Decorative Glows */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
//         <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />
//       </div>

//       <div className="relative z-10 pt-24 pb-12 px-4 md:px-6 max-w-7xl mx-auto">
        
//         {/* --- HERO HEADER --- */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-pulse">
//             <Sparkles size={14} /> Full-Stack MERN Architect
//           </div>
//           <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter text-white uppercase mb-4 leading-none">
//             Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Web Models</span>
//           </h1>
//           <p className="max-w-xl mx-auto text-slate-400 text-xs md:text-base font-medium leading-relaxed mb-10 px-4">
//             Professional development services built for scale, speed, and success.
//           </p>

//           {/* --- IMPROVED SEARCH BAR --- */}
//           <div className="max-w-md mx-auto relative group px-4">
//             <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
//             <input 
//               type="text" 
//               placeholder="Search by tech, feature or service..." 
//               className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all text-white placeholder:text-slate-600"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* --- SERVICES GRID --- */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 px-4 md:px-0">
//           {filteredServices.length > 0 ? (
//             filteredServices.map((item, index) => (
//               <div key={item.id} className="group flex flex-col bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500 overflow-hidden relative">
//                 <div className="absolute -right-4 -top-4 text-8xl font-black text-white/[0.02] group-hover:text-blue-500/[0.05] transition-colors italic">0{index + 1}</div>
                
//                 <div className="flex justify-between items-start mb-8 relative z-10">
//                   <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 group-hover:scale-110 transition-transform duration-500">
//                     {item.icon}
//                   </div>
//                   <div className="text-right">
//                     <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Starting</span>
//                     <span className="text-xl font-black text-white italic tracking-tight">{item.price}</span>
//                   </div>
//                 </div>

//                 <h3 className="text-2xl font-black text-white italic uppercase mb-1 tracking-tight group-hover:text-blue-400 transition-colors relative z-10">
//                   {item.name}
//                 </h3>
//                 <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8 relative z-10">{item.tagline}</p>

//                 <div className="flex-1 space-y-3 mb-10 relative z-10">
//                   {item.features.map((feat, i) => (
//                     <div key={i} className="flex items-center gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
//                       <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
//                       {feat}
//                     </div>
//                   ))}
//                 </div>

//                 <Link 
//                   to="/contactme" 
//                   className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-blue-600 group-hover:border-blue-500 transition-all relative z-10"
//                 >
//                   Book Blueprint <ArrowRight size={14} />
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full py-20 text-center bg-white/[0.01] border border-dashed border-white/5 rounded-3xl">
//               <Search className="mx-auto mb-4 text-slate-700" size={48} />
//               <p className="text-slate-500 italic uppercase font-black tracking-widest">No matching service found for "{searchTerm}"</p>
//             </div>
//           )}
//         </div>

//         {/* --- WORKFLOW ROADMAP --- */}
//         <div className="mb-32 px-4 md:px-0">
//           <h2 className="text-center text-xs font-black uppercase tracking-[0.4em] text-blue-500 mb-12">Execution Strategy</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//              {steps.map((step, i) => (
//                <div key={i} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center group hover:border-blue-500/20 transition-all">
//                   <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center mx-auto mb-4 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
//                     {step.icon}
//                   </div>
//                   <h4 className="text-[10px] font-black text-white uppercase mb-1">{step.title}</h4>
//                   <p className="text-[9px] text-slate-500 uppercase font-bold">{step.desc}</p>
//                </div>
//              ))}
//           </div>
//         </div>

//         {/* --- CTA SECTION --- */}
//         <div className="mx-4 md:mx-0 bg-gradient-to-br from-blue-600 to-blue-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-center md:text-left shadow-2xl shadow-blue-600/20">
//           <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-40 -mt-40" />
//           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
//             <div className="max-w-lg">
//               <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none mb-6">
//                 Start Your <br /> Digital Era
//               </h2>
//               <p className="text-blue-100 text-sm md:text-base mb-8 font-medium">
//                 Let's convert your vision into a high-impact web solution with modern tech.
//               </p>
//               <div className="flex flex-wrap gap-4 justify-center md:justify-start">
//                 <Link to="/contactme" className="px-10 py-4 bg-white text-blue-600 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">
//                   Let's Connect
//                 </Link>
//                 <a href={`https://wa.me/${whatsappNumber}`} className="px-10 py-4 bg-black/20 text-white border border-white/20 rounded-full font-black uppercase text-[10px] tracking-widest backdrop-blur-md hover:bg-black/40 transition-all">
//                   WhatsApp
//                 </a>
//               </div>
//             </div>
//             <div className="hidden lg:block">
//               <Code className="text-white/20" size={200} />
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Services;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layout, Database, Smartphone, MessageCircle, ArrowRight,
  CheckCircle2, Globe, ShoppingCart, Monitor, PenTool, 
  Newspaper, Laptop, Zap, Sparkles, Search, Code, Rocket, Target
} from 'lucide-react';

const Services = () => {
  const whatsappNumber = "8235420468";
  const [searchTerm, setSearchTerm] = useState("");

  const websiteSolutions = [
    {
      id: "portfolio",
      name: "Portfolio Website",
      icon: <PenTool className="text-emerald-400" />,
      tagline: "Showcase Your Identity",
      price: "₹3,999+",
      features: ["Creative Project Gallery", "Resume Download", "Skills Progress Bars", "Contact Form", "Dark Mode Support"]
    },
    {
      id: "landing",
      name: "Landing Page",
      icon: <Zap className="text-emerald-500" />,
      tagline: "High-Conversion Page",
      price: "₹2,500+",
      features: ["Single Page Design", "Call-to-Action Buttons", "Fast Loading Speed", "Mobile Responsive", "Lead Capture Form"]
    },
    {
      id: "static",
      name: "Static Website",
      icon: <Monitor className="text-emerald-400" />,
      tagline: "Ultra-Fast & Secure",
      price: "₹4,999+",
      features: ["Informational Pages", "SEO Friendly", "Zero Database Lag", "Perfect for Small Shops", "Modern UI Design"]
    },
    {
      id: "blog",
      name: "Blog Website",
      icon: <Newspaper className="text-emerald-400" />,
      tagline: "Content Sharing Hub",
      price: "₹8,000+",
      features: ["Easy Article Posting", "Category System", "Comment Section", "Social Media Sharing", "Clean Typography"]
    },
    {
      id: "dynamic",
      name: "Dynamic Website",
      icon: <Database className="text-emerald-400" />,
      tagline: "Smart Data Control",
      price: "₹12,000+",
      features: ["Admin Control Panel", "User Login/Signup", "Database (MongoDB)", "Real-time Updates", "Search Functionality"]
    },
    {
      id: "ecommerce",
      name: "E-Commerce Store",
      icon: <ShoppingCart className="text-emerald-400" />,
      tagline: "Start Selling Online",
      price: "₹25,000+",
      features: ["Product Management", "Shopping Cart", "Payment Integration", "Order Dashboard", "Inventory Tracking"]
    },
    {
      id: "freelance",
      name: "Service Website",
      icon: <Laptop className="text-emerald-400" />,
      tagline: "Get More Clients",
      price: "₹12,000+",
      features: ["Service Packages", "Testimonials Section", "Booking Form", "WhatsApp Integration", "Work Process Timeline"]
    },
    {
      id: "edu",
      name: "Educational Site",
      icon: <Globe className="text-emerald-400" />,
      tagline: "LMS & Notes Sharing",
      price: "₹15,000+",
      features: ["Chapter-wise Notes", "Student Login", "Video Gallery", "Quiz/Test Setup", "Simple Admin Panel"]
    },
    {
      id: "social",
      name: "Community Site",
      icon: <Layout className="text-emerald-400" />,
      tagline: "Connect Your Users",
      price: "₹20,000+",
      features: ["User Profiles", "Post Creation", "Like/Comment System", "Friend Directory", "Notification Alerts"]
    },
    {
      id: "forum",
      name: "Q&A Forum",
      icon: <MessageCircle className="text-emerald-400" />,
      tagline: "Discussion Platform",
      price: "₹10,000+",
      features: ["Ask & Answer System", "Topic Categories", "User Reputation", "Search Discussions", "Moderation Tools"]
    }
  ];

  const filteredServices = websiteSolutions.filter(service => {
    const searchLower = searchTerm.toLowerCase();
    const matchesName = service.name.toLowerCase().includes(searchLower);
    const matchesTagline = service.tagline.toLowerCase().includes(searchLower);
    const matchesFeatures = service.features.some(feat => feat.toLowerCase().includes(searchLower));
    
    return matchesName || matchesTagline || matchesFeatures;
  });

  const steps = [
    { title: "Planning", icon: <Target size={20}/>, desc: "Requirements & Strategy" },
    { title: "Design", icon: <PenTool size={20}/>, desc: "Modern UI/UX Mockups" },
    { title: "Build", icon: <Code size={20}/>, desc: "Clean & Optimized Code" },
    { title: "Launch", icon: <Rocket size={20}/>, desc: "Deployment & Support" }
  ];

  return (
    <div className="min-h-screen bg-[#022c22] text-emerald-100/70 font-sans pb-20 selection:bg-emerald-500/30">
      
      {/* Decorative Glows - Emerald Green */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 pt-24 pb-12 px-4 md:px-6 max-w-7xl mx-auto">
        
        {/* --- HERO HEADER --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-pulse">
            <Sparkles size={14} /> Full-Stack MERN Architect
          </div>
          <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter text-white uppercase mb-4 leading-none">
            Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-300">Web Models</span>
          </h1>
          <p className="max-w-xl mx-auto text-emerald-100/40 text-xs md:text-base font-medium leading-relaxed mb-10 px-4">
            Professional development services built for scale, speed, and success.
          </p>

          {/* --- SEARCH BAR --- */}
          <div className="max-w-md mx-auto relative group px-4">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-emerald-700 group-focus-within:text-emerald-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by tech, feature or service..." 
              className="w-full bg-emerald-950/30 border border-emerald-500/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all text-white placeholder:text-emerald-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- SERVICES GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 px-4 md:px-0">
          {filteredServices.length > 0 ? (
            filteredServices.map((item, index) => (
              <div key={item.id} className="group flex flex-col bg-emerald-950/20 border border-emerald-500/5 rounded-[2.5rem] p-8 hover:bg-emerald-900/30 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden relative shadow-2xl">
                <div className="absolute -right-4 -top-4 text-8xl font-black text-emerald-500/[0.03] group-hover:text-emerald-500/[0.07] transition-colors italic">0{index + 1}</div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500/10 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest block mb-1">Starting</span>
                    <span className="text-xl font-black text-white italic tracking-tight">{item.price}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white italic uppercase mb-1 tracking-tight group-hover:text-emerald-400 transition-colors relative z-10">
                  {item.name}
                </h3>
                <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8 relative z-10">{item.tagline}</p>

                <div className="flex-1 space-y-3 mb-10 relative z-10">
                  {item.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-[11px] font-bold text-emerald-100/30 uppercase tracking-tight">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>

                <Link 
                  to="/contactme" 
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 hover:border-emerald-500 transition-all relative z-10"
                >
                  Book Blueprint <ArrowRight size={14} />
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-emerald-950/10 border border-dashed border-emerald-500/10 rounded-3xl">
              <Search className="mx-auto mb-4 text-emerald-900" size={48} />
              <p className="text-emerald-800 italic uppercase font-black tracking-widest">No matching service found for "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* --- WORKFLOW ROADMAP --- */}
        <div className="mb-32 px-4 md:px-0">
          <h2 className="text-center text-xs font-black uppercase tracking-[0.4em] text-emerald-500 mb-12">Execution Strategy</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {steps.map((step, i) => (
               <div key={i} className="p-6 rounded-[2rem] bg-emerald-950/20 border border-emerald-500/5 text-center group hover:border-emerald-500/20 transition-all">
                  <div className="w-12 h-12 rounded-full bg-emerald-600/10 flex items-center justify-center mx-auto mb-4 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    {step.icon}
                  </div>
                  <h4 className="text-[10px] font-black text-white uppercase mb-1">{step.title}</h4>
                  <p className="text-[9px] text-emerald-700 uppercase font-bold">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>

        {/* --- CTA SECTION --- */}
        <div className="mx-4 md:mx-0 bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-center md:text-left shadow-2xl shadow-emerald-900/50">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-40 -mt-40" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none mb-6">
                Start Your <br /> Digital Era
              </h2>
              <p className="text-emerald-100/60 text-sm md:text-base mb-8 font-medium">
                Let's convert your vision into a high-impact web solution with modern tech.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link to="/contactme" className="px-10 py-4 bg-white text-emerald-700 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">
                  Let's Connect
                </Link>
                <a href={`https://wa.me/${whatsappNumber}`} className="px-10 py-4 bg-black/20 text-white border border-white/20 rounded-full font-black uppercase text-[10px] tracking-widest backdrop-blur-md hover:bg-black/40 transition-all">
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <Code className="text-white/10" size={200} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;