// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { TrashIcon, EyeIcon, PencilSquareIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import toast from 'react-hot-toast';
// import { format, isSameDay } from 'date-fns';
// import { postAPI } from '../services/api';
// import { Loader2, Calendar, FileText, Clock, Maximize2 } from 'lucide-react';

// const Posts = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);
//   const [selectedImg, setSelectedImg] = useState(null); // Image Zoom State

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await postAPI.getPosts({ limit: 50 });
//       const postsData = response.data.data || response.data;
//       const sorted = (Array.isArray(postsData) ? postsData : []).sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setPosts(sorted);
//     } catch (error) {
//       toast.error('Sync Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Permanent delete?')) return;
//     setDeletingId(id);
//     try {
//       await postAPI.deletePost(id);
//       setPosts(posts.filter(p => p._id !== id));
//       toast.success('Deleted');
//     } catch (error) {
//       toast.error('Failed');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-screen bg-white md:ml-16 flex flex-col justify-center items-center gap-4">
//         <Loader2 className="animate-spin text-black" size={32} />
//         <span className="text-[10px] font-black uppercase tracking-[0.3em]">Temporal_Syncing</span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FAFAFA] md:ml-16 font-sans text-black pb-32">
      
//       {/* --- Image Zoom Overlay (Modal) --- */}
//       {selectedImg && (
//         <div 
//           className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 transition-all"
//           onClick={() => setSelectedImg(null)}
//         >
//           <button className="absolute top-6 right-6 text-white hover:rotate-90 transition-transform">
//             <XMarkIcon className="h-10 w-10" />
//           </button>
//           <img 
//             src={selectedImg} 
//             alt="Preview" 
//             className="max-w-full max-h-full rounded-lg shadow-2xl animate-in zoom-in duration-300" 
//           />
//         </div>
//       )}

//       <div className="p-4 md:p-10 max-w-5xl mx-auto">
        
//         {/* Header */}
//         <div className="flex justify-between items-end mb-16 md:mb-24 border-b-2 border-black pb-8">
//           <div>
//             <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">Archives</h1>
//             <p className="text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-[0.5em] mt-3">Timeline_Directory_v3</p>
//           </div>
//           <Link
//             to="/admin/create-post"
//             className="h-14 w-14 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl"
//           >
//             <PlusIcon className="h-7 w-7 stroke-[2.5px]" />
//           </Link>
//         </div>

//         {/* Tree Layout */}
//         <div className="relative">
//           {/* Main Vertical Trunk */}
//           <div className="absolute left-[19px] md:left-[31px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-black/20 via-black/5 to-transparent" />

//           <div className="space-y-16 md:space-y-24">
//             {posts.map((post, index) => {
//               const postDate = new Date(post.createdAt);
//               const showDateLabel = index === 0 || !isSameDay(postDate, new Date(posts[index-1].createdAt));

//               return (
//                 <div key={post._id} className="relative">
                  
//                   {/* Date & Day Header */}
//                   {showDateLabel && (
//                     <div className="flex items-center gap-4 md:gap-8 mb-12 -ml-1 md:-ml-2">
//                       <div className="h-12 w-12 md:h-20 md:w-20 bg-black rounded-2xl md:rounded-[2rem] flex flex-col items-center justify-center z-10 shadow-xl border-[6px] border-[#FAFAFA]">
//                         <span className="text-[8px] md:text-[10px] font-black text-white/50 uppercase leading-none mb-1">
//                           {format(postDate, 'EEE')}
//                         </span>
//                         <Calendar className="text-white h-5 w-5 md:h-7 md:w-7" />
//                       </div>
//                       <div className="flex flex-col">
//                         <span className="text-lg md:text-2xl font-black uppercase tracking-tighter text-black leading-none">
//                           {format(postDate, 'MMMM dd, yyyy')}
//                         </span>
//                         <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
//                           Entries for {format(postDate, 'EEEE')}
//                         </span>
//                       </div>
//                     </div>
//                   )}

//                   {/* Post Node */}
//                   <div className="relative pl-12 md:pl-28 group">
                    
//                     {/* Time Indicator on Line */}
//                     <div className="absolute hidden md:flex flex-col items-center -left-6 top-1/2 -translate-y-1/2 z-20">
//                       <div className="bg-white border-2 border-black text-[10px] font-black px-2 py-1 rounded shadow-sm group-hover:bg-black group-hover:text-white transition-all">
//                         {format(postDate, 'HH:mm')}
//                       </div>
//                     </div>

//                     {/* Horizontal Branch Connector */}
//                     <div className="absolute left-[19px] md:left-8 top-1/2 -translate-y-1/2 w-8 md:w-20 h-[2px] bg-black/10 group-hover:bg-black transition-all" />
//                     <div className="absolute left-[16px] md:left-[28px] top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-white border-2 border-gray-300 z-10 group-hover:border-black group-hover:scale-125 transition-all" />

//                     {/* Card Container */}
//                     <div className="bg-white border border-gray-100 rounded-[2rem] md:rounded-[3rem] p-5 md:p-8 flex flex-col lg:flex-row items-center gap-6 md:gap-10 shadow-sm hover:shadow-3xl hover:-translate-y-2 transition-all duration-700 overflow-hidden relative">
                      
//                       {/* Image Scroller with Zoom Feature */}
//                       <div className="relative w-full lg:w-48 shrink-0">
//                         <div className="flex overflow-x-auto gap-3 no-scrollbar scroll-smooth p-1 snap-x">
//                           {post.teamPhotos && post.teamPhotos.length > 0 ? (
//                             post.teamPhotos.map((img, i) => (
//                               <div 
//                                 key={i} 
//                                 onClick={() => setSelectedImg(img.url)}
//                                 className="h-28 w-28 md:h-40 md:w-40 shrink-0 rounded-[1.5rem] md:rounded-[2.2rem] overflow-hidden border border-gray-100 snap-center shadow-md relative group/img cursor-zoom-in"
//                               >
//                                 <img src={img.url} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
//                                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
//                                   <Maximize2 className="text-white h-6 w-6" />
//                                 </div>
//                               </div>
//                             ))
//                           ) : (
//                             <div className="h-28 w-28 md:h-40 md:w-40 flex items-center justify-center bg-gray-50 rounded-[2.2rem] text-gray-200 border-2 border-dashed border-gray-100">
//                               <FileText size={32} />
//                             </div>
//                           )}
//                         </div>
//                         {post.teamPhotos?.length > 1 && (
//                           <p className="text-[8px] font-black text-gray-300 uppercase mt-2 text-center tracking-widest animate-pulse">Swipe to view more • {post.teamPhotos.length}</p>
//                         )}
//                       </div>

//                       {/* Content Section */}
//                       <div className="flex-1 min-w-0 w-full text-center lg:text-left">
//                         <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
//                           <span className="text-[9px] font-black uppercase bg-black text-white px-3 py-1 rounded-full tracking-tighter">
//                             {post.category}
//                           </span>
//                         </div>
//                         <h3 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight mb-4 italic tracking-tighter">
//                           {post.title}
//                         </h3>
                        
//                         <div className="flex items-center justify-center lg:justify-start gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
//                           <div className="flex items-center gap-2">
//                             <EyeIcon className="h-4 w-4 text-black" />
//                             <span>{post.views || 0}</span>
//                           </div>
//                           <div className="flex items-center gap-2 border-l border-gray-100 pl-6">
//                             <Clock className="h-4 w-4 text-black" />
//                             <span>{format(postDate, 'hh:mm a')}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="flex flex-row lg:flex-col gap-3 border-t lg:border-t-0 lg:border-l border-gray-50 pt-6 lg:pt-0 lg:pl-10 w-full lg:w-auto justify-center">
//                         <Link 
//                           to={`/admin/edit/${post._id}`} 
//                           className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full bg-white border border-gray-100 hover:bg-black hover:text-white transition-all shadow-lg active:scale-90"
//                         >
//                           <PencilSquareIcon className="h-5 w-5 md:h-6 md:w-6" />
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(post._id)}
//                           disabled={deletingId === post._id}
//                           className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-300 hover:text-red-500 hover:border-red-500 transition-all shadow-lg active:scale-90"
//                         >
//                           {deletingId === post._id ? (
//                             <Loader2 className="animate-spin h-6 w-6" />
//                           ) : (
//                             <TrashIcon className="h-5 w-5 md:h-6 md:w-6" />
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
      
//       <style>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//         @keyframes zoom-in {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         .animate-in { animation: zoom-in 0.3s ease-out; }
//       `}</style>
//     </div>
//   );
// };

// export default Posts;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon, EyeIcon, PencilSquareIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { format, isSameDay } from 'date-fns';
import { postAPI } from '../services/api';
import { Loader2, Calendar, FileText, Clock, Maximize2 } from 'lucide-react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postAPI.getPosts({ limit: 50 });
      const postsData = response.data.data || response.data;
      const sorted = (Array.isArray(postsData) ? postsData : []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sorted);
    } catch (error) {
      toast.error('Sync Error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanent delete?')) return;
    setDeletingId(id);
    try {
      await postAPI.deletePost(id);
      setPosts(posts.filter(p => p._id !== id));
      toast.success('Deleted');
    } catch (error) {
      toast.error('Failed');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-red-950 md:ml-16 flex flex-col justify-center items-center gap-4">
        <Loader2 className="animate-spin text-red-500" size={40} />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500/60 animate-pulse">Temporal_Syncing</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-950 md:ml-16 font-sans text-red-50 pb-32 selection:bg-red-500/30">
      
      {/* --- Image Zoom Overlay --- */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-red-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 transition-all"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-6 right-6 text-red-500 hover:text-white hover:rotate-90 transition-all">
            <XMarkIcon className="h-12 w-12" />
          </button>
          <img 
            src={selectedImg} 
            alt="Preview" 
            className="max-w-full max-h-full rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.2)] border border-red-500/20 animate-in zoom-in duration-300" 
          />
        </div>
      )}

      <div className="p-4 md:p-10 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-20 md:mb-28 border-b-2 border-red-900 pb-10">
          <div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none text-white">Archives</h1>
            <p className="text-[10px] md:text-[12px] font-black text-red-500 uppercase tracking-[0.6em] mt-4 flex items-center gap-2">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-ping" />
              Timeline_Directory_v3
            </p>
          </div>
          <Link
            to="/admin/create-post"
            className="h-16 w-16 bg-red-600 text-red-950 rounded-[1.5rem] flex items-center justify-center hover:bg-red-500 hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]"
          >
            <PlusIcon className="h-8 w-8 stroke-[3px]" />
          </Link>
        </div>

        {/* Tree Layout */}
        <div className="relative">
          {/* Main Vertical Trunk */}
          <div className="absolute left-[19px] md:left-[39px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-600 via-red-900/40 to-transparent" />

          <div className="space-y-20 md:space-y-32">
            {posts.map((post, index) => {
              const postDate = new Date(post.createdAt);
              const showDateLabel = index === 0 || !isSameDay(postDate, new Date(posts[index-1].createdAt));

              return (
                <div key={post._id} className="relative">
                  
                  {/* Date & Day Header */}
                  {showDateLabel && (
                    <div className="flex items-center gap-5 md:gap-10 mb-16 -ml-1 md:-ml-2">
                      <div className="h-14 w-14 md:h-24 md:w-24 bg-red-600 rounded-2xl md:rounded-[2.5rem] flex flex-col items-center justify-center z-10 shadow-2xl border-[6px] border-red-950">
                        <span className="text-[9px] md:text-[11px] font-black text-red-950/60 uppercase leading-none mb-1">
                          {format(postDate, 'EEE')}
                        </span>
                        <Calendar className="text-red-950 h-6 w-6 md:h-9 md:w-9 stroke-[2.5px]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white leading-none">
                          {format(postDate, 'MMMM dd, yyyy')}
                        </span>
                        <span className="text-[10px] font-bold text-red-500/50 uppercase tracking-[0.3em] mt-2">
                          Digital Entry Log_{format(postDate, 'yy')}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Post Node */}
                  <div className="relative pl-14 md:pl-36 group">
                    
                    {/* Time Indicator on Line */}
                    <div className="absolute hidden md:flex flex-col items-center -left-6 top-1/2 -translate-y-1/2 z-20">
                      <div className="bg-red-900/80 backdrop-blur-sm border border-red-500/30 text-red-100 text-[10px] font-black px-3 py-1.5 rounded-lg shadow-xl group-hover:bg-red-600 group-hover:text-red-950 transition-all uppercase">
                        {format(postDate, 'HH:mm')}
                      </div>
                    </div>

                    {/* Horizontal Branch Connector */}
                    <div className="absolute left-[19px] md:left-10 top-1/2 -translate-y-1/2 w-10 md:w-24 h-[2px] bg-red-900 group-hover:bg-red-600 transition-all" />
                    <div className="absolute left-[15px] md:left-[35px] top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-red-950 border-2 border-red-900 z-10 group-hover:border-red-500 group-hover:scale-150 transition-all shadow-[0_0_10px_rgba(220,38,38,0.4)]" />

                    {/* Card Container */}
                    <div className="bg-red-900/10 border border-red-500/5 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-10 flex flex-col lg:flex-row items-center gap-8 md:gap-14 shadow-2xl hover:bg-red-900/20 hover:-translate-y-3 transition-all duration-700 overflow-hidden relative backdrop-blur-sm">
                      
                      {/* Image Scroller */}
                      <div className="relative w-full lg:w-56 shrink-0">
                        <div className="flex overflow-x-auto gap-4 no-scrollbar scroll-smooth p-1 snap-x">
                          {post.teamPhotos && post.teamPhotos.length > 0 ? (
                            post.teamPhotos.map((img, i) => (
                              <div 
                                key={i} 
                                onClick={() => setSelectedImg(img.url)}
                                className="h-32 w-32 md:h-48 md:w-48 shrink-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-red-500/10 snap-center shadow-2xl relative group/img cursor-zoom-in"
                              >
                                <img src={img.url} alt="" className="h-full w-full object-cover grayscale opacity-60 group-hover/img:grayscale-0 group-hover/img:opacity-100 transition-all duration-700 group-hover/img:scale-110" />
                                <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                  <Maximize2 className="text-white h-7 w-7" />
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="h-32 w-32 md:h-48 md:w-48 flex items-center justify-center bg-red-950/50 rounded-[3rem] text-red-900 border-2 border-dashed border-red-900">
                              <FileText size={40} />
                            </div>
                          )}
                        </div>
                        {post.teamPhotos?.length > 1 && (
                          <p className="text-[9px] font-black text-red-500/40 uppercase mt-4 text-center tracking-[0.2em] animate-pulse">Scroll Assets • {post.teamPhotos.length}</p>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 min-w-0 w-full text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                          <span className="text-[10px] font-black uppercase bg-red-600 text-red-950 px-4 py-1 rounded-lg tracking-widest shadow-lg shadow-red-600/20">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-black text-white leading-tight mb-6 italic tracking-tighter hover:text-red-500 transition-colors cursor-default">
                          {post.title}
                        </h3>
                        
                        <div className="flex items-center justify-center lg:justify-start gap-8 text-[11px] font-black text-red-500/60 uppercase tracking-[0.3em]">
                          <div className="flex items-center gap-2.5">
                            <EyeIcon className="h-5 w-5 text-red-500" />
                            <span>{post.views || 0} IMPRESSIONS</span>
                          </div>
                          <div className="flex items-center gap-2.5 border-l border-red-900 pl-8">
                            <Clock className="h-5 w-5 text-red-500" />
                            <span>{format(postDate, 'hh:mm a')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-row lg:flex-col gap-4 border-t lg:border-t-0 lg:border-l border-red-900/50 pt-8 lg:pt-0 lg:pl-12 w-full lg:w-auto justify-center">
                        <Link 
                          to={`/admin/edit/${post._id}`} 
                          className="h-14 w-14 md:h-16 md:w-16 flex items-center justify-center rounded-2xl bg-red-900/20 border border-red-500/20 text-red-500 hover:bg-red-600 hover:text-red-950 transition-all shadow-xl active:scale-90"
                        >
                          <PencilSquareIcon className="h-6 w-6 md:h-7 md:w-7 stroke-[2px]" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          disabled={deletingId === post._id}
                          className="h-14 w-14 md:h-16 md:w-16 flex items-center justify-center rounded-2xl bg-red-900/20 border border-red-500/20 text-red-800 hover:text-white hover:bg-red-700 transition-all shadow-xl active:scale-90"
                        >
                          {deletingId === post._id ? (
                            <Loader2 className="animate-spin h-7 w-7" />
                          ) : (
                            <TrashIcon className="h-6 w-6 md:h-7 md:w-7 stroke-[2px]" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.9); filter: blur(10px); }
          to { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        .animate-in { animation: zoom-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
};

export default Posts;