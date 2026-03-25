// import React from 'react';
// import { 
//   Code2, Layout, Database, Smartphone, 
//   Zap, ShieldCheck, MessageCircle, ArrowRight,
//   Clock, CheckCircle2, Globe
// } from 'lucide-react';

// const Services = () => {
//   const services = [
//     {
//       title: "Full-Stack Development",
//       description: "Modern MERN stack web applications built for scale and performance.",
//       icon: <Database className="text-blue-500" size={32} />,
//       features: ["Custom Dashboard", "API Integration", "Database Design"],
//       gradient: "from-blue-600/20 to-cyan-600/20"
//     },
//     {
//       title: "UI/UX & Frontend",
//       description: "Crafting beautiful, responsive, and 'addictive' user experiences with React.",
//       icon: <Layout className="text-purple-500" size={32} />,
//       features: ["Tailwind CSS", "Animations", "Mobile-First Design"],
//       gradient: "from-purple-600/20 to-pink-600/20"
//     },
//     {
//       title: "E-Commerce Solutions",
//       description: "Scalable online stores with secure payment gateways and admin controls.",
//       icon: <Smartphone className="text-emerald-500" size={32} />,
//       features: ["Wallet Systems", "Order Tracking", "Product Management"],
//       gradient: "from-emerald-600/20 to-teal-600/20"
//     }
//   ];

//   const processSteps = [
//     { title: "Discovery", desc: "Understanding your vision & requirements." },
//     { title: "Design", desc: "Creating UI mockups and architecture." },
//     { title: "Develop", desc: "Coding with clean and optimized logic." },
//     { title: "Launch", desc: "Final testing and deploying to production." }
//   ];

//   return (
//     <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12 px-6">
//       {/* Hero Header */}
//       <div className="max-w-6xl mx-auto text-center mb-20">
//         <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
//           Professional <span className="text-blue-600">Services</span>
//         </h1>
//         <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto uppercase tracking-widest font-bold">
//           Building high-impact digital solutions for your business.
//         </p>
//       </div>

//       {/* Services Grid */}
//       <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-24">
//         {services.map((service, index) => (
//           <div key={index} className={`group relative p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br ${service.gradient} backdrop-blur-xl hover:border-blue-500/50 transition-all duration-500`}>
//             <div className="bg-black/40 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
//               {service.icon}
//             </div>
//             <h3 className="text-xl font-black uppercase italic mb-3 tracking-tight">{service.title}</h3>
//             <p className="text-slate-400 text-xs leading-relaxed mb-6">{service.description}</p>
//             <ul className="space-y-2">
//               {service.features.map((f, i) => (
//                 <li key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase">
//                   <CheckCircle2 size={14} className="text-blue-500" /> {f}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       {/* Workflow Section */}
//       <div className="max-w-6xl mx-auto mb-24 py-12 border-y border-white/5">
//         <h2 className="text-2xl font-black uppercase italic text-center mb-12 tracking-[0.3em]">Development Process</h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           {processSteps.map((step, i) => (
//             <div key={i} className="text-center relative">
//               <div className="text-4xl font-black text-blue-600/20 mb-2">0{i+1}</div>
//               <h4 className="text-sm font-black uppercase mb-1">{step.title}</h4>
//               <p className="text-slate-500 text-[10px] uppercase tracking-tighter">{step.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Call to Action Card */}
//       <div className="max-w-4xl mx-auto bg-blue-600 rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl shadow-blue-600/20">
//         <div className="relative z-10">
//           <h2 className="text-3xl md:text-4xl font-black uppercase italic mb-4">Have a project in mind?</h2>
//           <p className="text-blue-100 text-xs md:text-sm uppercase tracking-widest font-bold mb-8">Let's build something extraordinary together.</p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <a href="/contactme" className="bg-white text-blue-600 px-8 py-3 rounded-full font-black uppercase text-xs flex items-center gap-2 hover:scale-105 transition-transform">
//               Start a Project <ArrowRight size={16} />
//             </a>
//             <a href="https://wa.me/YOUR_NUMBER" className="bg-black/20 text-white border border-white/20 px-8 py-3 rounded-full font-black uppercase text-xs flex items-center gap-2 hover:bg-black/40 transition-all">
//               <MessageCircle size={16} /> WhatsApp Me
//             </a>
//           </div>
//         </div>
//         {/* Decorative Circles */}
//         <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>
//       </div>
//     </div>
//   );
// };

// export default Services;


import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layout, Database, Smartphone, MessageCircle, ArrowRight,
  CheckCircle2, Globe, ShoppingCart, Monitor, PenTool, 
  Newspaper, Laptop, Zap, Sparkles
} from 'lucide-react';

const Services = () => {
  const whatsappNumber = "8235420468";

  // Filtered only simple & manageable services
  const websiteSolutions = [
    {
      id: "portfolio",
      name: "Portfolio Website",
      icon: <PenTool className="text-pink-400" />,
      tagline: "Showcase Your Identity",
      price: "₹3,999+",
      features: ["Creative Project Gallery", "Resume Download", "Skills Progress Bars", "Contact Form", "Dark Mode Support"]
    },
    {
      id: "landing",
      name: "Landing Page",
      icon: <Zap className="text-yellow-500" />,
      tagline: "High-Conversion Page",
      price: "₹2,500+",
      features: ["Single Page Design", "Call-to-Action Buttons", "Fast Loading Speed", "Mobile Responsive", "Lead Capture Form"]
    },
    {
      id: "static",
      name: "Static Website",
      icon: <Monitor className="text-blue-400" />,
      tagline: "Ultra-Fast & Secure",
      price: "₹4,999+",
      features: ["Informational Pages", "SEO Friendly", "Zero Database Lag", "Perfect for Small Shops", "Modern UI Design"]
    },
    {
      id: "blog",
      name: "Blog Website",
      icon: <Newspaper className="text-orange-400" />,
      tagline: "Content Sharing Hub",
      price: "₹8,000+",
      features: ["Easy Article Posting", "Category System", "Comment Section", "Social Media Sharing", "Clean Typography"]
    },
    {
      id: "dynamic",
      name: "Dynamic Website",
      icon: <Database className="text-purple-400" />,
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
      icon: <Laptop className="text-teal-400" />,
      tagline: "Get More Clients",
      price: "₹12,000+",
      features: ["Service Packages", "Testimonials Section", "Booking Form", "WhatsApp Integration", "Work Process Timeline"]
    },
    {
      id: "edu",
      name: "Educational Site",
      icon: <Globe className="text-yellow-400" />,
      tagline: "LMS & Notes Sharing",
      price: "₹15,000+",
      features: ["Chapter-wise Notes", "Student Login", "Video Gallery", "Quiz/Test Setup", "Simple Admin Panel"]
    },
    {
      id: "social",
      name: "Community Site",
      icon: <Layout className="text-cyan-400" />,
      tagline: "Connect Your Users",
      price: "₹20,000+",
      features: ["User Profiles", "Post Creation", "Like/Comment System", "Friend Directory", "Notification Alerts"]
    },
    {
      id: "forum",
      name: "Q&A Forum",
      icon: <MessageCircle className="text-lime-400" />,
      tagline: "Discussion Platform",
      price: "₹10,000+",
      features: ["Ask & Answer System", "Topic Categories", "User Reputation", "Search Discussions", "Moderation Tools"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans pb-10">
      {/* Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 pt-20 md:pt-32 pb-12 px-4 md:px-6 max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={14} /> Full-Stack MERN Developer
          </div>
          <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter text-white uppercase mb-4 leading-tight">
            MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">SERVICES</span>
          </h1>
          <p className="max-w-xl mx-auto text-slate-400 text-xs md:text-base font-medium leading-relaxed px-4">
            Simple, fast, and high-quality web solutions tailored for your growth.
          </p>
        </div>

        {/* --- SERVICES GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-20">
          {websiteSolutions.map((item, index) => (
            <div key={index} className="group flex flex-col bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 md:p-8 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-300">
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black text-slate-500 uppercase block">Starting</span>
                  <span className="text-lg font-black text-white italic">{item.price}</span>
                </div>
              </div>

              <h3 className="text-xl font-black text-white italic uppercase mb-1 tracking-tight group-hover:text-blue-400 transition-colors">
                {item.name}
              </h3>
              <p className="text-blue-500 text-[9px] font-black uppercase tracking-widest mb-6">{item.tagline}</p>

              <div className="flex-1 space-y-3 mb-8">
                {item.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] md:text-[11px] font-bold text-slate-400 uppercase">
                    <CheckCircle2 size={12} className="text-blue-500 shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>

              <Link 
                to="/contactme" 
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest group-hover:bg-blue-600 transition-all"
              >
                Hire Now <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* --- RESPONSIVE COMBO SECTION --- */}
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 relative overflow-hidden text-center md:text-left">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-4">
                Recommended <br className="hidden md:block" /> Combo
              </h2>
              <p className="text-blue-100 text-xs md:text-sm mb-6 font-medium max-w-md">
                Portfolio + Service Marketplace + Blog. 
                Sabse best option apna brand banane ke liye.
              </p>
              <a href={`https://wa.me/${whatsappNumber}`} className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg">
                <MessageCircle size={16} /> WhatsApp Me
              </a>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3 w-full">
               {['Clean Code', 'Responsive', 'SEO Ready', 'Fast Fix'].map((txt, i) => (
                 <div key={i} className="bg-black/20 backdrop-blur-md border border-white/10 p-4 rounded-xl text-center text-white text-[9px] font-black uppercase italic">
                    {txt}
                 </div>
               ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;