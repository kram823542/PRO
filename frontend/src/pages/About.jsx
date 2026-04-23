// // export default About;
// import React from "react";
// import { useNavigate } from "react-router-dom"; // Navigation ke liye import
// import { 
//   Sparkles, MoveRight, Mail, MapPin, 
//   Terminal, Layers, Compass, GraduationCap, Cpu, Globe, Video, Users, Code
// } from "lucide-react";

// const About = () => {
//   const navigate = useNavigate(); // Hook initialization

//   const profile = {
//     firstName: "KUNDAN",
//     lastName: "KUMAR",
//     portfolio: "PORTFOLIO 2026",
//     heroDesc: "B.Sc. Physics student with a passion for <span class='text-cyan-400'>technology, content creation, and social impact</span>. Currently working at <span class='text-cyan-400'>TRI (Transform Rural India)</span> to empower rural communities through digital tools and field-driven solutions.",
//   };

//   const education = [
//     {
//       year: "2024 - 2028",
//       title: "B.Sc. Physics (Hons)",
//       desc: "Degree College, Manika. Focusing on fundamental physics and analytical problem solving.",
//       status: "Pursuing"
//     },
//     {
//       year: "2019",
//       title: "Intermediate (ISc)",
//       desc: "JAC Ranchi. Specialized in Science stream.",
//       status: "Completed"
//     },
//     {
//       year: "2017",
//       title: "Matriculation",
//       desc: "JAC Ranchi. Foundational secondary education.",
//       status: "Completed"
//     }
//   ];

//   const skillTimeline = [
//     {
//       category: "Programming & Dev",
//       tools: "C, Java, Python, HTML, CSS, JS",
//       desc: "Strong foundation in core programming logic and web development fundamentals.",
//       icon: <Terminal size={16} />
//     },
//     {
//       category: "Database & Backend",
//       tools: " MongoDB",
//       desc: "Managing data and building structured backend solutions.",
//       icon: <Layers size={16} />
//     },
//     {
//       category: "Digital & AI Tools",
//       tools: "ChatGPT, Gemini, DeepSeek, MS Office",
//       desc: "Leveraging modern AI tools for research, problem-solving, and professional productivity.",
//       icon: <Cpu size={16} />
//     },
//     {
//       category: "Content Management",
//       tools: "Video Editing, YouTube Strategy, Scripting",
//       desc: "Experienced in managing digital channels and creating engaging educational/tech content.",
//       icon: <Video size={16} />
//     },
//     {
//       category: "Field & Social Work",
//       tools: "Community Mobilization, Data Collection",
//       desc: "Experience in rural development, field surveys, and grassroots social work with TRI.",
//       icon: <Compass size={16} />
//     }
//   ];

//   return (
//     <div className="relative min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans text-sm md:text-base">
      
//       {/* Background Grid */}
//       <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

//       <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        
//         {/* LEFT SIDE: FIXED IMAGE PANEL - COLOR MODE ENABLED */}
//         <div className="lg:fixed lg:w-1/3 h-[65vh] lg:h-screen w-full relative z-20 group overflow-hidden bg-[#050505]">
//           <img
//             src="https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png"
//             alt="Kundan Kumar"
//             className="w-full h-full object-cover brightness-90 lg:brightness-95 hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100"
//           />
//           {/* Note: Grayscale removed from className above to make it colored */}
          
//           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent lg:hidden z-10" />
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050505]/100 hidden lg:block z-20" />
//           <div className="absolute inset-0 shadow-[inner_0px_-80px_100px_rgba(5,5,5,1)] lg:shadow-[inner_-50px_0px_100px_rgba(5,5,5,1)] z-20" />

//           <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20 bg-black/40 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
//             <Sparkles size={14} className="text-cyan-400" />
//             <span className="text-[9px] lg:text-[10px] font-bold tracking-widest uppercase italic text-cyan-400">TRI - Rural Impact Associate</span>
//           </div>

//           <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 z-20 flex flex-col gap-3">
//             <div className="flex items-center gap-3 text-white/80 lg:text-white/40 group-hover:text-white transition-colors">
//               <Mail size={16} /> 
//               <span className="text-[9px] lg:text-[10px] uppercase tracking-widest italic font-medium">Kundanram7261@Gmail.Com</span>
//             </div>
//             <div className="flex items-center gap-3 text-white/80 lg:text-white/40 group-hover:text-white transition-colors">
//               <MapPin size={16} /> 
//               <span className="text-[9px] lg:text-[10px] uppercase tracking-widest italic font-medium text-left">Palamu, Jharkhand, 822126</span>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE: CONTENT */}
//         <div className="lg:ml-[33.33%] lg:w-2/3 w-full px-6 md:px-16 lg:px-24 pt-16 lg:pt-32 pb-10">
          
//           <header className="mb-20">
//             <div className="flex items-center gap-4 text-cyan-500 font-bold tracking-[0.3em] text-[10px] mb-6 uppercase">
//               <span className="w-8 h-[1px] bg-cyan-500"></span>
//               {profile.portfolio}
//             </div>
//             <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 italic">
//               {profile.firstName} <br /> <span className="text-cyan-500">{profile.lastName}</span>
//             </h1>
//             <p className="text-base md:text-xl text-gray-400 font-light leading-relaxed max-w-xl border-l-2 border-white/10 pl-6 italic" 
//                dangerouslySetInnerHTML={{ __html: profile.heroDesc }}>
//             </p>
//           </header>

//           {/* EXPERIENCE SECTION */}
//           <section className="mt-24">
//             <h3 className="text-xs font-bold text-cyan-500 tracking-[0.4em] mb-12 uppercase flex items-center gap-3">
//               <Users size={16}/> Professional Experience
//             </h3>
//             <div className="space-y-12 border-l border-white/10 ml-2">
//               <div className="relative pl-8 group">
//                 <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]" />
//                 <span className="text-[10px] font-mono text-cyan-500/60 block mb-1 tracking-widest uppercase italic">2025 - 2026</span>
//                 <h4 className="text-lg md:text-xl font-bold uppercase italic text-white group-hover:text-cyan-400 transition-colors">Field Associate - Transform Rural India (TRI)</h4>
//                 <p className="text-gray-500 text-sm mt-2 max-w-md leading-relaxed">
//                   Leading field surveys, community mobilization, and data reporting to drive social impact. Expert in bridging the gap between technology and rural development.
//                 </p>
//               </div>
//               <div className="relative pl-8 group">
//                 <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-white/20" />
//                 <span className="text-[10px] font-mono text-cyan-500/60 block mb-1 tracking-widest uppercase italic">2024 - Present</span>
//                 <h4 className="text-lg md:text-xl font-bold uppercase italic text-white group-hover:text-cyan-400 transition-colors">Digital Content Creator & Manager</h4>
//                 <p className="text-gray-500 text-sm mt-2 max-w-md leading-relaxed">
//                   Managing 2 YouTube channels. Skilled in video scripting, editing, and using AI tools to solve complex research problems.
//                 </p>
//               </div>
//             </div>
//           </section>

//           {/* EDUCATION SECTION */}
//           <section className="mt-32">
//             <h3 className="text-xs font-bold text-gray-500 tracking-[0.4em] mb-12 uppercase flex items-center gap-3">
//               <GraduationCap size={16}/> Academic Background
//             </h3>
//             <div className="space-y-12 border-l border-white/10 ml-2">
//               {education.map((edu, idx) => (
//                 <div key={idx} className="relative pl-8 group">
//                   <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full ${idx === 0 ? 'bg-cyan-500 shadow-[0_0_15px_#06b6d4]' : 'bg-white/20'}`} />
//                   <span className="text-[10px] font-mono text-cyan-500/60 block mb-1 tracking-widest uppercase italic">{edu.year}</span>
//                   <h4 className="text-lg md:text-xl font-bold uppercase italic text-white group-hover:text-cyan-400 transition-colors">{edu.title}</h4>
//                   <p className="text-gray-500 text-sm mt-2 max-w-md leading-relaxed">{edu.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* SKILLS SECTION */}
//           <section className="mt-32">
//             <h3 className="text-xs font-bold text-gray-500 tracking-[0.4em] mb-12 uppercase flex items-center gap-3">
//               <Code size={16}/> Technical Arsenal
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//               {skillTimeline.map((skill, idx) => (
//                 <div key={idx} className="group p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all bg-white/[0.02]">
//                   <div className="flex items-center gap-3 mb-4 text-cyan-500">
//                     {skill.icon}
//                     <span className="text-[10px] font-mono tracking-widest uppercase font-bold">{skill.category}</span>
//                   </div>
//                   <h4 className="text-lg font-bold uppercase italic mb-2 group-hover:text-cyan-400 transition-colors">{skill.tools}</h4>
//                   <p className="text-gray-500 text-xs leading-relaxed italic">{skill.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </section>


//           {/* CONTACT CARD SECTION - NAVIGATION UPDATED */}
//           <section className="mt-32 border-t border-white/5 pt-20">
//             <div className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[2rem] p-8 md:p-14 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 group hover:border-cyan-500/30 transition-all duration-500">
//               <div>
//                 <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-4 leading-none">
//                   Let's build <br/> something new.
//                 </h2>
//                 <p className="text-gray-500 text-sm md:text-base max-w-xs">
//                   Interested in tech projects, social work, or content collaboration? Reach out today.
//                 </p>
//               </div>
              
//               <button 
//                 onClick={() => navigate('/contactme')} // Client-side navigation
//                 className="inline-flex items-center gap-5 px-12 py-6 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-cyan-500 hover:text-white transition-all transform hover:-translate-y-2 shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-95 cursor-pointer"
//               >
//                 Get In Touch <MoveRight size={20}/>
//               </button>
//             </div>
//           </section>

//           <footer className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-600">
//               <div className="flex flex-col gap-2 items-center md:items-start">
//                 <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">© 2026 KUNDAN KUMAR</p>
//                 <p className="text-[9px] uppercase tracking-widest italic"> • Tech • Social Impact</p>
//               </div>
              
//               <div className="flex items-center gap-8">
//                 <a href="mailto:Kundanram7261@Gmail.Com" className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-cyan-400 transition-colors">Email</a>
//                 <span className="text-[10px] font-bold text-white/10">KUNDANRAM7261@GMAIL.COM</span>
//               </div>
              
//               <div className="flex items-center gap-2 text-gray-800">
//                 <Globe size={14}/>
//                 <span className="text-[9px] uppercase tracking-widest font-black">Jharkhand, India</span>
//               </div>
//           </footer>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;


// export default About;
import React from "react";
import { useNavigate } from "react-router-dom"; 
import { 
  Sparkles, MoveRight, Mail, MapPin, 
  Terminal, Layers, Compass, GraduationCap, Cpu, Globe, Video, Users, Code
} from "lucide-react";

const About = () => {
  const navigate = useNavigate(); 

  const profile = {
    firstName: "KUNDAN",
    lastName: "KUMAR",
    portfolio: "PORTFOLIO 2026",
    // Color updated to emerald here
    heroDesc: "B.Sc. Physics student with a passion for <span class='text-emerald-400'>technology, content creation, and social impact</span>. Currently working at <span class='text-emerald-400'>TRI (Transform Rural India)</span> to empower rural communities through digital tools and field-driven solutions.",
  };

  const education = [
    {
      year: "2024 - 2028",
      title: "B.Sc. Physics (Hons)",
      desc: "Degree College, Manika. Focusing on fundamental physics and analytical problem solving.",
      status: "Pursuing"
    },
    {
      year: "2019",
      title: "Intermediate (ISc)",
      desc: "JAC Ranchi. Specialized in Science stream.",
      status: "Completed"
    },
    {
      year: "2017",
      title: "Matriculation",
      desc: "JAC Ranchi. Foundational secondary education.",
      status: "Completed"
    }
  ];

  const skillTimeline = [
    {
      category: "Programming & Dev",
      tools: "C, Java, Python, HTML, CSS, JS",
      desc: "Strong foundation in core programming logic and web development fundamentals.",
      icon: <Terminal size={16} />
    },
    {
      category: "Database & Backend",
      tools: " MongoDB",
      desc: "Managing data and building structured backend solutions.",
      icon: <Layers size={16} />
    },
    {
      category: "Digital & AI Tools",
      tools: "ChatGPT, Gemini, DeepSeek, MS Office",
      desc: "Leveraging modern AI tools for research, problem-solving, and professional productivity.",
      icon: <Cpu size={16} />
    },
    {
      category: "Content Management",
      tools: "Video Editing, YouTube Strategy, Scripting",
      desc: "Experienced in managing digital channels and creating engaging educational/tech content.",
      icon: <Video size={16} />
    },
    {
      category: "Field & Social Work",
      tools: "Community Mobilization, Data Collection",
      desc: "Experience in rural development, field surveys, and grassroots social work with TRI.",
      icon: <Compass size={16} />
    }
  ];

  return (
    // Changed bg to Dark Emerald
    <div className="relative min-h-screen bg-[#022c22] text-white selection:bg-emerald-500/30 overflow-x-hidden font-sans text-sm md:text-base">
      
      {/* Background Grid - Emerald Tint */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#10b9810a_1px,transparent_1px),linear-gradient(to_bottom,#10b9810a_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT SIDE: FIXED IMAGE PANEL */}
        <div className="lg:fixed lg:w-1/3 h-[65vh] lg:h-screen w-full relative z-20 group overflow-hidden bg-[#022c22]">
          <img
            src="https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png"
            alt="Kundan Kumar"
            className="w-full h-full object-cover brightness-90 lg:brightness-95 hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-[#022c22]/40 to-transparent lg:hidden z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#022c22]/100 hidden lg:block z-20" />
          <div className="absolute inset-0 shadow-[inner_0px_-80px_100px_rgba(2,44,34,1)] lg:shadow-[inner_-50px_0px_100px_rgba(2,44,34,1)] z-20" />

          <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-20 bg-emerald-950/40 backdrop-blur-xl border border-emerald-500/20 px-3 py-1.5 rounded-full flex items-center gap-2">
            <Sparkles size={14} className="text-emerald-400" />
            <span className="text-[9px] lg:text-[10px] font-bold tracking-widest uppercase italic text-emerald-400">TRI - Rural Impact Associate</span>
          </div>

          <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 z-20 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white/80 lg:text-white/40 group-hover:text-emerald-400 transition-colors">
              <Mail size={16} /> 
              <span className="text-[9px] lg:text-[10px] uppercase tracking-widest italic font-medium">Kundanram7261@Gmail.Com</span>
            </div>
            <div className="flex items-center gap-3 text-white/80 lg:text-white/40 group-hover:text-emerald-400 transition-colors">
              <MapPin size={16} /> 
              <span className="text-[9px] lg:text-[10px] uppercase tracking-widest italic font-medium text-left">Palamu, Jharkhand, 822126</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: CONTENT */}
        <div className="lg:ml-[33.33%] lg:w-2/3 w-full px-6 md:px-16 lg:px-24 pt-16 lg:pt-32 pb-10">
          
          <header className="mb-20">
            <div className="flex items-center gap-4 text-emerald-500 font-bold tracking-[0.3em] text-[10px] mb-6 uppercase">
              <span className="w-8 h-[1px] bg-emerald-500"></span>
              {profile.portfolio}
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 italic">
              {profile.firstName} <br /> <span className="text-emerald-500">{profile.lastName}</span>
            </h1>
            <p className="text-base md:text-xl text-emerald-100/50 font-light leading-relaxed max-w-xl border-l-2 border-emerald-500/20 pl-6 italic" 
               dangerouslySetInnerHTML={{ __html: profile.heroDesc }}>
            </p>
          </header>

          {/* EXPERIENCE SECTION */}
          <section className="mt-24">
            <h3 className="text-xs font-bold text-emerald-500 tracking-[0.4em] mb-12 uppercase flex items-center gap-3">
              <Users size={16}/> Professional Experience
            </h3>
            <div className="space-y-12 border-l border-emerald-500/10 ml-2">
              <div className="relative pl-8 group">
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
                <span className="text-[10px] font-mono text-emerald-500/60 block mb-1 tracking-widest uppercase italic">2025 - 2026</span>
                <h4 className="text-lg md:text-xl font-bold uppercase italic text-white group-hover:text-emerald-400 transition-colors">Field Associate - Transform Rural India (TRI)</h4>
                <p className="text-emerald-100/40 text-sm mt-2 max-w-md leading-relaxed">
                  Leading field surveys, community mobilization, and data reporting to drive social impact. Expert in bridging the gap between technology and rural development.
                </p>
              </div>
              <div className="relative pl-8 group">
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-white/20" />
                <span className="text-[10px] font-mono text-emerald-500/60 block mb-1 tracking-widest uppercase italic">2024 - Present</span>
                <h4 className="text-lg md:text-xl font-bold uppercase italic text-white group-hover:text-emerald-400 transition-colors">Digital Content Creator & Manager</h4>
                <p className="text-emerald-100/40 text-sm mt-2 max-w-md leading-relaxed">
                  Managing 2 YouTube channels. Skilled in video scripting, editing, and using AI tools to solve complex research problems.
                </p>
              </div>
            </div>
          </section>

          {/* EDUCATION SECTION */}
          <section className="mt-32">
            <h3 className="text-xs font-bold text-emerald-700 tracking-[0.4em] mb-12 uppercase flex items-center gap-3">
              <GraduationCap size={16}/> Academic Background
            </h3>
            <div className="space-y-12 border-l border-emerald-500/10 ml-2">
              {education.map((edu, idx) => (
                <div key={idx} className="relative pl-8 group">
                  <div className={`absolute -left-[5px] top-0 w-2 h-2 rounded-full ${idx === 0 ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' : 'bg-white/20'}`} />
                  <span className="text-[10px] font-mono text-emerald-500/60 block mb-1 tracking-widest uppercase italic">{edu.year}</span>
                  <h4 className="text-lg md:text-xl font-bold uppercase italic text-white group-hover:text-emerald-400 transition-colors">{edu.title}</h4>
                  <p className="text-emerald-100/40 text-sm mt-2 max-w-md leading-relaxed">{edu.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SKILLS SECTION */}
          <section className="mt-32">
            <h3 className="text-xs font-bold text-emerald-700 tracking-[0.4em] mb-12 uppercase flex items-center gap-3">
              <Code size={16}/> Technical Arsenal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {skillTimeline.map((skill, idx) => (
                <div key={idx} className="group p-6 rounded-2xl border border-emerald-500/5 hover:border-emerald-500/30 transition-all bg-emerald-500/[0.02]">
                  <div className="flex items-center gap-3 mb-4 text-emerald-500">
                    {skill.icon}
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold">{skill.category}</span>
                  </div>
                  <h4 className="text-lg font-bold uppercase italic mb-2 group-hover:text-emerald-400 transition-colors">{skill.tools}</h4>
                  <p className="text-emerald-100/30 text-xs leading-relaxed italic">{skill.desc}</p>
                </div>
              ))}
            </div>
          </section>


          {/* CONTACT CARD SECTION */}
          <section className="mt-32 border-t border-emerald-500/10 pt-20">
            <div className="bg-gradient-to-br from-emerald-500/[0.03] to-transparent border border-emerald-500/10 rounded-[2rem] p-8 md:p-14 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 group hover:border-emerald-500/30 transition-all duration-500">
              <div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-4 leading-none text-white">
                  Let's build <br/> something new.
                </h2>
                <p className="text-emerald-100/40 text-sm md:text-base max-w-xs">
                  Interested in tech projects, social work, or content collaboration? Reach out today.
                </p>
              </div>
              
              <button 
                onClick={() => navigate('/contactme')} 
                className="inline-flex items-center gap-5 px-12 py-6 bg-emerald-600 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-500 transition-all transform hover:-translate-y-2 shadow-[0_10px_30px_rgba(16,185,129,0.2)] active:scale-95 cursor-pointer"
              >
                Get In Touch <MoveRight size={20}/>
              </button>
            </div>
          </section>

          <footer className="mt-24 pt-10 border-t border-emerald-500/10 flex flex-col md:flex-row justify-between items-center gap-8 text-emerald-800">
              <div className="flex flex-col gap-2 items-center md:items-start">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-500/20">© 2026 KUNDAN KUMAR</p>
                <p className="text-[9px] uppercase tracking-widest italic text-emerald-600"> • Tech • Social Impact</p>
              </div>
              
              <div className="flex items-center gap-8">
                <a href="mailto:Kundanram7261@Gmail.Com" className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-emerald-400 transition-colors">Email</a>
                <span className="text-[10px] font-bold text-emerald-500/10 uppercase">KUNDANRAM7261@GMAIL.COM</span>
              </div>
              
              <div className="flex items-center gap-2 text-emerald-900">
                <Globe size={14}/>
                <span className="text-[9px] uppercase tracking-widest font-black">Jharkhand, India</span>
              </div>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default About;