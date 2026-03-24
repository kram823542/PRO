// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { Eye, Maximize2, ArrowLeft, MapPin, X, ChevronRight, Info, Calendar, Clock, AlignLeft } from "lucide-react";
// import { postAPI } from '../services/api';
// import { format } from 'date-fns'; 

// const PublicPost = ({ post: propPost, isHomePage = false }) => {
//   const { id } = useParams();
//   const [post, setPost] = useState(propPost || null);
//   const [loading, setLoading] = useState(!propPost);
//   const [selectedImgIndex, setSelectedImgIndex] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showInCardDetail, setShowInCardDetail] = useState(false); 
  
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     if (id && !propPost) fetchPost();
//   }, [id, propPost]);

//   const fetchPost = async () => {
//     try {
//       setLoading(true);
//       const response = await postAPI.getPostById(id);
//       setPost(response.data.data || response.data);
//     } catch (error) { 
//       console.error('Error:', error); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   const handleScroll = (e) => {
//     const { scrollLeft, offsetWidth } = e.target;
//     if (offsetWidth > 0) {
//       const index = Math.round(scrollLeft / offsetWidth);
//       if (index !== currentIndex) setCurrentIndex(index);
//     }
//   };

//   if (loading && !isHomePage) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-blue-500 font-black animate-pulse uppercase tracking-widest">Syncing_Archives...</div>;
//   if (!post) return null;

//   const postDate = post.createdAt ? new Date(post.createdAt) : new Date();
//   const displayDate = format(postDate, 'dd MMM yyyy'); 
//   const displayTime = format(postDate, 'hh:mm a');    

//   return (
//     <div className={`relative w-full h-full ${isHomePage ? '' : 'min-h-screen bg-[#020617] flex items-center justify-center p-4'}`}>
      
//       {/* 1. LIGHTBOX */}
//       {selectedImgIndex !== null && (
//         <div className="fixed inset-0 z-[5000] bg-black flex flex-col animate-in fade-in duration-300">
//           <div className="absolute top-0 inset-x-0 z-[5100] p-4 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent">
//             <button onClick={() => setSelectedImgIndex(null)} className="flex items-center gap-2 p-2 px-4 bg-blue-600 text-white rounded-full font-black text-[10px] uppercase shadow-lg">
//               <ArrowLeft size={20} /> Close
//             </button>
//           </div>
//           <div className="flex-1 flex items-center justify-center p-4">
//              <img src={post.teamPhotos[selectedImgIndex].url} alt="zoom" className="max-w-full max-h-screen object-contain shadow-2xl" />
//           </div>
//         </div>
//       )}

//       {/* 2. REELS CARD VIEW */}
//       <div className={`relative w-full overflow-hidden bg-[#111] border border-blue-600/20 transition-all duration-500 shadow-xl
//         ${isHomePage ? 'rounded-[1.5rem] aspect-[9/16]' : 'max-w-[380px] w-full aspect-[9/16] rounded-[1.5rem]'}`}>
        
//         <button 
//           onClick={() => setShowInCardDetail(!showInCardDetail)}
//           className={`absolute top-6 right-4 z-[40] p-2 rounded-full transition-all duration-300 shadow-lg ${showInCardDetail ? 'bg-blue-600 text-white' : 'bg-white/10 backdrop-blur-md text-white border border-white/20'}`}
//         >
//           {showInCardDetail ? <X size={18} strokeWidth={3} /> : <Info size={18} strokeWidth={3} />}
//         </button>

//         {post.teamPhotos?.length > 1 && (
//           <div className="absolute top-5 inset-x-0 z-30 flex justify-center gap-1.5 px-8">
//             {post.teamPhotos.map((_, i) => (
//               <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-white/20'}`} />
//             ))}
//           </div>
//         )}

//         <div 
//           ref={scrollRef}
//           onScroll={handleScroll}
//           className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-[#111]"
//         >
//           {post.teamPhotos?.map((photo, i) => (
//             <div key={i} className="relative min-w-full h-full snap-start flex items-center justify-center bg-[#111]">
//               <img src={photo.url} alt="post" className="w-full h-full object-contain" />
//               {!showInCardDetail && (
//                 <button 
//                   onClick={() => setSelectedImgIndex(i)}
//                   className="absolute bottom-40 right-4 p-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-full shadow-2xl z-30 active:scale-90 transition-transform border border-white/10"
//                 >
//                   <Maximize2 size={16} />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* 3. IN-CARD DETAIL OVERLAY (Description added here) */}
//         <div className={`absolute inset-0 z-[35] bg-[#0f172a]/95 backdrop-blur-md transition-all duration-500 ease-in-out p-8 flex flex-col justify-center
//           ${showInCardDetail ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          
//           <div className="space-y-4 overflow-y-auto max-h-full py-4 scrollbar-hide">
//             <div className="inline-block px-3 py-1 bg-blue-600 text-white text-[9px] font-black rounded-full uppercase tracking-widest">
//               {post.category || 'Featured'}
//             </div>
            
//             <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight border-l-4 border-blue-600 pl-4">
//               {post.title}
//             </h2>

//             {/* Description Section */}
//             {post.description && (
//               <div className="pt-2">
//                 <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-3">
//                   {post.description}
//                 </p>
//               </div>
//             )}

//             <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/10">
//               <DetailRow icon={<MapPin size={14} />} label="Location" value={post.workPlaceName} />
//               <DetailRow icon={<Eye size={14} />} label="Engagement" value={`${post.views} Views`} />
              
//               <div className="flex gap-4">
//                 <DetailRow icon={<Calendar size={14} />} label="Date" value={displayDate} />
//                 <DetailRow icon={<Clock size={14} />} label="Time" value={displayTime} />
//               </div>

//               <DetailRow icon={<Calendar size={14} />} label="Credit" value={`@${post.credit}`} />
//             </div>

//             <div className="bg-blue-600/10 p-4 rounded-xl border border-blue-500/20">
//               <h3 className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Meeting Output</h3>
//               <p className="text-slate-200 text-[11px] italic font-semibold leading-relaxed">
//                 "{post.meetingOutput}"
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* 4. BOTTOM MINIMAL BAR */}
//         {!showInCardDetail && (
//           <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-20 pb-6 px-6 pointer-events-none">
//             <div className="pointer-events-auto">
//               <span className="text-blue-500 text-[9px] font-black uppercase tracking-widest block mb-1">
//                 @{post.credit} • {displayTime}
//               </span>
//               <h2 className="text-lg font-black text-white italic uppercase tracking-tighter leading-tight line-clamp-1 mb-3">{post.title}</h2>
//               <button 
//                 onClick={() => setShowInCardDetail(true)}
//                 className="flex items-center gap-2 text-[8px] font-black text-white bg-blue-600 px-3 py-2 rounded-full uppercase tracking-widest active:scale-95 transition-all shadow-lg border border-blue-400/20"
//               >
//                 Learn More <ChevronRight size={12} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <style dangerouslySetInnerHTML={{ __html: `
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}} />
//     </div>
//   );
// };

// const DetailRow = ({ icon, label, value }) => (
//   <div className="flex items-center gap-3 text-slate-300">
//     <div className="p-1.5 bg-blue-600/20 rounded-lg text-blue-500">{icon}</div>
//     <div className="flex flex-col">
//       <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{label}</span>
//       <span className="text-[10px] font-bold uppercase truncate max-w-[150px]">{value || 'N/A'}</span>
//     </div>
//   </div>
// );

// export default PublicPost;


// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { Eye, Maximize2, ArrowLeft, MapPin, X, ChevronRight, Info, Calendar, Clock, AlignLeft } from "lucide-react";
// import { postAPI } from '../services/api';
// import { format } from 'date-fns'; 

// const PublicPost = ({ post: propPost, isHomePage = false }) => {
//   const { id } = useParams();
//   const [post, setPost] = useState(propPost || null);
//   const [loading, setLoading] = useState(!propPost);
//   const [selectedImgIndex, setSelectedImgIndex] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showInCardDetail, setShowInCardDetail] = useState(false); 
  
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     if (id && !propPost) fetchPost();
//   }, [id, propPost]);

//   const fetchPost = async () => {
//     try {
//       setLoading(true);
//       const response = await postAPI.getPostById(id);
//       // API se pura data (including workingText) fetch ho raha hai
//       setPost(response.data.data || response.data);
//     } catch (error) { 
//       console.error('Error:', error); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   const handleScroll = (e) => {
//     const { scrollLeft, offsetWidth } = e.target;
//     if (offsetWidth > 0) {
//       const index = Math.round(scrollLeft / offsetWidth);
//       if (index !== currentIndex) setCurrentIndex(index);
//     }
//   };

//   if (loading && !isHomePage) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-blue-500 font-black animate-pulse uppercase tracking-widest">Syncing_Archives...</div>;
//   if (!post) return null;

//   const postDate = post.createdAt ? new Date(post.createdAt) : new Date();
//   const displayDate = format(postDate, 'dd MMM yyyy'); 
//   const displayTime = format(postDate, 'hh:mm a');    

//   return (
//     <div className={`relative w-full h-full ${isHomePage ? '' : 'min-h-screen bg-[#020617] flex items-center justify-center p-4'}`}>
      
//       {/* 1. LIGHTBOX */}
//       {selectedImgIndex !== null && (
//         <div className="fixed inset-0 z-[5000] bg-black flex flex-col animate-in fade-in duration-300">
//           <div className="absolute top-0 inset-x-0 z-[5100] p-4 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent">
//             <button onClick={() => setSelectedImgIndex(null)} className="flex items-center gap-2 p-2 px-4 bg-blue-600 text-white rounded-full font-black text-[10px] uppercase shadow-lg">
//               <ArrowLeft size={20} /> Close
//             </button>
//           </div>
//           <div className="flex-1 flex items-center justify-center p-4">
//              <img src={post.teamPhotos[selectedImgIndex].url} alt="zoom" className="max-w-full max-h-screen object-contain shadow-2xl" />
//           </div>
//         </div>
//       )}

//       {/* 2. REELS CARD VIEW */}
//       <div className={`relative w-full overflow-hidden bg-[#111] border border-blue-600/20 transition-all duration-500 shadow-xl
//         ${isHomePage ? 'rounded-[1.5rem] aspect-[9/16]' : 'max-w-[380px] w-full aspect-[9/16] rounded-[1.5rem]'}`}>
        
//         <button 
//           onClick={() => setShowInCardDetail(!showInCardDetail)}
//           className={`absolute top-6 right-4 z-[40] p-2 rounded-full transition-all duration-300 shadow-lg ${showInCardDetail ? 'bg-blue-600 text-white' : 'bg-white/10 backdrop-blur-md text-white border border-white/20'}`}
//         >
//           {showInCardDetail ? <X size={18} strokeWidth={3} /> : <Info size={18} strokeWidth={3} />}
//         </button>

//         {post.teamPhotos?.length > 1 && (
//           <div className="absolute top-5 inset-x-0 z-30 flex justify-center gap-1.5 px-8">
//             {post.teamPhotos.map((_, i) => (
//               <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-white/20'}`} />
//             ))}
//           </div>
//         )}

//         <div 
//           ref={scrollRef}
//           onScroll={handleScroll}
//           className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-[#111]"
//         >
//           {post.teamPhotos?.map((photo, i) => (
//             <div key={i} className="relative min-w-full h-full snap-start flex items-center justify-center bg-[#111]">
//               <img src={photo.url} alt="post" className="w-full h-full object-contain" />
//               {!showInCardDetail && (
//                 <button 
//                   onClick={() => setSelectedImgIndex(i)}
//                   className="absolute bottom-40 right-4 p-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-full shadow-2xl z-30 active:scale-90 transition-transform border border-white/10"
//                 >
//                   <Maximize2 size={16} />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* 3. IN-CARD DETAIL OVERLAY */}
//         <div className={`absolute inset-0 z-[35] bg-[#0f172a]/95 backdrop-blur-md transition-all duration-500 ease-in-out p-8 flex flex-col justify-center
//           ${showInCardDetail ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          
//           <div className="space-y-4 overflow-y-auto max-h-full py-4 scrollbar-hide">
//             <div className="inline-block px-3 py-1 bg-blue-600 text-white text-[9px] font-black rounded-full uppercase tracking-widest">
//               {post.category || 'Featured'}
//             </div>
            
//             <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight border-l-4 border-blue-600 pl-4">
//               {post.title}
//             </h2>

//             {/* Description Section */}
//             {post.description && (
//               <div className="pt-2">
//                 <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-3">
//                   {post.description}
//                 </p>
//               </div>
//             )}

//             {/* Metadata Rows */}
//             <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/10">
//               <DetailRow icon={<MapPin size={14} />} label="Location" value={post.workPlaceName} />
//               <DetailRow icon={<Eye size={14} />} label="Engagement" value={`${post.views} Views`} />
              
//               <div className="flex gap-4">
//                 <DetailRow icon={<Calendar size={14} />} label="Date" value={displayDate} />
//                 <DetailRow icon={<Clock size={14} />} label="Time" value={displayTime} />
//               </div>

//               <DetailRow icon={<Calendar size={14} />} label="Credit" value={`@${post.credit}`} />
//             </div>

//             {/* Working Text Section (Added) */}
//             {post.workingText && (
//               <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//                 <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
//                   <AlignLeft size={10} className="text-blue-500" /> Working Process
//                 </h3>
//                 <p className="text-slate-300 text-[11px] leading-relaxed">
//                   {post.workingText}
//                 </p>
//               </div>
//             )}

//             {/* Meeting Output Section */}
//             {post.meetingOutput && (
//               <div className="bg-blue-600/10 p-4 rounded-xl border border-blue-500/20">
//                 <h3 className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Meeting Output</h3>
//                 <p className="text-slate-200 text-[11px] italic font-semibold leading-relaxed">
//                   "{post.meetingOutput}"
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 4. BOTTOM MINIMAL BAR */}
//         {!showInCardDetail && (
//           <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-20 pb-6 px-6 pointer-events-none">
//             <div className="pointer-events-auto">
//               <span className="text-blue-500 text-[9px] font-black uppercase tracking-widest block mb-1">
//                 @{post.credit} • {displayTime}
//               </span>
//               <h2 className="text-lg font-black text-white italic uppercase tracking-tighter leading-tight line-clamp-1 mb-3">{post.title}</h2>
//               <button 
//                 onClick={() => setShowInCardDetail(true)}
//                 className="flex items-center gap-2 text-[8px] font-black text-white bg-blue-600 px-3 py-2 rounded-full uppercase tracking-widest active:scale-95 transition-all shadow-lg border border-blue-400/20"
//               >
//                 Learn More <ChevronRight size={12} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <style dangerouslySetInnerHTML={{ __html: `
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}} />
//     </div>
//   );
// };

// const DetailRow = ({ icon, label, value }) => (
//   <div className="flex items-center gap-3 text-slate-300">
//     <div className="p-1.5 bg-blue-600/20 rounded-lg text-blue-500">{icon}</div>
//     <div className="flex flex-col">
//       <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{label}</span>
//       <span className="text-[10px] font-bold uppercase truncate max-w-[150px]">{value || 'N/A'}</span>
//     </div>
//   </div>
// );

// export default PublicPost;






// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { Eye, Maximize2, ArrowLeft, MapPin, X, ChevronRight, Info, Calendar, Clock, AlignLeft } from "lucide-react";
// import { postAPI } from '../services/api';
// import { format } from 'date-fns'; 

// const PublicPost = ({ post: propPost, isHomePage = false }) => {
//   const { id } = useParams();
//   const [post, setPost] = useState(propPost || null);
//   const [loading, setLoading] = useState(!propPost);
//   const [selectedImgIndex, setSelectedImgIndex] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showInCardDetail, setShowInCardDetail] = useState(false); 
  
//   const scrollRef = useRef(null);

//   // Profile Logo URL
//   const profileLogo = "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png";

//   useEffect(() => {
//     if (id && !propPost) fetchPost();
//   }, [id, propPost]);

//   const fetchPost = async () => {
//     try {
//       setLoading(true);
//       const response = await postAPI.getPostById(id);
//       setPost(response.data.data || response.data);
//     } catch (error) { 
//       console.error('Error:', error); 
//     } finally { 
//       setLoading(false); 
//     }
//   };

//   const handleScroll = (e) => {
//     const { scrollLeft, offsetWidth } = e.target;
//     if (offsetWidth > 0) {
//       const index = Math.round(scrollLeft / offsetWidth);
//       if (index !== currentIndex) setCurrentIndex(index);
//     }
//   };

//   if (loading && !isHomePage) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-blue-500 font-black animate-pulse uppercase tracking-widest">Syncing_Archives...</div>;
//   if (!post) return null;

//   const postDate = post.createdAt ? new Date(post.createdAt) : new Date();
//   const displayDate = format(postDate, 'dd MMM yyyy'); 
//   const displayTime = format(postDate, 'hh:mm a');    

//   return (
//     <div className={`relative w-full h-full ${isHomePage ? '' : 'min-h-screen bg-[#020617] flex items-center justify-center p-4'}`}>
      
//       {/* 1. LIGHTBOX */}
//       {selectedImgIndex !== null && (
//         <div className="fixed inset-0 z-[5000] bg-black flex flex-col animate-in fade-in duration-300">
//           <div className="absolute top-0 inset-x-0 z-[5100] p-4 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent">
//             <button onClick={() => setSelectedImgIndex(null)} className="flex items-center gap-2 p-2 px-4 bg-blue-600 text-white rounded-full font-black text-[10px] uppercase shadow-lg">
//               <ArrowLeft size={20} /> Close
//             </button>
//           </div>
//           <div className="flex-1 flex items-center justify-center p-4">
//              <img src={post.teamPhotos[selectedImgIndex].url} alt="zoom" className="max-w-full max-h-screen object-contain shadow-2xl" />
//           </div>
//         </div>
//       )}

//       {/* 2. REELS CARD VIEW */}
//       <div className={`relative w-full overflow-hidden bg-[#111] border border-blue-600/20 transition-all duration-500 shadow-xl
//         ${isHomePage ? 'rounded-[1.5rem] aspect-[9/16]' : 'max-w-[380px] w-full aspect-[9/16] rounded-[1.5rem]'}`}>
        
//         <button 
//           onClick={() => setShowInCardDetail(!showInCardDetail)}
//           className={`absolute top-6 right-4 z-[40] p-2 rounded-full transition-all duration-300 shadow-lg ${showInCardDetail ? 'bg-blue-600 text-white' : 'bg-white/10 backdrop-blur-md text-white border border-white/20'}`}
//         >
//           {showInCardDetail ? <X size={18} strokeWidth={3} /> : <Info size={18} strokeWidth={3} />}
//         </button>

//         {post.teamPhotos?.length > 1 && (
//           <div className="absolute top-5 inset-x-0 z-30 flex justify-center gap-1.5 px-8">
//             {post.teamPhotos.map((_, i) => (
//               <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-white/20'}`} />
//             ))}
//           </div>
//         )}

//         <div 
//           ref={scrollRef}
//           onScroll={handleScroll}
//           className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-[#111]"
//         >
//           {post.teamPhotos?.map((photo, i) => (
//             <div key={i} className="relative min-w-full h-full snap-start flex items-center justify-center bg-[#111]">
//               <img src={photo.url} alt="post" className="w-full h-full object-contain" />
//               {!showInCardDetail && (
//                 <button 
//                   onClick={() => setSelectedImgIndex(i)}
//                   className="absolute bottom-40 right-4 p-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-full shadow-2xl z-30 active:scale-90 transition-transform border border-white/10"
//                 >
//                   <Maximize2 size={16} />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* 3. IN-CARD DETAIL OVERLAY */}
//         <div className={`absolute inset-0 z-[35] bg-[#0f172a]/95 backdrop-blur-md transition-all duration-500 ease-in-out p-8 flex flex-col justify-center
//           ${showInCardDetail ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          
//           <div className="space-y-4 overflow-y-auto max-h-full py-4 scrollbar-hide">
//             <div className="inline-block px-3 py-1 bg-blue-600 text-white text-[9px] font-black rounded-full uppercase tracking-widest">
//               {post.category || 'Featured'}
//             </div>
            
//             <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight border-l-4 border-blue-600 pl-4">
//               {post.title}
//             </h2>

//             {post.description && (
//               <div className="pt-2">
//                 <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-3">
//                   {post.description}
//                 </p>
//               </div>
//             )}

//             <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/10">
//               <DetailRow icon={<MapPin size={14} />} label="Location" value={post.workPlaceName} />
//               <DetailRow icon={<Eye size={14} />} label="Engagement" value={`${post.views} Views`} />
              
//               <div className="flex gap-4">
//                 <DetailRow icon={<Calendar size={14} />} label="Date" value={displayDate} />
//                 <DetailRow icon={<Clock size={14} />} label="Time" value={displayTime} />
//               </div>

//               <DetailRow icon={<Calendar size={14} />} label="Credit" value={`@${post.credit}`} />
//             </div>

//             {post.workingText && (
//               <div className="bg-white/5 p-4 rounded-xl border border-white/10">
//                 <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
//                   <AlignLeft size={10} className="text-blue-500" /> Working Process
//                 </h3>
//                 <p className="text-slate-300 text-[11px] leading-relaxed">
//                   {post.workingText}
//                 </p>
//               </div>
//             )}

//             {post.meetingOutput && (
//               <div className="bg-blue-600/10 p-4 rounded-xl border border-blue-500/20">
//                 <h3 className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Meeting Output</h3>
//                 <p className="text-slate-200 text-[11px] italic font-semibold leading-relaxed">
//                   "{post.meetingOutput}"
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 4. BOTTOM MINIMAL BAR (Updated with Logo) */}
//         {!showInCardDetail && (
//           <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-20 pb-6 px-6 pointer-events-none">
//             <div className="pointer-events-auto">
//               <div className="flex items-center gap-2 mb-2">
//                 {/* Profile Image Logo */}
//                 <div className="w-6 h-6 rounded-full border border-blue-500/50 overflow-hidden bg-slate-800">
//                   <img src={profileLogo} alt="Profile" className="w-full h-full object-cover" />
//                 </div>
//                 <span className="text-blue-500 text-[9px] font-black uppercase tracking-widest block">
//                   @{post.credit} • {displayTime}
//                 </span>
//               </div>
              
//               <h2 className="text-lg font-black text-white italic uppercase tracking-tighter leading-tight line-clamp-1 mb-3">
//                 {post.title}
//               </h2>
              
//               <button 
//                 onClick={() => setShowInCardDetail(true)}
//                 className="flex items-center gap-2 text-[8px] font-black text-white bg-blue-600 px-3 py-2 rounded-full uppercase tracking-widest active:scale-95 transition-all shadow-lg border border-blue-400/20"
//               >
//                 Learn More <ChevronRight size={12} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <style dangerouslySetInnerHTML={{ __html: `
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}} />
//     </div>
//   );
// };

// const DetailRow = ({ icon, label, value }) => (
//   <div className="flex items-center gap-3 text-slate-300">
//     <div className="p-1.5 bg-blue-600/20 rounded-lg text-blue-500">{icon}</div>
//     <div className="flex flex-col">
//       <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{label}</span>
//       <span className="text-[10px] font-bold uppercase truncate max-w-[150px]">{value || 'N/A'}</span>
//     </div>
//   </div>
// );

// export default PublicPost;



import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Maximize2, ArrowLeft, MapPin, X, ChevronRight, Info, Calendar, Clock, AlignLeft, Share2 } from "lucide-react";
import { postAPI } from '../services/api';
import { format } from 'date-fns'; 

const PublicPost = ({ post: propPost, isHomePage = false }) => {
  const { id } = useParams();
  const [post, setPost] = useState(propPost || null);
  const [loading, setLoading] = useState(!propPost);
  const [selectedImgIndex, setSelectedImgIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInCardDetail, setShowInCardDetail] = useState(false); 
  const [isExpanded, setIsExpanded] = useState(false); 
  
  const scrollRef = useRef(null);
  const profileLogo = "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png";

  useEffect(() => {
    if (id && !propPost) fetchPost();
  }, [id, propPost]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await postAPI.getPostById(id);
      setPost(response.data.data || response.data);
    } catch (error) { 
      console.error('Error:', error); 
    } finally { 
      setLoading(false); 
    }
  };

  // Share Functionality
  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.description || `Check out this post by @${post.credit}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  const handleScroll = (e) => {
    const { scrollLeft, offsetWidth } = e.target;
    if (offsetWidth > 0) {
      const index = Math.round(scrollLeft / offsetWidth);
      if (index !== currentIndex) setCurrentIndex(index);
    }
  };

  if (loading && !isHomePage) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-blue-500 font-black animate-pulse uppercase tracking-widest">Syncing_Archives...</div>;
  if (!post) return null;

  const postDate = post.createdAt ? new Date(post.createdAt) : new Date();
  const displayDate = format(postDate, 'dd MMM yyyy'); 
  const displayTime = format(postDate, 'hh:mm a');    

  return (
    <div className={`relative w-full h-full ${isHomePage ? '' : 'min-h-screen bg-[#020617] flex items-center justify-center p-4'}`}>
      
      {/* 1. LIGHTBOX */}
      {selectedImgIndex !== null && (
        <div className="fixed inset-0 z-[5000] bg-black flex flex-col animate-in fade-in duration-300">
          <div className="absolute top-0 inset-x-0 z-[5100] p-4 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent">
            <button onClick={() => setSelectedImgIndex(null)} className="flex items-center gap-2 p-2 px-4 bg-blue-600 text-white rounded-full font-black text-[10px] uppercase shadow-lg">
              <ArrowLeft size={20} /> Close
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
             <img src={post.teamPhotos[selectedImgIndex].url} alt="zoom" className="max-w-full max-h-screen object-contain shadow-2xl" />
          </div>
        </div>
      )}

      {/* 2. REELS CARD VIEW */}
      <div className={`relative w-full overflow-hidden bg-[#111] border border-blue-600/20 transition-all duration-500 shadow-xl
        ${isHomePage ? 'rounded-[1.5rem] aspect-[9/16]' : 'max-w-[380px] w-full aspect-[9/16] rounded-[1.5rem]'}`}>
        
        {/* Top Icons Wrapper */}
        <div className="absolute top-6 right-4 z-[40] flex flex-col gap-3">
          <button 
            onClick={() => setShowInCardDetail(!showInCardDetail)}
            className={`p-2 rounded-full transition-all duration-300 shadow-lg ${showInCardDetail ? 'bg-blue-600 text-white' : 'bg-white/10 backdrop-blur-md text-white border border-white/20'}`}
          >
            {showInCardDetail ? <X size={18} strokeWidth={3} /> : <Info size={18} strokeWidth={3} />}
          </button>

          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg active:scale-90 transition-all"
          >
            <Share2 size={18} strokeWidth={3} />
          </button>
        </div>

        {post.teamPhotos?.length > 1 && (
          <div className="absolute top-5 inset-x-0 z-30 flex justify-center gap-1.5 px-8">
            {post.teamPhotos.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-white/20'}`} />
            ))}
          </div>
        )}

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-[#111]"
        >
          {post.teamPhotos?.map((photo, i) => (
            <div key={i} className="relative min-w-full h-full snap-start flex items-center justify-center bg-[#111]">
              <img src={photo.url} alt="post" className="w-full h-full object-contain" />
              {!showInCardDetail && (
                <button 
                  onClick={() => setSelectedImgIndex(i)}
                  className="absolute bottom-40 right-4 p-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-full shadow-2xl z-30 active:scale-90 transition-transform border border-white/10"
                >
                  <Maximize2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* 3. IN-CARD DETAIL OVERLAY */}
        <div className={`absolute inset-0 z-[35] bg-[#0f172a]/95 backdrop-blur-md transition-all duration-500 ease-in-out p-8 flex flex-col justify-center
          ${showInCardDetail ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
          
          <div className="space-y-4 overflow-y-auto max-h-full py-4 scrollbar-hide">
            <div className="inline-block px-3 py-1 bg-blue-600 text-white text-[9px] font-black rounded-full uppercase tracking-widest">
              {post.category || 'Featured'}
            </div>
            
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight border-l-4 border-blue-600 pl-4">
              {post.title}
            </h2>

            {post.description && (
              <div className="pt-2">
                <p className={`text-slate-400 text-[10px] leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                  {post.description}
                </p>
                {post.description.length > 100 && (
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-500 text-[9px] font-black uppercase mt-1 hover:underline pointer-events-auto"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/10">
              <DetailRow icon={<MapPin size={14} />} label="Location" value={post.workPlaceName} />
              
              <div className="flex gap-4">
                <DetailRow icon={<Calendar size={14} />} label="Date" value={displayDate} />
                <DetailRow icon={<Clock size={14} />} label="Time" value={displayTime} />
              </div>

              <DetailRow icon={<Calendar size={14} />} label="Credit" value={`@${post.credit}`} />
            </div>

            {post.workingText && (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
                  <AlignLeft size={10} className="text-blue-500" /> Working Process
                </h3>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {post.workingText}
                </p>
              </div>
            )}

            {post.meetingOutput && (
              <div className="bg-blue-600/10 p-4 rounded-xl border border-blue-500/20">
                <h3 className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Meeting Output</h3>
                <p className="text-slate-200 text-[11px] italic font-semibold leading-relaxed">
                  "{post.meetingOutput}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 4. BOTTOM MINIMAL BAR */}
        {!showInCardDetail && (
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-20 pb-6 px-6 pointer-events-none">
            <div className="pointer-events-auto">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full border border-blue-500/50 overflow-hidden bg-slate-800">
                  <img src={profileLogo} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="text-blue-500 text-[9px] font-black uppercase tracking-widest block">
                  @{post.credit} • {displayTime}
                </span>
              </div>
              
              <h2 className="text-lg font-black text-white italic uppercase tracking-tighter leading-tight line-clamp-1 mb-3">
                {post.title}
              </h2>
              
              <button 
                onClick={() => setShowInCardDetail(true)}
                className="flex items-center gap-2 text-[8px] font-black text-white bg-blue-600 px-3 py-2 rounded-full uppercase tracking-widest active:scale-95 transition-all shadow-lg border border-blue-400/20"
              >
                Learn More <ChevronRight size={12} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 text-slate-300">
    <div className="p-1.5 bg-blue-600/20 rounded-lg text-blue-500">{icon}</div>
    <div className="flex flex-col">
      <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{label}</span>
      <span className="text-[10px] font-bold uppercase truncate max-w-[150px]">{value || 'N/A'}</span>
    </div>
  </div>
);

export default PublicPost;