// import React, { useState, useEffect } from 'react';
// import { contactAPI } from '../services/api';
// import { format } from 'date-fns';
// import { 
//   Mail, Phone, User, MessageSquare, 
//   Calendar, Clock, Globe, Smartphone,
//   CheckCircle, XCircle, Eye, Filter,
//   RefreshCw, Trash2, ChevronLeft, ChevronRight,
//   Inbox, AlertCircle
// } from 'lucide-react';
// import toast from 'react-hot-toast';

// const AdminContacts = () => {
//   const [contacts, setContacts] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [filter, setFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, [filter, currentPage]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
      
//       // Build query params
//       const params = {
//         page: currentPage,
//         limit: 10
//       };
      
//       if (filter !== 'all') {
//         params.status = filter;
//       }

//       const [contactsRes, statsRes] = await Promise.all([
//         contactAPI.getContacts(params),
//         contactAPI.getContactStats()
//       ]);
      
//       setContacts(contactsRes.data.data || []);
//       setTotalPages(contactsRes.data.pagination?.totalPages || 1);
//       setStats(statsRes.data.data);
      
//     } catch (error) {
//       console.error('Error fetching contacts:', error);
//       toast.error('Failed to load contacts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchData();
//     setRefreshing(false);
//     toast.success('Data refreshed');
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await contactAPI.updateContactStatus(id, status);
//       toast.success(`Contact marked as ${status}`);
      
//       // Update local state
//       setContacts(contacts.map(contact => 
//         contact._id === id ? { ...contact, status } : contact
//       ));
      
//       // Update selected contact if open
//       if (selectedContact?._id === id) {
//         setSelectedContact({ ...selectedContact, status });
//       }
      
//       // Refresh stats
//       const statsRes = await contactAPI.getContactStats();
//       setStats(statsRes.data.data);
      
//     } catch (error) {
//       toast.error('Error updating status');
//     }
//   };

//   const deleteContact = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this message?')) {
//       return;
//     }

//     try {
//       await contactAPI.deleteContact(id);
//       toast.success('Contact deleted successfully');
      
//       // Remove from list
//       setContacts(contacts.filter(contact => contact._id !== id));
      
//       // Close detail view if open
//       if (selectedContact?._id === id) {
//         setSelectedContact(null);
//       }
      
//       // Refresh stats
//       const statsRes = await contactAPI.getContactStats();
//       setStats(statsRes.data.data);
      
//     } catch (error) {
//       toast.error('Error deleting contact');
//     }
//   };

//   const getStatusBadge = (status) => {
//     const styles = {
//       unread: 'bg-yellow-100 text-yellow-800 border-yellow-200',
//       read: 'bg-blue-100 text-blue-800 border-blue-200',
//       replied: 'bg-green-100 text-green-800 border-green-200'
//     };
    
//     return (
//       <span className={`px-3 py-1 text-xs font-medium rounded-full border ${styles[status] || styles.unread}`}>
//         {status}
//       </span>
//     );
//   };

//   if (loading && !refreshing) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading messages...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
//           <p className="text-gray-600 mt-1">Manage all your contact form submissions</p>
//         </div>
//         <button
//           onClick={handleRefresh}
//           disabled={refreshing}
//           className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50"
//         >
//           <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
//           Refresh
//         </button>
//       </div>

//       {/* Stats Cards */}
//       {stats && (
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//             <div className="flex items-center justify-between mb-2">
//               <Inbox size={20} className="text-gray-400" />
//               <span className="text-xs text-gray-400">Total</span>
//             </div>
//             <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
//           </div>
          
//           <div className="bg-yellow-50 p-6 rounded-xl shadow-sm border border-yellow-100">
//             <div className="flex items-center justify-between mb-2">
//               <AlertCircle size={20} className="text-yellow-600" />
//               <span className="text-xs text-yellow-600">Unread</span>
//             </div>
//             <p className="text-3xl font-bold text-yellow-600">{stats.unread}</p>
//           </div>
          
//           <div className="bg-blue-50 p-6 rounded-xl shadow-sm border border-blue-100">
//             <div className="flex items-center justify-between mb-2">
//               <Eye size={20} className="text-blue-600" />
//               <span className="text-xs text-blue-600">Read</span>
//             </div>
//             <p className="text-3xl font-bold text-blue-600">{stats.read}</p>
//           </div>
          
//           <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100">
//             <div className="flex items-center justify-between mb-2">
//               <CheckCircle size={20} className="text-green-600" />
//               <span className="text-xs text-green-600">Replied</span>
//             </div>
//             <p className="text-3xl font-bold text-green-600">{stats.replied}</p>
//           </div>
          
//           <div className="bg-purple-50 p-6 rounded-xl shadow-sm border border-purple-100">
//             <div className="flex items-center justify-between mb-2">
//               <Calendar size={20} className="text-purple-600" />
//               <span className="text-xs text-purple-600">Last 7 days</span>
//             </div>
//             <p className="text-3xl font-bold text-purple-600">{stats.recentCount}</p>
//           </div>
//         </div>
//       )}

//       {/* Filter Tabs */}
//       <div className="flex gap-2 mb-6">
//         {['all', 'unread', 'read', 'replied'].map((status) => (
//           <button
//             key={status}
//             onClick={() => {
//               setFilter(status);
//               setCurrentPage(1);
//             }}
//             className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
//               filter === status
//                 ? status === 'all' ? 'bg-gray-900 text-white' :
//                   status === 'unread' ? 'bg-yellow-500 text-white' :
//                   status === 'read' ? 'bg-blue-500 text-white' :
//                   'bg-green-500 text-white'
//                 : 'bg-white text-gray-600 hover:bg-gray-100'
//             }`}
//           >
//             {status}
//           </button>
//         ))}
//       </div>

//       {/* Main Content - Split View */}
//       <div className="grid grid-cols-12 gap-6">
//         {/* Left Side - Contact List */}
//         <div className="col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="p-4 border-b border-gray-200 bg-gray-50">
//             <h2 className="font-semibold text-gray-700">Messages ({contacts.length})</h2>
//           </div>
          
//           <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
//             {contacts.length === 0 ? (
//               <div className="p-8 text-center text-gray-500">
//                 No messages found
//               </div>
//             ) : (
//               contacts.map(contact => (
//                 <div
//                   key={contact._id}
//                   onClick={() => setSelectedContact(contact)}
//                   className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
//                     selectedContact?._id === contact._id ? 'bg-blue-50' : ''
//                   }`}
//                 >
//                   <div className="flex justify-between items-start mb-2">
//                     <div className="flex items-center gap-2">
//                       <User size={16} className="text-gray-400" />
//                       <span className="font-medium text-gray-900">{contact.name}</span>
//                     </div>
//                     {getStatusBadge(contact.status)}
//                   </div>
                  
//                   <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
//                     <Phone size={14} />
//                     <span>{contact.phone}</span>
//                   </div>
                  
//                   <p className="text-sm text-gray-600 line-clamp-2 mb-2">
//                     {contact.message}
//                   </p>
                  
//                   <div className="flex items-center gap-4 text-xs text-gray-400">
//                     <span className="flex items-center gap-1">
//                       <Calendar size={12} />
//                       {format(new Date(contact.createdAt), 'MMM dd, yyyy')}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <Clock size={12} />
//                       {format(new Date(contact.createdAt), 'hh:mm a')}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
          
//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="p-4 border-t border-gray-200 flex items-center justify-between">
//               <button
//                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                 disabled={currentPage === 1}
//                 className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
//               >
//                 <ChevronLeft size={20} />
//               </button>
//               <span className="text-sm text-gray-600">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                 disabled={currentPage === totalPages}
//                 className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
//               >
//                 <ChevronRight size={20} />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Right Side - Contact Details */}
//         <div className="col-span-7 bg-white rounded-xl shadow-sm border border-gray-200">
//           {selectedContact ? (
//             <div className="p-6">
//               {/* Header with Actions */}
//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 mb-2">
//                     {selectedContact.name}
//                   </h2>
//                   <div className="flex items-center gap-3">
//                     {getStatusBadge(selectedContact.status)}
//                     <span className="text-sm text-gray-500">
//                       ID: {selectedContact._id}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                   {selectedContact.status !== 'read' && (
//                     <button
//                       onClick={() => updateStatus(selectedContact._id, 'read')}
//                       className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors"
//                       title="Mark as read"
//                     >
//                       <Eye size={18} />
//                     </button>
//                   )}
//                   {selectedContact.status !== 'replied' && (
//                     <button
//                       onClick={() => updateStatus(selectedContact._id, 'replied')}
//                       className="p-2 hover:bg-green-100 rounded-lg text-green-600 transition-colors"
//                       title="Mark as replied"
//                     >
//                       <CheckCircle size={18} />
//                     </button>
//                   )}
//                   <button
//                     onClick={() => deleteContact(selectedContact._id)}
//                     className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
//                     title="Delete"
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* Contact Info Cards */}
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div className="bg-gray-50 p-4 rounded-xl">
//                   <div className="flex items-center gap-2 text-indigo-600 mb-2">
//                     <Phone size={16} />
//                     <span className="text-xs font-semibold uppercase">Phone</span>
//                   </div>
//                   <p className="text-lg font-medium text-gray-900">{selectedContact.phone}</p>
//                 </div>
                
//                 <div className="bg-gray-50 p-4 rounded-xl">
//                   <div className="flex items-center gap-2 text-purple-600 mb-2">
//                     <Calendar size={16} />
//                     <span className="text-xs font-semibold uppercase">Received</span>
//                   </div>
//                   <p className="text-lg font-medium text-gray-900">
//                     {format(new Date(selectedContact.createdAt), 'MMM dd, yyyy')}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {format(new Date(selectedContact.createdAt), 'hh:mm:ss a')}
//                   </p>
//                 </div>
//               </div>

//               {/* Message Card */}
//               <div className="mb-6">
//                 <div className="flex items-center gap-2 text-blue-600 mb-3">
//                   <MessageSquare size={18} />
//                   <span className="text-sm font-semibold uppercase">Message</span>
//                 </div>
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
//                     {selectedContact.message}
//                   </p>
//                 </div>
//               </div>

//               {/* Technical Details */}
//               <div>
//                 <h3 className="text-sm font-semibold text-gray-700 mb-3">Technical Details</h3>
//                 <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
//                   <div className="flex items-start gap-2">
//                     <Globe size={16} className="text-gray-400 mt-0.5" />
//                     <div>
//                       <span className="text-gray-600">IP Address: </span>
//                       <span className="text-gray-900 font-mono">{selectedContact.ipAddress || 'N/A'}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Smartphone size={16} className="text-gray-400 mt-0.5" />
//                     <div>
//                       <span className="text-gray-600">User Agent: </span>
//                       <span className="text-gray-900 text-xs break-all">{selectedContact.userAgent || 'N/A'}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="h-full flex items-center justify-center text-gray-500 p-8">
//               <div className="text-center">
//                 <Inbox size={48} className="mx-auto mb-4 text-gray-300" />
//                 <p>Select a message to view details</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminContacts;





// import React, { useState, useEffect } from 'react';
// import { contactAPI } from '../services/api';
// import { format } from 'date-fns';
// import { 
//   Mail, Phone, MessageSquare, 
//   Clock, RefreshCw, Trash2, 
//   Inbox, Eye, CheckCircle, Terminal,
//   ChevronRight, Hash, Globe
// } from 'lucide-react';
// import toast from 'react-hot-toast';

// const AdminContacts = () => {
//   const [contacts, setContacts] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [expandedId, setExpandedId] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => { fetchData(); }, []);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [contactsRes, statsRes] = await Promise.all([
//         contactAPI.getContacts({ limit: 50 }),
//         contactAPI.getContactStats()
//       ]);
//       setContacts(contactsRes.data.data || []);
//       setStats(statsRes.data.data);
//     } catch (error) {
//       toast.error('Sync Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (e, id, status) => {
//     e.stopPropagation();
//     try {
//       await contactAPI.updateContactStatus(id, status);
//       setContacts(contacts.map(c => c._id === id ? { ...c, status } : c));
//       toast.success(`Status: ${status}`);
//     } catch (error) {
//       toast.error('Update failed');
//     }
//   };

//   if (loading && !refreshing) {
//     return (
//       <div className="h-screen bg-[#0f172a] flex items-center justify-center">
//         <RefreshCw className="animate-spin text-blue-500" size={32} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans pb-20 selection:bg-blue-500/30">
//       {/* Glossy Header */}
//       <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
//         <div className="max-w-5xl mx-auto flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
//               <Terminal size={20} className="text-white" />
//             </div>
//             <div>
//               <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-white">System_Logs</h1>
//               <div className="flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                 <span className="text-[10px] text-slate-400 font-mono">v3.0.4 - LIVE</span>
//               </div>
//             </div>
//           </div>
//           <button 
//             onClick={fetchData} 
//             className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-all active:scale-95"
//           >
//             <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
//             <span className="text-[10px] font-bold tracking-widest">SYNC_DATABASE</span>
//           </button>
//         </div>
//       </header>

//       <main className="max-w-5xl mx-auto px-6 py-12">
        
//         {/* Futuristic Stat Card */}
//         <div className="mb-16 relative">
//           <div className="absolute -left-10 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 to-transparent" />
//           <div className="inline-block relative group">
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
//             <div className="relative bg-[#1e293b] border border-white/10 p-8 rounded-2xl min-w-[280px]">
//               <div className="flex justify-between items-center mb-4">
//                 <Inbox className="text-blue-400" size={24} />
//                 <span className="text-[10px] font-mono text-blue-400/50">DATA_POOL</span>
//               </div>
//               <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Signals</p>
//               <h3 className="text-5xl font-black text-white tracking-tighter">{stats?.total || 0}</h3>
//             </div>
//           </div>
//         </div>

//         {/* Tree List */}
//         <div className="space-y-2">
//           {contacts.map((c, index) => (
//             <div key={c._id} className="relative group">
//               {/* Vertical Connector */}
//               <div className="absolute left-[19px] top-0 bottom-0 w-px bg-slate-800 group-last:h-5" />
              
//               <div className="flex gap-8 relative">
//                 {/* Node Dot */}
//                 <div className={`mt-6 h-[10px] w-[10px] rounded-full border-2 z-10 transition-all duration-500 ${
//                   c.status === 'unread' 
//                   ? 'bg-blue-500 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
//                   : 'bg-[#0f172a] border-slate-700'
//                 }`} />

//                 {/* Content Card */}
//                 <div 
//                   onClick={() => setExpandedId(expandedId === c._id ? null : c._id)}
//                   className={`flex-1 mb-2 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
//                     expandedId === c._id 
//                     ? 'bg-[#1e293b] border-blue-500/50 shadow-2xl shadow-blue-900/20 translate-x-2' 
//                     : 'bg-[#1e293b]/40 border-white/5 hover:border-white/10 hover:bg-[#1e293b]/60'
//                   }`}
//                 >
//                   <div className="p-5 flex justify-between items-center">
//                     <div className="flex items-center gap-4">
//                       <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-xs">
//                         {c.name.charAt(0).toUpperCase()}
//                       </div>
//                       <div>
//                         <h4 className={`text-sm font-bold tracking-tight transition-colors ${expandedId === c._id ? 'text-white' : 'text-slate-300'}`}>
//                           {c.name}
//                         </h4>
//                         <div className="flex items-center gap-3 mt-1">
//                           <span className="text-[10px] font-mono text-slate-500 uppercase">{format(new Date(c.createdAt), 'HH:mm:ss')}</span>
//                           <span className="h-1 w-1 rounded-full bg-slate-700" />
//                           <span className="text-[10px] font-mono text-slate-500 italic">{c._id.slice(-6)}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-4">
//                       <div className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tighter border ${
//                         c.status === 'unread' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-500'
//                       }`}>
//                         {c.status}
//                       </div>
//                       <ChevronRight size={18} className={`text-slate-600 transition-transform duration-300 ${expandedId === c._id ? 'rotate-90 text-blue-400' : ''}`} />
//                     </div>
//                   </div>

//                   {/* Inline Expanded Tree */}
//                   {expandedId === c._id && (
//                     <div className="px-5 pb-6 animate-in slide-in-from-top-4 duration-300">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pt-4 border-t border-white/5">
//                         <div className="flex items-center gap-3 text-slate-400 bg-black/20 p-3 rounded-xl border border-white/5">
//                           <Phone size={14} className="text-blue-400" />
//                           <span className="text-xs font-mono">{c.phone}</span>
//                         </div>
//                         <div className="flex items-center gap-3 text-slate-400 bg-black/20 p-3 rounded-xl border border-white/5">
//                           <Globe size={14} className="text-indigo-400" />
//                           <span className="text-[10px] font-mono truncate">{c.userAgent?.split(' ')[0]}</span>
//                         </div>
//                       </div>

//                       <div className="relative">
//                         <div className="absolute -left-2 top-0 bottom-0 w-1 bg-blue-500/20 rounded-full" />
//                         <div className="bg-black/40 p-5 rounded-xl border border-white/5 text-sm leading-relaxed text-slate-300 italic font-light">
//                           "{c.message}"
//                         </div>
//                       </div>

//                       <div className="mt-6 flex justify-between items-center">
//                         <div className="flex gap-2">
//                           <MiniAction onClick={(e) => updateStatus(e, c._id, 'read')} icon={<Eye size={14}/>} label="MARK_READ" />
//                           <MiniAction onClick={(e) => updateStatus(e, c._id, 'replied')} icon={<CheckCircle size={14}/>} label="RESOLVED" color="hover:text-emerald-400" />
//                         </div>
//                         <button 
//                           onClick={(e) => { e.stopPropagation(); /* delete logic */ }}
//                           className="flex items-center gap-2 text-[10px] font-bold text-rose-500/50 hover:text-rose-500 transition-colors"
//                         >
//                           <Trash2 size={12}/> PURGE_DATA
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// // Sub-component for buttons
// const MiniAction = ({ onClick, icon, label, color = "hover:text-blue-400" }) => (
//   <button 
//     onClick={onClick} 
//     className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 text-[9px] font-black tracking-widest transition-all ${color} hover:bg-white/10`}
//   >
//     {icon} {label}
//   </button>
// );

// export default AdminContacts;



import React, { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import { format } from 'date-fns';
import { 
  Mail, Phone, MessageSquare, 
  Clock, RefreshCw, Trash2, 
  Inbox, Eye, CheckCircle, Terminal,
  ChevronRight, Hash, Globe
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [contactsRes, statsRes] = await Promise.all([
        contactAPI.getContacts({ limit: 50 }),
        contactAPI.getContactStats()
      ]);
      setContacts(contactsRes.data.data || []);
      setStats(statsRes.data.data);
    } catch (error) {
      toast.error('Sync Error');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (e, id, status) => {
    e.stopPropagation();
    try {
      await contactAPI.updateContactStatus(id, status);
      setContacts(contacts.map(c => c._id === id ? { ...c, status } : c));
      toast.success(`Status: ${status}`);
    } catch (error) {
      toast.error('Update failed');
    }
  };

  if (loading && !refreshing) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <RefreshCw className="animate-spin text-white" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans pb-20 selection:bg-white selection:text-black">
      {/* Black & White Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Terminal size={20} className="text-black" />
            </div>
            <div>
              <h1 className="text-sm font-bold uppercase tracking-[0.2em]">System_Logs</h1>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] text-zinc-500 font-mono">v3.0.4 - LIVE</span>
              </div>
            </div>
          </div>
          <button 
            onClick={fetchData} 
            className="group flex items-center gap-2 bg-white text-black px-3 md:px-4 py-2 rounded-lg transition-all active:scale-95"
          >
            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-[9px] md:text-[10px] font-black tracking-widest">SYNC</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* Minimalist Stat Card */}
        <div className="mb-12 relative">
          <div className="absolute -left-4 md:-left-10 top-0 bottom-0 w-px bg-zinc-800" />
          <div className="inline-block relative group w-full md:w-auto">
            <div className="relative bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-2xl md:min-w-[280px]">
              <div className="flex justify-between items-center mb-4">
                <Inbox className="text-white" size={24} />
                <span className="text-[10px] font-mono text-zinc-600">DATA_POOL</span>
              </div>
              <p className="text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total Signals</p>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter">{stats?.total || 0}</h3>
            </div>
          </div>
        </div>

        {/* Tree List */}
        <div className="space-y-1">
          {contacts.map((c) => (
            <div key={c._id} className="relative group">
              {/* Vertical Connector */}
              <div className="absolute left-[14px] md:left-[19px] top-0 bottom-0 w-px bg-zinc-800 group-last:h-6" />
              
              <div className="flex gap-4 md:gap-8 relative">
                {/* Node Dot */}
                <div className={`mt-6 h-[8px] w-[8px] md:h-[10px] md:w-[10px] rounded-full border z-10 transition-all duration-500 ${
                  c.status === 'unread' 
                  ? 'bg-white border-white shadow-[0_0_12px_rgba(255,255,255,0.8)]' 
                  : 'bg-black border-zinc-700'
                }`} />

                {/* Content Card */}
                <div 
                  onClick={() => setExpandedId(expandedId === c._id ? null : c._id)}
                  className={`flex-1 mb-2 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    expandedId === c._id 
                    ? 'bg-zinc-900 border-white/40 shadow-2xl translate-x-1' 
                    : 'bg-zinc-900/40 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="p-4 md:p-5 flex justify-between items-center">
                    <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white text-black flex items-center justify-center font-black text-xs shrink-0">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <h4 className={`text-xs md:text-sm font-bold tracking-tight truncate ${expandedId === c._id ? 'text-white' : 'text-zinc-400'}`}>
                          {c.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-mono text-zinc-600">{format(new Date(c.createdAt), 'HH:mm:ss')}</span>
                          <span className="text-[9px] font-mono text-zinc-700 hidden md:inline">[{c._id.slice(-6)}]</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 shrink-0">
                      <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${
                        c.status === 'unread' ? 'bg-white text-black border-white' : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                      }`}>
                        {c.status}
                      </div>
                      <ChevronRight size={16} className={`text-zinc-700 transition-transform duration-300 ${expandedId === c._id ? 'rotate-90 text-white' : ''}`} />
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedId === c._id && (
                    <div className="px-4 md:px-5 pb-6 animate-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-3 text-zinc-400 bg-black p-3 rounded-xl border border-white/5">
                          <Phone size={14} className="text-white" />
                          <span className="text-[11px] font-mono">{c.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-zinc-400 bg-black p-3 rounded-xl border border-white/5">
                          <Globe size={14} className="text-zinc-500" />
                          <span className="text-[9px] font-mono truncate">{c.userAgent?.split(' ')[0]}</span>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-white rounded-full" />
                        <div className="bg-black/40 p-4 md:p-5 rounded-xl border border-white/5 text-xs md:text-sm leading-relaxed text-zinc-300 italic font-light">
                          "{c.message}"
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3 justify-between items-center">
                        <div className="flex gap-2">
                          <MiniAction onClick={(e) => updateStatus(e, c._id, 'read')} icon={<Eye size={12}/>} label="READ" />
                          <MiniAction onClick={(e) => updateStatus(e, c._id, 'replied')} icon={<CheckCircle size={12}/>} label="RESOLVE" invert />
                        </div>
                        <button 
                          className="text-[9px] font-black text-zinc-700 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1"
                        >
                          <Trash2 size={12}/> Purge
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const MiniAction = ({ onClick, icon, label, invert = false }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black tracking-widest transition-all ${
      invert 
      ? 'bg-white text-black border-white' 
      : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-white hover:text-white'
    }`}
  >
    {icon} {label}
  </button>
);

export default AdminContacts;