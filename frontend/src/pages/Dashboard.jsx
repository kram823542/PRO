// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { format, isToday, isYesterday } from 'date-fns';
// import { 
//   FileText, Eye, TrendingUp, PlusCircle, 
//   Pencil, Clock, Loader2, BarChart3, Calendar, ChevronRight
// } from 'lucide-react';
// import { dashboardAPI } from '../services/api';
// import toast from 'react-hot-toast';

// const Dashboard = ({ isSidebarView }) => {
//   const [stats, setStats] = useState({ totalPosts: 0, totalViews: 0, recentPosts: [] });
//   const [loading, setLoading] = useState(true);

//   const logoImageUrl = "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png";

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const data = await dashboardAPI.getStats();
//       setStats(data);
//     } catch (error) {
//       console.error('Dashboard error:', error);
//       toast.error('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Grouping posts by Date for the Tree View
//   const groupPostsByDate = (posts) => {
//     const groups = {};
//     posts.forEach(post => {
//       const dateKey = format(new Date(post.createdAt), 'yyyy-MM-dd');
//       if (!groups[dateKey]) groups[dateKey] = [];
//       groups[dateKey].push(post);
//     });
//     return groups;
//   };

//   const getDayLabel = (dateStr) => {
//     const date = new Date(dateStr);
//     if (isToday(date)) return "Today";
//     if (isYesterday(date)) return "Yesterday";
//     return format(date, 'dd MMMM, EEEE');
//   };

//   if (loading) {
//     return (
//       <div className="h-screen bg-white flex flex-col items-center justify-center gap-4">
//         <div className="relative p-1 rounded-full bg-gradient-to-tr from-black via-slate-400 to-black animate-spin">
//            <div className="bg-white rounded-full p-1">
//               <img src={logoImageUrl} alt="Logo" className="w-16 h-16 rounded-full" />
//            </div>
//         </div>
//         <Loader2 className="animate-spin text-black" size={30} />
//       </div>
//     );
//   }

//   const postGroups = groupPostsByDate(stats.recentPosts);

//   return (
//     <div className={`min-h-screen bg-white transition-all duration-500 
//       ${isSidebarView ? 'ml-14 md:ml-24' : 'ml-0 pb-20 md:pb-32'}`}>

//       <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-12">
        
//         {/* Header (Keep Same) */}
//         <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-14">
//           <div className="flex items-center gap-4">
//             <div className="relative group">
//               <div className="absolute -inset-1 bg-gradient-to-r from-black via-slate-500 to-black rounded-full opacity-75 group-hover:opacity-100 blur-sm animate-spin-slow transition duration-1000"></div>
//               <div className="relative bg-white rounded-full p-0.5">
//                 <img src={logoImageUrl} alt="Admin Logo" className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-black/5" />
//               </div>
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-5xl font-black text-black tracking-tighter uppercase leading-none">
//                 Control <span className="opacity-30">Center</span>
//               </h1>
//               <p className="text-[10px] md:text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest flex items-center gap-2">
//                 <Calendar size={12} /> {format(new Date(), "EEEE, dd MMMM yyyy")}
//               </p>
//             </div>
//           </div>
//           <Link to="/admin/create-post" className="bg-black text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-slate-800 transition-all font-black text-xs md:text-sm uppercase tracking-widest shadow-lg">
//             <PlusCircle size={18} /> New Publication
//           </Link>
//         </header>

//         {/* Stats Grid (Keep Same) */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-16">
//           <div className="bg-black text-white p-6 rounded-3xl">
//              <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 mb-2 font-bold">Total Posts</p>
//              <h3 className="text-4xl font-black">{stats.totalPosts}</h3>
//           </div>
//           <div className="bg-slate-50 p-6 rounded-3xl border border-black/5">
//              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2 font-bold">Global Views</p>
//              <h3 className="text-4xl font-black text-black">{stats.totalViews.toLocaleString()}</h3>
//           </div>
//           <div className="bg-slate-50 p-6 rounded-3xl border border-black/5">
//              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2 font-bold">Avg Reach</p>
//              <h3 className="text-4xl font-black text-black">{stats.totalPosts > 0 ? (stats.totalViews / stats.totalPosts).toFixed(0) : "0"}</h3>
//           </div>
//         </div>

//         {/* --- TREE TIMELINE SECTION --- */}
//         <div className="relative">
//           <h2 className="text-xl md:text-3xl font-black text-black uppercase tracking-tighter mb-10 flex items-center gap-4">
//             <BarChart3 size={28} /> Activity Timeline
//           </h2>

//           {stats.recentPosts.length === 0 ? (
//             <div className="p-12 text-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-400 uppercase font-bold tracking-widest">
//               No recent activity recorded
//             </div>
//           ) : (
//             Object.keys(postGroups).map((dateKey) => (
//               <div key={dateKey} className="relative mb-12 last:mb-0">
//                 {/* Date Label (The Node) */}
//                 <div className="sticky top-4 z-20 flex items-center gap-4 mb-8">
//                   <div className="bg-black text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
//                     {getDayLabel(dateKey)}
//                   </div>
//                   <div className="h-[1px] flex-1 bg-black/10"></div>
//                 </div>

//                 {/* Posts under this Date */}
//                 <div className="ml-4 md:ml-10 border-l-2 border-black/10 pl-6 md:pl-12 space-y-6">
//                   {postGroups[dateKey].map((post) => (
//                     <div key={post._id} className="relative group">
//                       {/* Connection Dot */}
//                       <div className="absolute -left-[31px] md:-left-[55px] top-6 w-4 h-4 rounded-full border-4 border-white bg-black group-hover:scale-150 transition-transform"></div>
                      
//                       <div className="bg-white hover:bg-slate-50 border border-black/5 p-4 md:p-6 rounded-[2rem] shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
//                         <div className="flex items-start gap-4">
//                           <div className="mt-1 hidden md:block">
//                             <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Time</p>
//                             <p className="text-sm font-bold text-black">{format(new Date(post.createdAt), "hh:mm a")}</p>
//                           </div>
                          
//                           <div className="min-w-0">
//                             <span className="md:hidden text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
//                               {format(new Date(post.createdAt), "hh:mm a")}
//                             </span>
//                             <h4 className="text-base md:text-xl font-black text-black group-hover:text-slate-700 transition-colors truncate">
//                               {post.title}
//                             </h4>
//                             <div className="flex items-center gap-4 mt-2">
//                                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase">
//                                   <Eye size={12} /> {post.views || 0} Views
//                                </div>
//                                <div className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-500 uppercase">
//                                   ID: {post._id.slice(-6)}
//                                </div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-2 self-end md:self-center">
//                           <Link 
//                             to={`/admin/edit/${post._id}`} 
//                             className="flex items-center gap-2 bg-white border border-black/10 px-4 py-2 rounded-full text-xs font-black uppercase hover:bg-black hover:text-white transition-all shadow-sm"
//                           >
//                             <Pencil size={14} /> Edit
//                           </Link>
//                           <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-black group-hover:text-white transition-all">
//                              <ChevronRight size={18} />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .animate-spin-slow {
//           animation: spin-slow 12s linear infinite;
//         }
//       `}} />
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, isToday, isYesterday } from 'date-fns';
import { 
  FileText, Eye, TrendingUp, PlusCircle, 
  Pencil, Clock, Loader2, BarChart3, Calendar, ChevronRight
} from 'lucide-react';
import { dashboardAPI } from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = ({ isSidebarView }) => {
  const [stats, setStats] = useState({ totalPosts: 0, totalViews: 0, recentPosts: [] });
  const [loading, setLoading] = useState(true);

  const logoImageUrl = "https://res.cloudinary.com/dsjnikk42/image/upload/v1761223239/Screenshot_20251023-180837.Photos_mwi249.png";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await dashboardAPI.getStats();
      setStats(data);
    } catch (error) {
      console.error('Dashboard error:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const groupPostsByDate = (posts) => {
    const groups = {};
    posts.forEach(post => {
      const dateKey = format(new Date(post.createdAt), 'yyyy-MM-dd');
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(post);
    });
    return groups;
  };

  const getDayLabel = (dateStr) => {
    const date = new Date(dateStr);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, 'dd MMMM, EEEE');
  };

  if (loading) {
    return (
      <div className="h-screen bg-red-950 flex flex-col items-center justify-center gap-4">
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-red-500 via-red-900 to-red-500 animate-spin">
           <div className="bg-red-950 rounded-full p-1">
              <img src={logoImageUrl} alt="Logo" className="w-16 h-16 rounded-full grayscale opacity-80" />
           </div>
        </div>
        <Loader2 className="animate-spin text-red-500" size={30} />
      </div>
    );
  }

  const postGroups = groupPostsByDate(stats.recentPosts);

  return (
    <div className={`min-h-screen bg-red-950 text-red-50 transition-all duration-500 selection:bg-red-500/30
      ${isSidebarView ? 'ml-14 md:ml-24' : 'ml-0 pb-20 md:pb-32'}`}>

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-12">
        
        {/* Header - Red Neon Style */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-14">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-red-900 to-red-600 rounded-full opacity-75 group-hover:opacity-100 blur-sm animate-spin-slow transition duration-1000"></div>
              <div className="relative bg-red-950 rounded-full p-0.5">
                <img src={logoImageUrl} alt="Admin Logo" className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-red-500/20" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                Control <span className="text-red-600">Center</span>
              </h1>
              <p className="text-[10px] md:text-xs text-red-400/60 mt-2 font-bold uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} className="text-red-500" /> {format(new Date(), "EEEE, dd MMMM yyyy")}
              </p>
            </div>
          </div>
          <Link to="/admin/create-post" className="bg-red-600 text-red-950 px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-red-500 transition-all font-black text-xs md:text-sm uppercase tracking-widest shadow-lg shadow-red-600/20">
            <PlusCircle size={18} /> New Publication
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-16">
          <div className="bg-red-600 text-red-950 p-6 rounded-3xl shadow-xl shadow-red-600/10">
             <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-70 mb-2">Total Posts</p>
             <h3 className="text-4xl font-black">{stats.totalPosts}</h3>
          </div>
          <div className="bg-red-900/20 p-6 rounded-3xl border border-red-500/10 backdrop-blur-sm">
             <p className="text-[10px] uppercase tracking-[0.2em] text-red-400 mb-2 font-bold">Global Views</p>
             <h3 className="text-4xl font-black text-white">{stats.totalViews.toLocaleString()}</h3>
          </div>
          <div className="bg-red-900/20 p-6 rounded-3xl border border-red-500/10 backdrop-blur-sm">
             <p className="text-[10px] uppercase tracking-[0.2em] text-red-400 mb-2 font-bold">Avg Reach</p>
             <h3 className="text-4xl font-black text-white">{stats.totalPosts > 0 ? (stats.totalViews / stats.totalPosts).toFixed(0) : "0"}</h3>
          </div>
        </div>

        {/* --- TREE TIMELINE SECTION --- */}
        <div className="relative">
          <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter mb-10 flex items-center gap-4">
            <BarChart3 size={28} className="text-red-500" /> Activity Timeline
          </h2>

          {stats.recentPosts.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-red-900/50 rounded-3xl text-red-900 uppercase font-bold tracking-widest">
              No recent activity recorded
            </div>
          ) : (
            Object.keys(postGroups).map((dateKey) => (
              <div key={dateKey} className="relative mb-12 last:mb-0">
                {/* Date Label (The Node) */}
                <div className="sticky top-20 z-20 flex items-center gap-4 mb-8">
                  <div className="bg-red-600 text-red-950 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                    {getDayLabel(dateKey)}
                  </div>
                  <div className="h-[1px] flex-1 bg-red-900"></div>
                </div>

                {/* Posts under this Date */}
                <div className="ml-4 md:ml-10 border-l-2 border-red-900/50 pl-6 md:pl-12 space-y-6">
                  {postGroups[dateKey].map((post) => (
                    <div key={post._id} className="relative group">
                      {/* Connection Dot */}
                      <div className="absolute -left-[31px] md:-left-[55px] top-6 w-4 h-4 rounded-full border-4 border-red-950 bg-red-500 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                      
                      <div className="bg-red-900/10 hover:bg-red-900/30 border border-red-500/10 p-4 md:p-6 rounded-[2rem] shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4 text-red-50">
                          <div className="mt-1 hidden md:block">
                            <p className="text-[10px] font-black text-red-500/40 uppercase tracking-tighter">Time</p>
                            <p className="text-sm font-bold">{format(new Date(post.createdAt), "hh:mm a")}</p>
                          </div>
                          
                          <div className="min-w-0">
                            <span className="md:hidden text-[10px] font-bold text-red-500 uppercase tracking-widest block mb-1">
                              {format(new Date(post.createdAt), "hh:mm a")}
                            </span>
                            <h4 className="text-base md:text-xl font-black group-hover:text-red-400 transition-colors truncate">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-4 mt-2">
                               <div className="flex items-center gap-1.5 text-[10px] font-black text-red-500/60 uppercase">
                                  <Eye size={12} /> {post.views || 0} Views
                               </div>
                               <div className="px-2 py-0.5 bg-red-900/40 rounded text-[9px] font-bold text-red-400 uppercase">
                                  ID: {post._id.slice(-6)}
                               </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center">
                          <Link 
                            to={`/admin/edit/${post._id}`} 
                            className="flex items-center gap-2 bg-red-950 border border-red-500/30 px-4 py-2 rounded-full text-xs font-black uppercase hover:bg-red-600 hover:text-red-950 transition-all shadow-sm text-red-500 hover:border-transparent"
                          >
                            <Pencil size={14} /> Edit
                          </Link>
                          <div className="h-8 w-8 rounded-full bg-red-900/30 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-red-950 transition-all">
                             <ChevronRight size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Dashboard;