

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
// import { FileText, Eye, TrendingUp, PlusCircle, ArrowUpRight, Clock, Loader2 } from 'lucide-react';
// import { dashboardAPI } from '../services/api';
// import toast from 'react-hot-toast';

// const Dashboard = () => {
//   const [stats, setStats] = useState({ totalPosts: 0, totalViews: 0, recentPosts: [] });
//   const [loading, setLoading] = useState(true);

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

//   if (loading) {
//     return (
//       <div className="h-screen bg-[#f8fafc] ml-16 flex items-center justify-center">
//         <Loader2 className="animate-spin text-indigo-600" size={40} />
//       </div>
//     );
//   }

//   const StatCard = ({ title, value, icon: Icon, trend, gradient }) => (
//     <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
//       <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${gradient} text-white`}>
//         <Icon size={20} />
//       </div>
//       <p className="text-xs font-bold text-slate-400 uppercase">{title}</p>
//       <div className="flex items-center gap-2 mt-1">
//         <h3 className="text-3xl font-black text-slate-900">{value}</h3>
//         <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">{trend}</span>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#f8fafc] ml-16">
//       <div className="p-6 md:p-8 lg:p-10">
        
//         <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//           <div>
//             <h1 className="text-3xl font-black text-slate-900 tracking-tight">
//               Insights <span className="text-indigo-600">Dashboard</span>
//             </h1>
//             <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
//               <Clock size={14} /> {format(new Date(), 'MMMM yyyy')}
//             </p>
//           </div>
//           <Link 
//             to="/admin/create-post" 
//             className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-600 transition-all flex items-center gap-2"
//           >
//             <PlusCircle size={18} /> New Post
//           </Link>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <StatCard 
//             title="Total Posts" 
//             value={stats.totalPosts} 
//             trend="+12%" 
//             icon={FileText} 
//             gradient="from-blue-500 to-indigo-600" 
//           />
//           <StatCard 
//             title="Total Views" 
//             value={stats.totalViews.toLocaleString()} 
//             trend="+24%" 
//             icon={Eye} 
//             gradient="from-emerald-400 to-teal-600" 
//           />
//           <StatCard 
//             title="Engagement" 
//             value={stats.totalPosts > 0 ? ((stats.totalViews / stats.totalPosts).toFixed(1)) : '0'} 
//             trend="+8%" 
//             icon={TrendingUp} 
//             gradient="from-violet-500 to-fuchsia-600" 
//           />
//         </div>

//         <div className="bg-white rounded-[1.5rem] border border-slate-100 overflow-hidden shadow-sm">
//           <div className="p-6 border-b border-slate-50 flex justify-between items-center">
//             <h2 className="font-bold text-slate-900">Recent Publications</h2>
//             <Link to="/admin/posts" className="text-indigo-600 text-xs font-bold hover:underline">
//               View All
//             </Link>
//           </div>
          
//           {stats.recentPosts.length === 0 ? (
//             <div className="p-10 text-center text-gray-500">
//               No posts yet. Create your first post!
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-50">
//               {stats.recentPosts.map((post) => (
//                 <div key={post._id} className="p-5 hover:bg-slate-50 transition-all flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="h-10 w-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
//                       <FileText size={18}/>
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-slate-800 text-sm">{post.title}</h4>
//                       <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
//                         {format(new Date(post.createdAt), 'MMM dd')} • {post.views || 0} Views
//                       </p>
//                     </div>
//                   </div>
//                   <Link 
//                     to={`/admin/edit/${post._id}`} 
//                     className="text-slate-300 hover:text-indigo-600 transition-colors"
//                   >
//                     <ArrowUpRight size={18}/>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
// import { FileText, Eye, TrendingUp, PlusCircle, ArrowUpRight, Clock, Loader2 } from 'lucide-react';
// import { dashboardAPI } from '../services/api';
// import toast from 'react-hot-toast';

// const Dashboard = () => {
//   const [stats, setStats] = useState({ totalPosts: 0, totalViews: 0, recentPosts: [] });
//   const [loading, setLoading] = useState(true);

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

//   if (loading) {
//     return (
//       <div className="h-screen bg-[#f8fafc] ml-16 flex items-center justify-center">
//         <Loader2 className="animate-spin text-indigo-600" size={40} />
//       </div>
//     );
//   }

//   const StatCard = ({ title, value, icon: Icon, trend, gradient }) => (
//     <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
//       <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${gradient} text-white`}>
//         <Icon size={20} />
//       </div>
//       <p className="text-xs font-bold text-slate-400 uppercase">{title}</p>
//       <div className="flex items-center gap-2 mt-1">
//         <h3 className="text-3xl font-black text-slate-900">{value}</h3>
//         <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">{trend}</span>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#f8fafc] ml-0">
//       <div className="p-2 md:p-8 lg:p-5">
        
//         <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//           <div>
//             <h1 className="text-3xl font-black text-slate-900 tracking-tight">
//               Insights <span className="text-indigo-600">Dashboard</span>
//             </h1>
//             <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
//               <Clock size={14} /> {format(new Date(), 'MMMM yyyy')}
//             </p>
//           </div>
//           <Link 
//             to="/admin/create-post" 
//             className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-600 transition-all flex items-center gap-2"
//           >
//             <PlusCircle size={18} /> New Post
//           </Link>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <StatCard 
//             title="Total Posts" 
//             value={stats.totalPosts} 
//             trend="+12%" 
//             icon={FileText} 
//             gradient="from-blue-500 to-indigo-600" 
//           />
//           <StatCard 
//             title="Total Views" 
//             value={stats.totalViews.toLocaleString()} 
//             trend="+24%" 
//             icon={Eye} 
//             gradient="from-emerald-400 to-teal-600" 
//           />
//           <StatCard 
//             title="Engagement" 
//             value={stats.totalPosts > 0 ? ((stats.totalViews / stats.totalPosts).toFixed(1)) : '0'} 
//             trend="+8%" 
//             icon={TrendingUp} 
//             gradient="from-violet-500 to-fuchsia-600" 
//           />
//         </div>

//         <div className="bg-white rounded-[1.5rem] border border-slate-100 overflow-hidden shadow-sm">
//           <div className="p-6 border-b border-slate-50 flex justify-between items-center">
//             <h2 className="font-bold text-slate-900">Recent Publications</h2>
//             <Link to="/admin/posts" className="text-indigo-600 text-xs font-bold hover:underline">
//               View All
//             </Link>
//           </div>
          
//           {stats.recentPosts.length === 0 ? (
//             <div className="p-10 text-center text-gray-500">
//               No posts yet. Create your first post!
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-50">
//               {stats.recentPosts.map((post) => (
//                 <div key={post._id} className="p-5 hover:bg-slate-50 transition-all flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="h-10 w-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
//                       <FileText size={18}/>
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-slate-800 text-sm">{post.title}</h4>
//                       <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">
//                         {format(new Date(post.createdAt), 'MMM dd')} • {post.views || 0} Views
//                       </p>
//                     </div>
//                   </div>
//                   <Link 
//                     to={`/admin/edit/${post._id}`} 
//                     className="text-slate-300 hover:text-indigo-600 transition-colors"
//                   >
//                     <ArrowUpRight size={18}/>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
// import { FileText, Eye, TrendingUp, PlusCircle, ArrowUpRight, Clock, Loader2 } from 'lucide-react';
// import { dashboardAPI } from '../services/api';
// import toast from 'react-hot-toast';

// const Dashboard = () => {
//   const [stats, setStats] = useState({ totalPosts: 0, totalViews: 0, recentPosts: [] });
//   const [loading, setLoading] = useState(true);

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

//   if (loading) {
//     return (
//       <div className="h-screen bg-[#f8fafc] ml-16 flex items-center justify-center">
//         <Loader2 className="animate-spin text-indigo-600" size={40} />
//       </div>
//     );
//   }

//   const StatCard = ({ title, value, icon: Icon, trend, gradient }) => (
//     <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm transition-transform hover:-translate-y-1">
//       <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${gradient} text-white`}>
//         <Icon size={20} />
//       </div>
//       <p className="text-xs font-bold text-slate-400 uppercase">{title}</p>
//       <div className="flex items-center gap-2 mt-1">
//         <h3 className="text-3xl font-black text-slate-900">{value}</h3>
//         <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">{trend}</span>
//       </div>
//     </div>
//   );

//  return (
//   <div className="ml-22 min-h-screen bg-[#f8fafc]">

//     <div className="px-6 py-6">

//       <header className="flex justify-between items-center mb-8">
        
//         <div>
//           <h1 className="text-3xl font-black text-slate-900">
//             Insights <span className="text-indigo-600">Dashboard</span>
//           </h1>

//           <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
//             <Clock size={14} />
//             {format(new Date(), "MMMM yyyy")}
//           </p>
//         </div>

//         <Link
//           to="/admin/create-post"
//           className="bg-slate-900 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-indigo-600 transition"
//         >
//           <PlusCircle size={18} />
//           New Post
//         </Link>

//       </header>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

//         <StatCard
//           title="Total Posts"
//           value={stats.totalPosts}
//           trend="+12%"
//           icon={FileText}
//           gradient="from-blue-500 to-indigo-600"
//         />

//         <StatCard
//           title="Total Views"
//           value={stats.totalViews.toLocaleString()}
//           trend="+24%"
//           icon={Eye}
//           gradient="from-emerald-400 to-teal-600"
//         />

//         <StatCard
//           title="Engagement"
//           value={
//             stats.totalPosts > 0
//               ? (stats.totalViews / stats.totalPosts).toFixed(1)
//               : "0"
//           }
//           trend="+8%"
//           icon={TrendingUp}
//           gradient="from-violet-500 to-fuchsia-600"
//         />
//       </div>

//       {/* Recent Posts */}
//       <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">

//         <div className="flex justify-between items-center p-5 border-b">
//           <h2 className="font-bold">Recent Publications</h2>

//           <Link
//             to="/admin/posts"
//             className="text-indigo-600 text-sm font-semibold"
//           >
//             View All
//           </Link>
//         </div>

//         {stats.recentPosts.length === 0 ? (
//           <div className="p-10 text-center text-gray-500">
//             No posts yet
//           </div>
//         ) : (
//           stats.recentPosts.map((post) => (
//             <div
//               key={post._id}
//               className="flex justify-between items-center p-5 border-t hover:bg-slate-50"
//             >
//               <div className="flex gap-3 items-center">

//                 <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center">
//                   <FileText size={18} />
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-sm">
//                     {post.title}
//                   </h4>

//                   <p className="text-xs text-slate-400">
//                     {format(new Date(post.createdAt), "MMM dd")} •{" "}
//                     {post.views || 0} Views
//                   </p>
//                 </div>
//               </div>

//               <Link
//                 to={`/admin/edit/${post._id}`}
//                 className="text-slate-400 hover:text-indigo-600"
//               >
//                 <ArrowUpRight size={18} />
//               </Link>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   </div>
// );
// };

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
// import { 
//   FileText, Eye, TrendingUp, PlusCircle, 
//   ArrowUpRight, Clock, Loader2, BarChart3, Calendar
// } from 'lucide-react';
// import { dashboardAPI } from '../services/api';
// import toast from 'react-hot-toast';

// const Dashboard = ({ isSidebarView }) => {
//   const [stats, setStats] = useState({ totalPosts: 0, totalViews: 0, recentPosts: [] });
//   const [loading, setLoading] = useState(true);

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

//   if (loading) {
//     return (
//       <div className="h-screen bg-slate-50 flex items-center justify-center">
//         <Loader2 className="animate-spin text-blue-600" size={40} />
//       </div>
//     );
//   }

//   const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
//     <div className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-blue-50 shadow-sm transition-all hover:shadow-md group">
//       <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full mb-3 md:mb-4 flex items-center justify-center ${colorClass} text-white shadow-inner transition-transform group-hover:scale-110`}>
//         <Icon size={18} className="md:hidden" />
//         <Icon size={22} className="hidden md:block" />
//       </div>
//       <p className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
//       <div className="flex items-baseline gap-2 mt-1">
//         <h3 className="text-xl md:text-3xl font-black text-slate-900">{value}</h3>
//         <span className="text-[9px] md:text-xs text-blue-600 font-bold">{trend}</span>
//       </div>
//     </div>
//   );

//   return (
//     <div className={`min-h-screen bg-slate-50 transition-all duration-500 
//       ${isSidebarView ? 'ml-14 md:ml-24' : 'ml-0 pb-20 md:pb-32'}`}>

//       <div className="max-w-7xl mx-auto px-3 md:px-8 py-4 md:py-10">
        
//         {/* Header */}
//         <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 md:mb-10">
//           <div>
//             <h1 className="text-xl md:text-4xl font-black text-slate-900 leading-tight">
//               Control <span className="text-blue-600">Center</span>
//             </h1>
//             <p className="text-[10px] md:text-sm text-slate-400 mt-0.5 flex items-center gap-1.5">
//               <Clock size={12} className="text-red-500" />
//               {format(new Date(), "EEEE, dd MMMM yyyy")}
//             </p>
//           </div>

//           <Link
//             to="/admin/create-post"
//             className="w-full md:w-auto bg-blue-600 text-white px-5 py-2.5 md:py-3 rounded-full flex items-center justify-center gap-2 hover:bg-red-600 shadow-md shadow-blue-200 transition-all active:scale-95 font-bold text-xs md:text-sm"
//           >
//             <PlusCircle size={18} />
//             New Post
//           </Link>
//         </header>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 mb-6 md:mb-10">
//           <StatCard
//             title="Total Posts"
//             value={stats.totalPosts}
//             trend="+5 Today"
//             icon={FileText}
//             colorClass="bg-blue-600"
//           />
//           <StatCard
//             title="Global Views"
//             value={stats.totalViews.toLocaleString()}
//             trend="↑ 24%"
//             icon={Eye}
//             colorClass="bg-red-600"
//           />
//           <StatCard
//             title="Avg Reach"
//             value={stats.totalPosts > 0 ? (stats.totalViews / stats.totalPosts).toFixed(0) : "0"}
//             trend="A+"
//             icon={TrendingUp}
//             colorClass="bg-slate-900"
//           />
//         </div>

//         {/* Main Content - Full Width (Pro Tips Removed) */}
//         <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-blue-50 shadow-sm overflow-hidden">
//           <div className="flex justify-between items-center p-4 md:p-8 border-b border-slate-50">
//             <h2 className="text-sm md:text-lg font-black text-slate-900 flex items-center gap-2">
//               <BarChart3 size={18} className="text-blue-600 md:w-5 md:h-5" />
//               Recent Publications
//             </h2>
//             <Link to="/admin/posts" className="text-blue-600 text-[10px] md:text-sm font-bold hover:underline">
//               View All
//             </Link>
//           </div>

//           <div className="divide-y divide-slate-50">
//             {stats.recentPosts.length === 0 ? (
//               <div className="p-8 md:p-12 text-center text-slate-400 text-xs md:text-sm font-medium">No activity recorded.</div>
//             ) : (
//               stats.recentPosts.map((post) => (
//                 <div key={post._id} className="flex justify-between items-center p-3.5 md:p-6 hover:bg-blue-50/30 transition-colors">
//                   <div className="flex gap-3 md:gap-4 items-center overflow-hidden">
//                     <div className="h-9 w-9 md:h-12 md:w-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 shrink-0">
//                       <FileText size={16} className="md:w-5 md:h-5" />
//                     </div>
//                     <div className="min-w-0">
//                       <h4 className="font-bold text-slate-900 truncate text-xs md:text-base pr-2">
//                         {post.title}
//                       </h4>
//                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5 md:mt-1">
//                         <div className="flex items-center gap-1 text-[9px] md:text-xs text-blue-600 font-bold">
//                           <Calendar size={10} className="md:w-3 md:h-3" />
//                           {format(new Date(post.createdAt), "dd MMM, yyyy")}
//                         </div>
//                         <div className="flex items-center gap-1 text-[9px] md:text-xs text-slate-400">
//                           <Clock size={10} className="md:w-3 md:h-3" />
//                           {format(new Date(post.createdAt), "hh:mm a")}
//                         </div>
//                         <span className="hidden sm:inline text-[9px] md:text-xs text-slate-300">|</span>
//                         <div className="text-[9px] md:text-xs text-slate-500 font-medium">
//                           {post.views || 0} views
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <Link 
//                     to={`/admin/edit/${post._id}`} 
//                     className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all shrink-0 ml-2"
//                   >
//                     <ArrowUpRight size={14} className="md:w-4 md:h-4" />
//                   </Link>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
        
//       </div>
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

  // Grouping posts by Date for the Tree View
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
      <div className="h-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-black via-slate-400 to-black animate-spin">
           <div className="bg-white rounded-full p-1">
              <img src={logoImageUrl} alt="Logo" className="w-16 h-16 rounded-full" />
           </div>
        </div>
        <Loader2 className="animate-spin text-black" size={30} />
      </div>
    );
  }

  const postGroups = groupPostsByDate(stats.recentPosts);

  return (
    <div className={`min-h-screen bg-white transition-all duration-500 
      ${isSidebarView ? 'ml-14 md:ml-24' : 'ml-0 pb-20 md:pb-32'}`}>

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-12">
        
        {/* Header (Keep Same) */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-14">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-black via-slate-500 to-black rounded-full opacity-75 group-hover:opacity-100 blur-sm animate-spin-slow transition duration-1000"></div>
              <div className="relative bg-white rounded-full p-0.5">
                <img src={logoImageUrl} alt="Admin Logo" className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-black/5" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-5xl font-black text-black tracking-tighter uppercase leading-none">
                Control <span className="opacity-30">Center</span>
              </h1>
              <p className="text-[10px] md:text-xs text-slate-400 mt-2 font-bold uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} /> {format(new Date(), "EEEE, dd MMMM yyyy")}
              </p>
            </div>
          </div>
          <Link to="/admin/create-post" className="bg-black text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-slate-800 transition-all font-black text-xs md:text-sm uppercase tracking-widest shadow-lg">
            <PlusCircle size={18} /> New Publication
          </Link>
        </header>

        {/* Stats Grid (Keep Same) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-16">
          <div className="bg-black text-white p-6 rounded-3xl">
             <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 mb-2 font-bold">Total Posts</p>
             <h3 className="text-4xl font-black">{stats.totalPosts}</h3>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border border-black/5">
             <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2 font-bold">Global Views</p>
             <h3 className="text-4xl font-black text-black">{stats.totalViews.toLocaleString()}</h3>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border border-black/5">
             <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2 font-bold">Avg Reach</p>
             <h3 className="text-4xl font-black text-black">{stats.totalPosts > 0 ? (stats.totalViews / stats.totalPosts).toFixed(0) : "0"}</h3>
          </div>
        </div>

        {/* --- TREE TIMELINE SECTION --- */}
        <div className="relative">
          <h2 className="text-xl md:text-3xl font-black text-black uppercase tracking-tighter mb-10 flex items-center gap-4">
            <BarChart3 size={28} /> Activity Timeline
          </h2>

          {stats.recentPosts.length === 0 ? (
            <div className="p-12 text-center border-2 border-dashed border-slate-100 rounded-3xl text-slate-400 uppercase font-bold tracking-widest">
              No recent activity recorded
            </div>
          ) : (
            Object.keys(postGroups).map((dateKey) => (
              <div key={dateKey} className="relative mb-12 last:mb-0">
                {/* Date Label (The Node) */}
                <div className="sticky top-4 z-20 flex items-center gap-4 mb-8">
                  <div className="bg-black text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                    {getDayLabel(dateKey)}
                  </div>
                  <div className="h-[1px] flex-1 bg-black/10"></div>
                </div>

                {/* Posts under this Date */}
                <div className="ml-4 md:ml-10 border-l-2 border-black/10 pl-6 md:pl-12 space-y-6">
                  {postGroups[dateKey].map((post) => (
                    <div key={post._id} className="relative group">
                      {/* Connection Dot */}
                      <div className="absolute -left-[31px] md:-left-[55px] top-6 w-4 h-4 rounded-full border-4 border-white bg-black group-hover:scale-150 transition-transform"></div>
                      
                      <div className="bg-white hover:bg-slate-50 border border-black/5 p-4 md:p-6 rounded-[2rem] shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 hidden md:block">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Time</p>
                            <p className="text-sm font-bold text-black">{format(new Date(post.createdAt), "hh:mm a")}</p>
                          </div>
                          
                          <div className="min-w-0">
                            <span className="md:hidden text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                              {format(new Date(post.createdAt), "hh:mm a")}
                            </span>
                            <h4 className="text-base md:text-xl font-black text-black group-hover:text-slate-700 transition-colors truncate">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-4 mt-2">
                               <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase">
                                  <Eye size={12} /> {post.views || 0} Views
                               </div>
                               <div className="px-2 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-500 uppercase">
                                  ID: {post._id.slice(-6)}
                               </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center">
                          <Link 
                            to={`/admin/edit/${post._id}`} 
                            className="flex items-center gap-2 bg-white border border-black/10 px-4 py-2 rounded-full text-xs font-black uppercase hover:bg-black hover:text-white transition-all shadow-sm"
                          >
                            <Pencil size={14} /> Edit
                          </Link>
                          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-black group-hover:text-white transition-all">
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