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
//       <div className="h-screen bg-black flex items-center justify-center">
//         <RefreshCw className="animate-spin text-white" size={32} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white font-sans pb-20 selection:bg-white selection:text-black">
//       {/* Black & White Header */}
//       <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 md:px-6 py-4">
//         <div className="max-w-5xl mx-auto flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
//               <Terminal size={20} className="text-black" />
//             </div>
//             <div>
//               <h1 className="text-sm font-bold uppercase tracking-[0.2em]">System_Logs</h1>
//               <div className="flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
//                 <span className="text-[10px] text-zinc-500 font-mono">v3.0.4 - LIVE</span>
//               </div>
//             </div>
//           </div>
//           <button 
//             onClick={fetchData} 
//             className="group flex items-center gap-2 bg-white text-black px-3 md:px-4 py-2 rounded-lg transition-all active:scale-95"
//           >
//             <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
//             <span className="text-[9px] md:text-[10px] font-black tracking-widest">SYNC</span>
//           </button>
//         </div>
//       </header>

//       <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
//         {/* Minimalist Stat Card */}
//         <div className="mb-12 relative">
//           <div className="absolute -left-4 md:-left-10 top-0 bottom-0 w-px bg-zinc-800" />
//           <div className="inline-block relative group w-full md:w-auto">
//             <div className="relative bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-2xl md:min-w-[280px]">
//               <div className="flex justify-between items-center mb-4">
//                 <Inbox className="text-white" size={24} />
//                 <span className="text-[10px] font-mono text-zinc-600">DATA_POOL</span>
//               </div>
//               <p className="text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total Signals</p>
//               <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter">{stats?.total || 0}</h3>
//             </div>
//           </div>
//         </div>

//         {/* Tree List */}
//         <div className="space-y-1">
//           {contacts.map((c) => (
//             <div key={c._id} className="relative group">
//               {/* Vertical Connector */}
//               <div className="absolute left-[14px] md:left-[19px] top-0 bottom-0 w-px bg-zinc-800 group-last:h-6" />
              
//               <div className="flex gap-4 md:gap-8 relative">
//                 {/* Node Dot */}
//                 <div className={`mt-6 h-[8px] w-[8px] md:h-[10px] md:w-[10px] rounded-full border z-10 transition-all duration-500 ${
//                   c.status === 'unread' 
//                   ? 'bg-white border-white shadow-[0_0_12px_rgba(255,255,255,0.8)]' 
//                   : 'bg-black border-zinc-700'
//                 }`} />

//                 {/* Content Card */}
//                 <div 
//                   onClick={() => setExpandedId(expandedId === c._id ? null : c._id)}
//                   className={`flex-1 mb-2 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
//                     expandedId === c._id 
//                     ? 'bg-zinc-900 border-white/40 shadow-2xl translate-x-1' 
//                     : 'bg-zinc-900/40 border-white/5 hover:border-white/20'
//                   }`}
//                 >
//                   <div className="p-4 md:p-5 flex justify-between items-center">
//                     <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
//                       <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white text-black flex items-center justify-center font-black text-xs shrink-0">
//                         {c.name.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="truncate">
//                         <h4 className={`text-xs md:text-sm font-bold tracking-tight truncate ${expandedId === c._id ? 'text-white' : 'text-zinc-400'}`}>
//                           {c.name}
//                         </h4>
//                         <div className="flex items-center gap-2 mt-1">
//                           <span className="text-[9px] font-mono text-zinc-600">{format(new Date(c.createdAt), 'HH:mm:ss')}</span>
//                           <span className="text-[9px] font-mono text-zinc-700 hidden md:inline">[{c._id.slice(-6)}]</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 md:gap-4 shrink-0">
//                       <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${
//                         c.status === 'unread' ? 'bg-white text-black border-white' : 'bg-zinc-800 text-zinc-500 border-zinc-700'
//                       }`}>
//                         {c.status}
//                       </div>
//                       <ChevronRight size={16} className={`text-zinc-700 transition-transform duration-300 ${expandedId === c._id ? 'rotate-90 text-white' : ''}`} />
//                     </div>
//                   </div>

//                   {/* Expanded Content */}
//                   {expandedId === c._id && (
//                     <div className="px-4 md:px-5 pb-6 animate-in slide-in-from-top-2 duration-300">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 pt-4 border-t border-white/5">
//                         <div className="flex items-center gap-3 text-zinc-400 bg-black p-3 rounded-xl border border-white/5">
//                           <Phone size={14} className="text-white" />
//                           <span className="text-[11px] font-mono">{c.phone}</span>
//                         </div>
//                         <div className="flex items-center gap-3 text-zinc-400 bg-black p-3 rounded-xl border border-white/5">
//                           <Globe size={14} className="text-zinc-500" />
//                           <span className="text-[9px] font-mono truncate">{c.userAgent?.split(' ')[0]}</span>
//                         </div>
//                       </div>

//                       <div className="relative">
//                         <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-white rounded-full" />
//                         <div className="bg-black/40 p-4 md:p-5 rounded-xl border border-white/5 text-xs md:text-sm leading-relaxed text-zinc-300 italic font-light">
//                           "{c.message}"
//                         </div>
//                       </div>

//                       <div className="mt-6 flex flex-wrap gap-3 justify-between items-center">
//                         <div className="flex gap-2">
//                           <MiniAction onClick={(e) => updateStatus(e, c._id, 'read')} icon={<Eye size={12}/>} label="READ" />
//                           <MiniAction onClick={(e) => updateStatus(e, c._id, 'replied')} icon={<CheckCircle size={12}/>} label="RESOLVE" invert />
//                         </div>
//                         <button 
//                           className="text-[9px] font-black text-zinc-700 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1"
//                         >
//                           <Trash2 size={12}/> Purge
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

// const MiniAction = ({ onClick, icon, label, invert = false }) => (
//   <button 
//     onClick={onClick} 
//     className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black tracking-widest transition-all ${
//       invert 
//       ? 'bg-white text-black border-white' 
//       : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-white hover:text-white'
//     }`}
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
      <div className="h-screen bg-red-950 flex flex-col items-center justify-center gap-4">
        <RefreshCw className="animate-spin text-red-500" size={40} />
        <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] animate-pulse">Initializing_Logs</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-950 text-red-50 font-sans pb-20 selection:bg-red-500 selection:text-white">
      {/* Red Theme Header */}
      <header className="sticky top-0 z-50 bg-red-950/80 backdrop-blur-md border-b border-red-900 px-4 md:px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-red-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <Terminal size={20} className="text-red-950" />
            </div>
            <div>
              <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-white">System_Logs</h1>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] text-red-800 font-mono">v3.0.4 - SECURE</span>
              </div>
            </div>
          </div>
          <button 
            onClick={fetchData} 
            className="group flex items-center gap-2 bg-red-600 text-red-950 px-3 md:px-4 py-2 rounded-lg transition-all active:scale-95 hover:bg-red-500 shadow-lg shadow-red-600/20"
          >
            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-[9px] md:text-[10px] font-black tracking-widest uppercase">SYNC</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        
        {/* Minimalist Stat Card */}
        <div className="mb-12 relative">
          <div className="absolute -left-4 md:-left-10 top-0 bottom-0 w-px bg-red-900" />
          <div className="inline-block relative group w-full md:w-auto">
            <div className="relative bg-red-900/10 border border-red-500/10 p-6 md:p-8 rounded-2xl md:min-w-[280px] backdrop-blur-sm shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <Inbox className="text-red-500" size={24} />
                <span className="text-[10px] font-mono text-red-900 uppercase font-black">DATA_POOL</span>
              </div>
              <p className="text-[11px] font-black text-red-800 uppercase tracking-widest mb-1">Total Signals</p>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter shadow-red-500/20">{stats?.total || 0}</h3>
            </div>
          </div>
        </div>

        {/* Tree List */}
        <div className="space-y-1">
          {contacts.map((c) => (
            <div key={c._id} className="relative group">
              {/* Vertical Connector */}
              <div className="absolute left-[14px] md:left-[19px] top-0 bottom-0 w-px bg-red-900 group-last:h-6" />
              
              <div className="flex gap-4 md:gap-8 relative">
                {/* Node Dot */}
                <div className={`mt-6 h-[8px] w-[8px] md:h-[10px] md:w-[10px] rounded-full border z-10 transition-all duration-500 ${
                  c.status === 'unread' 
                  ? 'bg-red-500 border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.8)]' 
                  : 'bg-red-950 border-red-900'
                }`} />

                {/* Content Card */}
                <div 
                  onClick={() => setExpandedId(expandedId === c._id ? null : c._id)}
                  className={`flex-1 mb-2 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    expandedId === c._id 
                    ? 'bg-red-900/20 border-red-500/40 shadow-2xl translate-x-1' 
                    : 'bg-red-900/10 border-red-500/5 hover:border-red-500/20'
                  }`}
                >
                  <div className="p-4 md:p-5 flex justify-between items-center">
                    <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                      <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-red-600 text-red-950 flex items-center justify-center font-black text-xs shrink-0 shadow-lg">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <h4 className={`text-xs md:text-sm font-bold tracking-tight truncate ${expandedId === c._id ? 'text-white' : 'text-red-200/60'}`}>
                          {c.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-mono text-red-800">{format(new Date(c.createdAt), 'HH:mm:ss')}</span>
                          <span className="text-[9px] font-mono text-red-900 hidden md:inline">[{c._id.slice(-6).toUpperCase()}]</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 shrink-0">
                      <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${
                        c.status === 'unread' ? 'bg-red-600 text-red-950 border-red-500 shadow-lg' : 'bg-red-950 text-red-900 border-red-900'
                      }`}>
                        {c.status}
                      </div>
                      <ChevronRight size={16} className={`text-red-900 transition-transform duration-300 ${expandedId === c._id ? 'rotate-90 text-red-500' : ''}`} />
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedId === c._id && (
                    <div className="px-4 md:px-5 pb-6 animate-in slide-in-from-top-2 duration-300 bg-red-950/20 backdrop-blur-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 pt-4 border-t border-red-500/10">
                        <div className="flex items-center gap-3 text-red-400 bg-red-950/40 p-3 rounded-xl border border-red-500/5">
                          <Phone size={14} className="text-red-500" />
                          <span className="text-[11px] font-mono font-bold tracking-tight">{c.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-red-800 bg-red-950/40 p-3 rounded-xl border border-red-500/5">
                          <Globe size={14} className="text-red-900" />
                          <span className="text-[9px] font-mono truncate">{c.userAgent?.split(' ')[0]}</span>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-2 top-0 bottom-0 w-0.5 bg-red-600 rounded-full" />
                        <div className="bg-red-950/60 p-4 md:p-5 rounded-xl border border-red-500/10 text-xs md:text-sm leading-relaxed text-red-100 italic font-medium shadow-inner">
                          "{c.message}"
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3 justify-between items-center">
                        <div className="flex gap-2">
                          <MiniAction onClick={(e) => updateStatus(e, c._id, 'read')} icon={<Eye size={12}/>} label="MARK_READ" />
                          <MiniAction onClick={(e) => updateStatus(e, c._id, 'replied')} icon={<CheckCircle size={12}/>} label="RESOLVE" invert />
                        </div>
                        <button 
                          className="text-[9px] font-black text-red-900 hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-1 group"
                        >
                          <Trash2 size={12} className="group-hover:animate-bounce" /> PURGE_LOG
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
    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black tracking-widest transition-all shadow-lg active:scale-90 ${
      invert 
      ? 'bg-red-600 text-red-950 border-red-500 hover:bg-white hover:border-white' 
      : 'bg-transparent text-red-800 border-red-900 hover:border-red-500 hover:text-red-500'
    }`}
  >
    {icon} {label}
  </button>
);

export default AdminContacts;