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
  const [selectedImg, setSelectedImg] = useState(null); // Image Zoom State

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
      <div className="h-screen bg-white md:ml-16 flex flex-col justify-center items-center gap-4">
        <Loader2 className="animate-spin text-black" size={32} />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Temporal_Syncing</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] md:ml-16 font-sans text-black pb-32">
      
      {/* --- Image Zoom Overlay (Modal) --- */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 transition-all"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-6 right-6 text-white hover:rotate-90 transition-transform">
            <XMarkIcon className="h-10 w-10" />
          </button>
          <img 
            src={selectedImg} 
            alt="Preview" 
            className="max-w-full max-h-full rounded-lg shadow-2xl animate-in zoom-in duration-300" 
          />
        </div>
      )}

      <div className="p-4 md:p-10 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-16 md:mb-24 border-b-2 border-black pb-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">Archives</h1>
            <p className="text-[9px] md:text-[11px] font-bold text-gray-400 uppercase tracking-[0.5em] mt-3">Timeline_Directory_v3</p>
          </div>
          <Link
            to="/admin/create-post"
            className="h-14 w-14 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl"
          >
            <PlusIcon className="h-7 w-7 stroke-[2.5px]" />
          </Link>
        </div>

        {/* Tree Layout */}
        <div className="relative">
          {/* Main Vertical Trunk */}
          <div className="absolute left-[19px] md:left-[31px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-black/20 via-black/5 to-transparent" />

          <div className="space-y-16 md:space-y-24">
            {posts.map((post, index) => {
              const postDate = new Date(post.createdAt);
              const showDateLabel = index === 0 || !isSameDay(postDate, new Date(posts[index-1].createdAt));

              return (
                <div key={post._id} className="relative">
                  
                  {/* Date & Day Header */}
                  {showDateLabel && (
                    <div className="flex items-center gap-4 md:gap-8 mb-12 -ml-1 md:-ml-2">
                      <div className="h-12 w-12 md:h-20 md:w-20 bg-black rounded-2xl md:rounded-[2rem] flex flex-col items-center justify-center z-10 shadow-xl border-[6px] border-[#FAFAFA]">
                        <span className="text-[8px] md:text-[10px] font-black text-white/50 uppercase leading-none mb-1">
                          {format(postDate, 'EEE')}
                        </span>
                        <Calendar className="text-white h-5 w-5 md:h-7 md:w-7" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg md:text-2xl font-black uppercase tracking-tighter text-black leading-none">
                          {format(postDate, 'MMMM dd, yyyy')}
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
                          Entries for {format(postDate, 'EEEE')}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Post Node */}
                  <div className="relative pl-12 md:pl-28 group">
                    
                    {/* Time Indicator on Line */}
                    <div className="absolute hidden md:flex flex-col items-center -left-6 top-1/2 -translate-y-1/2 z-20">
                      <div className="bg-white border-2 border-black text-[10px] font-black px-2 py-1 rounded shadow-sm group-hover:bg-black group-hover:text-white transition-all">
                        {format(postDate, 'HH:mm')}
                      </div>
                    </div>

                    {/* Horizontal Branch Connector */}
                    <div className="absolute left-[19px] md:left-8 top-1/2 -translate-y-1/2 w-8 md:w-20 h-[2px] bg-black/10 group-hover:bg-black transition-all" />
                    <div className="absolute left-[16px] md:left-[28px] top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-white border-2 border-gray-300 z-10 group-hover:border-black group-hover:scale-125 transition-all" />

                    {/* Card Container */}
                    <div className="bg-white border border-gray-100 rounded-[2rem] md:rounded-[3rem] p-5 md:p-8 flex flex-col lg:flex-row items-center gap-6 md:gap-10 shadow-sm hover:shadow-3xl hover:-translate-y-2 transition-all duration-700 overflow-hidden relative">
                      
                      {/* Image Scroller with Zoom Feature */}
                      <div className="relative w-full lg:w-48 shrink-0">
                        <div className="flex overflow-x-auto gap-3 no-scrollbar scroll-smooth p-1 snap-x">
                          {post.teamPhotos && post.teamPhotos.length > 0 ? (
                            post.teamPhotos.map((img, i) => (
                              <div 
                                key={i} 
                                onClick={() => setSelectedImg(img.url)}
                                className="h-28 w-28 md:h-40 md:w-40 shrink-0 rounded-[1.5rem] md:rounded-[2.2rem] overflow-hidden border border-gray-100 snap-center shadow-md relative group/img cursor-zoom-in"
                              >
                                <img src={img.url} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                  <Maximize2 className="text-white h-6 w-6" />
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="h-28 w-28 md:h-40 md:w-40 flex items-center justify-center bg-gray-50 rounded-[2.2rem] text-gray-200 border-2 border-dashed border-gray-100">
                              <FileText size={32} />
                            </div>
                          )}
                        </div>
                        {post.teamPhotos?.length > 1 && (
                          <p className="text-[8px] font-black text-gray-300 uppercase mt-2 text-center tracking-widest animate-pulse">Swipe to view more • {post.teamPhotos.length}</p>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 min-w-0 w-full text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                          <span className="text-[9px] font-black uppercase bg-black text-white px-3 py-1 rounded-full tracking-tighter">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight mb-4 italic tracking-tighter">
                          {post.title}
                        </h3>
                        
                        <div className="flex items-center justify-center lg:justify-start gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          <div className="flex items-center gap-2">
                            <EyeIcon className="h-4 w-4 text-black" />
                            <span>{post.views || 0}</span>
                          </div>
                          <div className="flex items-center gap-2 border-l border-gray-100 pl-6">
                            <Clock className="h-4 w-4 text-black" />
                            <span>{format(postDate, 'hh:mm a')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-row lg:flex-col gap-3 border-t lg:border-t-0 lg:border-l border-gray-50 pt-6 lg:pt-0 lg:pl-10 w-full lg:w-auto justify-center">
                        <Link 
                          to={`/admin/edit/${post._id}`} 
                          className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full bg-white border border-gray-100 hover:bg-black hover:text-white transition-all shadow-lg active:scale-90"
                        >
                          <PencilSquareIcon className="h-5 w-5 md:h-6 md:w-6" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          disabled={deletingId === post._id}
                          className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full bg-white border border-gray-100 text-gray-300 hover:text-red-500 hover:border-red-500 transition-all shadow-lg active:scale-90"
                        >
                          {deletingId === post._id ? (
                            <Loader2 className="animate-spin h-6 w-6" />
                          ) : (
                            <TrashIcon className="h-5 w-5 md:h-6 md:w-6" />
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
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-in { animation: zoom-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Posts;