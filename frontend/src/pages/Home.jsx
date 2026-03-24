// import React, { useState, useEffect } from "react";
// import { Sparkles, X, ChevronRight, ArrowUpRight, Github, Instagram, Quote as QuoteIcon, Terminal, Code } from "lucide-react";
// import { postAPI } from '../services/api';
// import PublicPost from './PublicPost';

// const Home = () => {
//   const [fontIndex, setFontIndex] = useState(0);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedImg, setSelectedImg] = useState(null);
//   const [quoteIndex, setQuoteIndex] = useState(0);

//   // Carousel Logic State
//   const [imgIndex, setImgIndex] = useState(0);

//   const fonts = [
//     { family: "'Pacifico', cursive", color: "text-blue-500" },
//     { family: "'Dancing Script', cursive", color: "text-slate-100" },
//     { family: "'Kaushan Script', cursive", color: "text-cyan-400" },
//     { family: "'Lobster', cursive", color: "text-white" },
//   ];

//   const quotes = [
//     { text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.", author: "STEVE JOBS" },
//     { text: "First, solve the problem. Then, write the code.", author: "JOHN JOHNSON" },
//     { text: "The best way to predict the future is to invent it.", author: "ALAN KAY" }
//   ];

//   // Profile Image Array (Added 4 images as requested)
//   const profileImages = [
//     "https://res.cloudinary.com/dsjnikk42/image/upload/v1760289242/test-uploads/sazbscnhz4bhqqaeilvv.jpg",
//     "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png", // Replace with 2nd Image URL
//     "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png", // Replace with 3rd Image URL
//     "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223215/Screenshot_20251023-180804.Photos_2_bgrsgh.png"  // Replace with 4th Image URL
//   ];

//   useEffect(() => {
//     fetchPosts();
//     const fontTimer = setInterval(() => setFontIndex((prev) => (prev + 1) % fonts.length), 2500);
//     const quoteTimer = setInterval(() => setQuoteIndex((prev) => (prev + 1) % quotes.length), 5000);

//     // Automatic Image Transition Timer (2 Seconds)
//     const imgTimer = setInterval(() => {
//       setImgIndex((prev) => (prev + 1) % profileImages.length);
//     }, 2000);

//     return () => {
//       clearInterval(fontTimer);
//       clearInterval(quoteTimer);
//       clearInterval(imgTimer);
//     };
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await postAPI.getPosts({ limit: 50 });
//       const postsData = response.data.data || response.data;
//       setPosts(Array.isArray(postsData) ? postsData : []);
//     } catch (error) { console.error('Error:', error); } finally { setLoading(false); }
//   };

//   const categories = ['All', ...new Set(posts.map(post => post.category))];
//   const filteredPosts = selectedCategory === 'All' ? posts : posts.filter(post => post.category === selectedCategory);

//   return (
//     <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/50 overflow-x-hidden font-sans">

//       {/* ZOOM MODAL */}
//       {selectedImg && (
//         <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4" onClick={() => setSelectedImg(null)}>
//           <button onClick={() => setSelectedImg(null)} className="absolute top-6 right-6 p-4 bg-white text-black hover:bg-blue-600 hover:text-white rounded-full transition-all z-[100]">
//             <X size={24} strokeWidth={3} />
//           </button>
//           <img
//             src={selectedImg}
//             alt="zoom"
//             className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.2)] animate-in zoom-in-95 duration-300"
//             onClick={(e) => e.stopPropagation()}
//           />
//         </div>
//       )}

//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
//         <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 blur-[100px] rounded-full" />
//       </div>

//       <style dangerouslySetInnerHTML={{
//         __html: `
//         @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Kaushan+Script&family=Lobster&family=Pacifico&display=swap');
//         .octagon-clip { clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%); }
//         .glass-header { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//       `}} />

//       {/* HERO SECTION */}
//       <section className="relative z-10 pt-16 md:pt-24 pb-12 md:pb-20 px-4 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
//         {/* Cyberpunk Background Grid */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

//         <div className="flex flex-col items-center">

//           {/* 1. IMAGE SECTION (TOP) */}
//           <div
//             className="relative w-full max-w-[1100px] aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/9] mb-8 md:mb-16 group cursor-pointer md:cursor-none"
//             onClick={() => setSelectedImg(profileImages[imgIndex])}
//           >
//             <div className="absolute -inset-2 md:-inset-4 border border-blue-500/20 rounded-[1.5rem] md:rounded-[3rem] group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
//             <div className="absolute -inset-1 md:-inset-2 border border-white/5 rounded-[1.2rem] md:rounded-[2.5rem] pointer-events-none" />

//             <div className="relative w-full h-full rounded-[1rem] md:rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl border border-white/10">
//               {profileImages.map((img, i) => (
//                 <div
//                   key={i}
//                   className={`absolute inset-0 transition-all duration-1000 ease-in-out
//               ${i === imgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
//                 >
//                   <img
//                     src={img}
//                     alt="Kundan Architecture"
//                     className="w-full h-full object-cover grayscale brightness-75 md:brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 md:opacity-60" />
//                 </div>
//               ))}

//               <div className="hidden sm:flex absolute top-4 md:top-8 left-4 md:left-8 items-center gap-4 z-20">
//                 <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
//                   <span className="text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase">System_Active_v2.6</span>
//                 </div>
//                 <div className="h-[1px] w-24 bg-gradient-to-r from-blue-500 to-transparent" />
//               </div>

//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
//                 {profileImages.map((_, i) => (
//                   <div
//                     key={i}
//                     className={`h-1 md:h-1.5 transition-all duration-500 rounded-full ${i === imgIndex ? 'w-8 md:w-12 bg-blue-500' : 'w-2 md:w-4 bg-white/20'}`}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:left-12 z-30 bg-blue-600 p-3 md:p-6 rounded-xl md:rounded-2xl shadow-xl transition-transform active:scale-90 md:group-hover:-translate-y-4 md:group-hover:rotate-6">
//               <Terminal size={20} className="text-white md:w-8 md:h-8" />
//             </div>
//           </div>

//           {/* 2. TEXT CONTENT (BOTTOM) */}
//           <div className="w-full max-w-[1200px] z-10 mt-6 md:mt-10">
//             <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">

//               <div className="flex-1 text-center md:text-left">
//                 <div className="inline-flex items-center gap-2 mb-4 md:mb-6 text-blue-500 font-bold text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase">
//                   <span className="w-6 md:w-8 h-[1px] bg-blue-500" /> Based in Jharkhand
//                 </div>

//                 <h1
//                   className={`text-5xl sm:text-7xl md:text-9xl lg:text-[150px] xl:text-[180px] leading-[0.8] mb-6 transition-all duration-1000 tracking-tighter font-black ${fonts[fontIndex].color}`}
//                   style={{ fontFamily: fonts[fontIndex].family }}
//                 >
//                   Kundan <br className="hidden md:block" />
//                   <span className="text-white md:mix-blend-difference">Kumar</span>
//                 </h1>
//               </div>

//               <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left md:pb-12">
//                 {/* Modern Quote Section - Now Fully Italic */}
//                 <div className="relative group max-w-xl mb-10">
//                   <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-transparent hidden md:block rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
//                   <p className="text-slate-400 text-lg md:text-2xl font-light leading-relaxed md:pl-8 transition-colors group-hover:text-slate-300 italic">
//                     <span className="opacity-80">"Pain builds power.</span>{' '}
//                     <span className="text-white font-semibold drop-shadow-sm">
//                       Focus creates future."
//                     </span>{' '}
//                     <span className="block mt-2 text-sm tracking-[0.3em] uppercase font-bold text-blue-500/80 not-italic">
//                       You are the plan
//                     </span>
//                   </p>
//                 </div>

//                 {/* Actions Container */}
//                 <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
//                   {/* Primary CTA: With Original Slide-up Animation */}
//                   <button
//                     onClick={() => (window.location.href = './contactme')}
//                     className="group relative overflow-hidden px-8 py-5 bg-blue-600 rounded-xl transition-all active:scale-95 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] border border-blue-500/20"
//                   >
//                     <div className="relative z-10 flex items-center gap-3 text-white mix-blend-difference">
//                       <span className="text-[11px] font-black uppercase tracking-[0.2em]">CONTACT ME </span>
//                       <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
//                     </div>

//                     {/* Animation Overlay */}
//                     <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
//                   </button>

//                   {/* Modern Status Badge */}
//                   <div className="flex items-center gap-4 bg-slate-900/40 backdrop-blur-md border border-white/5 p-2 pr-6 rounded-2xl">
//                     <div className="flex -space-x-2 ml-2">
//                       {['W', 'E', 'L', 'C', 'O', 'M', 'E'].map((letter, idx) => (
//                         <div
//                           key={idx}
//                           className="w-9 h-9 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-[10px] font-bold text-blue-400 shadow-xl ring-2 ring-slate-950 hover:z-20 hover:-translate-y-1 transition-all cursor-default"
//                         >
//                           {letter}
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter leading-none">Status</span>
//                       <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest animate-pulse">Online</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </section>

//       {/* QUOTE SECTION */}
//      <section className="relative z-10 py-12 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-white/5">
//   <div className="mb-10">
//     <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-none">
//       Core <span className="text-blue-600 font-serif">Principles</span>
//     </h2>
//   </div>
//   <div className="flex flex-col gap-10 md:gap-14">
//     {quotes.map((quote, index) => (
//       <div key={index} className={`flex w-full ${index % 2 !== 0 ? 'justify-end' : 'justify-start'}`}>
//         <div className={`max-w-xl w-full ${index % 2 !== 0 ? 'text-right' : 'text-left'}`}>
          
//           {/* Simple Italic Font: Using Serif for a clean premium look */}
//           <p 
//             className={`text-slate-300 text-lg md:text-xl font-medium leading-relaxed italic py-1 transition-all duration-700 ${index % 2 === 0 ? 'border-l-2 border-blue-600 pl-5' : 'border-r-2 border-blue-600 pr-5'}`} 
//             style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
//           >
//             "{quote.text}"
//           </p>

//           <div className={`mt-3 flex items-center gap-3 ${index % 2 !== 0 ? 'flex-row-reverse' : 'pl-5'}`}>
//             <div className="h-[1px] w-6 bg-blue-600/40" />
//             <span className="text-[10px] font-bold tracking-[0.3em] text-blue-500 uppercase opacity-80">
//               {quote.author}
//             </span>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </section>

//       {/* POST SHOWCASE SECTION */}
//       <section className="relative z-10 pt-16 pb-6 px-4 md:px-12 max-w-[1600px] mx-auto">
//         <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-12">
//           <div className="flex-1 text-center md:text-left">
//             <h2 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-[0.9]">
//               WORK <span className="text-blue-600">Insights</span>
//             </h2>
//             <p className="text-slate-500 text-[10px] md:text-sm mt-4 max-w-md border-l-0 md:border-l-2 border-blue-600 px-0 md:pl-4 italic">
//               Exploring the latest in system architecture and digital innovation.
//             </p>
//           </div>
//           <div className="w-full md:w-auto glass-header p-1.5 rounded-2xl border border-blue-500/10 overflow-hidden">
//             <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 px-2 md:px-0">
//               {categories.map(cat => (
//                 <button key={cat} onClick={() => setSelectedCategory(cat)} className={`whitespace-nowrap px-6 py-2.5 md:px-8 md:py-3 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="h-[40vh] flex justify-center items-center">
//             <div className="w-10 h-10 border-4 border-t-blue-600 rounded-full animate-spin" />
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5">
//             {filteredPosts.map((post, index) => (
//               <div key={post._id} className="group relative bg-white/[0.01] border border-white/5 rounded-[2rem] p-3 md:p-4 hover:border-blue-500/30 transition-all duration-500">
//                 <PublicPost post={post} index={index} isHomePage={true} />
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       <footer className="relative z-10 py-16 px-12 border-t border-white/5 bg-[#010409]">
//         <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
//           <div>
//             <h2 className="text-2xl font-black uppercase italic tracking-widest text-blue-500">Kundan Kumar</h2>
//             <p className="text-slate-500 text-[10px] mt-2 font-medium uppercase tracking-tighter">""Be educated, be agitated , and be organized ."</p>
//           </div>
//           <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.5em]">© 2026 ARCHITECT CORE</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Navigation ke liye
import { 
  Sparkles, X, ChevronRight, ArrowUpRight, Github, 
  Instagram, Quote as QuoteIcon, Terminal, Code 
} from "lucide-react";
import { postAPI } from '../services/api';
import PublicPost from './PublicPost';

const Home = () => {
  const navigate = useNavigate();
  const [fontIndex, setFontIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImg, setSelectedImg] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Carousel Logic State
  const [imgIndex, setImgIndex] = useState(0);

  const fonts = [
    { family: "'Pacifico', cursive", color: "text-blue-500" },
    { family: "'Dancing Script', cursive", color: "text-slate-100" },
    { family: "'Kaushan Script', cursive", color: "text-cyan-400" },
    { family: "'Lobster', cursive", color: "text-white" },
  ];

  const quotes = [
    { text: " Dreams are not the ones you see while sleeping, dreams are those that don’t let you sleep..", author: "APJ Abdul Kalam" },
    { text: "Educate, Agitate, Organize.", author: "Dr. B. R. Ambedkar" },
    { text: "The best way to predict the future is to invent it.", author: "ALAN KAY" }
  ];

  // Profile Image Array
  const profileImages = [
    "https://res.cloudinary.com/dsjnikk42/image/upload/v1741088194/Screenshot_20251023-180837.Photos_mwi249.png",
    "https://res.cloudinary.com/dsjnikk42/image/upload/v1741088176/Screenshot_20251023-180804.Photos_2_bgrsgh.png",
    "https://res.cloudinary.com/dsjnikk42/image/upload/v1741014168/test-uploads/sazbscnhz4bhqqaeilvv.jpg",
    "https://res.cloudinary.com/dsjnikk42/image/upload/v1741088194/Screenshot_20251023-180837.Photos_mwi249.png"
  ];

  useEffect(() => {
    fetchPosts();
    const fontTimer = setInterval(() => setFontIndex((prev) => (prev + 1) % fonts.length), 2500);
    const quoteTimer = setInterval(() => setQuoteIndex((prev) => (prev + 1) % quotes.length), 5000);

    // Automatic Image Transition Timer (2 Seconds)
    const imgTimer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % profileImages.length);
    }, 2000);

    return () => {
      clearInterval(fontTimer);
      clearInterval(quoteTimer);
      clearInterval(imgTimer);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postAPI.getPosts({ limit: 50 });
      const postsData = response.data.data || response.data;
      setPosts(Array.isArray(postsData) ? postsData : []);
    } catch (error) { 
      console.error('Error:', error); 
    } finally { 
      setLoading(false); 
    }
  };

  const categories = ['All', ...new Set(posts.map(post => post.category))];
  const filteredPosts = selectedCategory === 'All' ? posts : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/50 overflow-x-hidden font-sans">

      {/* ZOOM MODAL */}
      {selectedImg && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4" onClick={() => setSelectedImg(null)}>
          <button onClick={() => setSelectedImg(null)} className="absolute top-6 right-6 p-4 bg-white text-black hover:bg-blue-600 hover:text-white rounded-full transition-all z-[100]">
            <X size={24} strokeWidth={3} />
          </button>
          <img
            src={selectedImg}
            alt="zoom"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.2)] animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 blur-[100px] rounded-full" />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Kaushan+Script&family=Lobster&family=Pacifico&display=swap');
        .glass-header { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />

      {/* HERO SECTION */}
      <section className="relative z-10 pt-16 md:pt-24 pb-12 md:pb-20 px-4 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="flex flex-col items-center">
          {/* IMAGE SECTION */}
          <div
            className="relative w-full max-w-[1100px] aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/9] mb-8 md:mb-16 group cursor-pointer"
            onClick={() => setSelectedImg(profileImages[imgIndex])}
          >
            <div className="absolute -inset-2 md:-inset-4 border border-blue-500/20 rounded-[1.5rem] md:rounded-[3rem] group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
            
            <div className="relative w-full h-full rounded-[1rem] md:rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl border border-white/10">
              {profileImages.map((img, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out
                    ${i === imgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                >
                  <img
                    src={img}
                    alt="Kundan Architecture"
                    className="w-full h-full object-cover grayscale brightness-75 md:brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 md:opacity-60" />
                </div>
              ))}

              <div className="hidden sm:flex absolute top-4 md:top-8 left-4 md:left-8 items-center gap-4 z-20">
                <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
                  <span className="text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase">System_Active_v2.6</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
                {profileImages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 md:h-1.5 transition-all duration-500 rounded-full ${i === imgIndex ? 'w-8 md:w-12 bg-blue-500' : 'w-2 md:w-4 bg-white/20'}`}
                  />
                ))}
              </div>
            </div>

            <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:left-12 z-30 bg-blue-600 p-3 md:p-6 rounded-xl md:rounded-2xl shadow-xl transition-transform active:scale-90 md:group-hover:-translate-y-4 md:group-hover:rotate-6">
              <Terminal size={20} className="text-white md:w-8 md:h-8" />
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="w-full max-w-[1200px] z-10 mt-6 md:mt-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-4 md:mb-6 text-blue-500 font-bold text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase">
                  <span className="w-6 md:w-8 h-[1px] bg-blue-500" /> Based in Jharkhand
                </div>
                <h1
                  className={`text-5xl sm:text-7xl md:text-9xl lg:text-[150px] xl:text-[180px] leading-[0.8] mb-6 transition-all duration-1000 tracking-tighter font-black ${fonts[fontIndex].color}`}
                  style={{ fontFamily: fonts[fontIndex].family }}
                >
                  Kundan <br className="hidden md:block" />
                  <span className="text-white md:mix-blend-difference">Kumar</span>
                </h1>
              </div>

              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left md:pb-12">
                <div className="relative group max-w-xl mb-10">
                  <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-transparent hidden md:block rounded-full" />
                  <p className="text-slate-400 text-lg md:text-2xl font-light leading-relaxed md:pl-8 transition-colors group-hover:text-slate-300 italic">
                    <span className="opacity-80">"Pain builds power.</span>{' '}
                    <span className="text-white font-semibold">Focus creates future."</span>{' '}
                    <span className="block mt-2 text-sm tracking-[0.3em] uppercase font-bold text-blue-500/80 not-italic">
                      You are the plan
                    </span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                  <button
                    onClick={() => navigate('/contactme')}
                    className="group relative overflow-hidden px-8 py-5 bg-blue-600 rounded-xl transition-all active:scale-95 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] border border-blue-500/20"
                  >
                    <div className="relative z-10 flex items-center gap-3 text-white">
                      <span className="text-[11px] font-black uppercase tracking-[0.2em]">CONTACT ME </span>
                      <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  </button>

                  <div className="flex items-center gap-4 bg-slate-900/40 backdrop-blur-md border border-white/5 p-2 pr-6 rounded-2xl">
                    <div className="flex -space-x-2 ml-2">
                      {['W', 'E', 'L', 'C', 'O', 'M', 'E'].map((l, i) => (
                        <div key={i} className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-bold text-blue-400 shadow-xl ring-2 ring-slate-950">
                          {l}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Status</span>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase animate-pulse">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="relative z-10 py-12 px-6 md:px-12 max-w-[1200px] mx-auto border-t border-white/5">
        <div className="mb-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
            Core <span className="text-blue-600 font-serif">Principles</span>
          </h2>
        </div>
        <div className="flex flex-col gap-10 md:gap-14">
          {quotes.map((quote, index) => (
            <div key={index} className={`flex w-full ${index % 2 !== 0 ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl w-full ${index % 2 !== 0 ? 'text-right' : 'text-left'}`}>
                <p 
                  className={`text-slate-300 text-lg md:text-xl font-medium italic py-1 border-blue-600 ${index % 2 === 0 ? 'border-l-2 pl-5' : 'border-r-2 pr-5'}`} 
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  "{quote.text}"
                </p>
                <div className={`mt-3 flex items-center gap-3 ${index % 2 !== 0 ? 'flex-row-reverse' : 'pl-5'}`}>
                  <div className="h-[1px] w-6 bg-blue-600/40" />
                  <span className="text-[10px] font-bold tracking-[0.3em] text-blue-500 uppercase">{quote.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POST SHOWCASE SECTION */}
      <section className="relative z-10 pt-16 pb-6 px-4 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-white">
              WORK <span className="text-blue-600">Insights</span>
            </h2>
          </div>
          <div className="w-full md:w-auto glass-header p-1.5 rounded-2xl border border-blue-500/10">
            <div className="flex gap-2 overflow-x-auto no-scrollbar px-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="h-[40vh] flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-5">
            {filteredPosts.map((post, index) => (
              <div key={post._id} className="group relative bg-white/[0.01] border border-white/5 rounded-[2rem] p-3 md:p-4 hover:border-blue-500/30 transition-all duration-500">
                <PublicPost post={post} index={index} isHomePage={true} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-16 px-12 border-t border-white/5 bg-[#010409]">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-black uppercase italic tracking-widest text-blue-500">Kundan Kumar</h2>
            <p className="text-slate-500 text-[10px] mt-2 font-medium uppercase tracking-tighter">"Be educated, be agitated, and be organized."</p>
          </div>
          <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.5em]">© 2026 ARCHITECT CORE</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;