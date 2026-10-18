
// import { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { theme } from '../../config/theme.js';
// import { renderDynamicIcon } from './Sidebar.jsx';
// import * as notificationApi from '../../features/notifications/notifications.api.js';

// export default function BottomBar({ menu = [] }) {
//   const items = menu.slice(0, 5);
//   const location = useLocation();
//   const [unreadCount, setUnreadCount] = useState(0);

//   // ✅ Fetch once on mount + when page becomes visible (no interval)
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     const canReceive = ['EMPLOYEE', 'CLF'].includes(user.role);
//     if (!canReceive) return;

//     let mounted = true;

//     const fetchUnread = async () => {
//       try {
//         const { data } = await notificationApi.unreadCount();
//         if (mounted) setUnreadCount(data?.data?.count || 0);
//       } catch (err) {
//         // Silent fail — 429 ya network error
//       }
//     };

//     fetchUnread();

//     // ✅ Refresh jab user tab wapas focus kare
//     const onFocus = () => fetchUnread();
//     window.addEventListener('focus', onFocus);

//     return () => {
//       mounted = false;
//       window.removeEventListener('focus', onFocus);
//     };
//   }, []);

//   // ✅ Refresh unread count jab route change ho
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     const canReceive = ['EMPLOYEE', 'CLF'].includes(user.role);
//     if (!canReceive) return;

//     let mounted = true;
//     const fetchUnread = async () => {
//       try {
//         const { data } = await notificationApi.unreadCount();
//         if (mounted) setUnreadCount(data?.data?.count || 0);
//       } catch (err) {
//         // Silent
//       }
//     };
//     fetchUnread();
//     return () => { mounted = false; };
//   }, [location.pathname]);

//   let currentPath = location.pathname;
//   if (currentPath.endsWith('/') && currentPath.length > 1) {
//     currentPath = currentPath.slice(0, -1);
//   }

//   let activeIndex = -1;
//   let longestMatch = 0;

//   items.forEach((item, index) => {
//     let itemPath = item.path || '';
//     if (itemPath.endsWith('/') && itemPath.length > 1) {
//       itemPath = itemPath.slice(0, -1);
//     }

//     const isExact = currentPath === itemPath;
//     const isPrefix = currentPath.startsWith(itemPath + '/');

//     if ((isExact || isPrefix) && itemPath.length > longestMatch) {
//       activeIndex = index;
//       longestMatch = itemPath.length;
//     }
//   });

//   return (
//     <nav
//       className="clf-bottombar"
//       style={{
//         position: 'fixed',
//         bottom: 16,
//         left: 16,
//         right: 16,
//         maxWidth: 500,
//         margin: '0 auto',
//         zIndex: 100,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         padding: '8px 10px',
//         background: theme.colors.sidebarBg || '#ffffff',
//         backdropFilter: 'blur(16px)',
//         border: `1px solid ${theme.colors.border || 'rgba(0, 0, 0, 0.08)'}`,
//         borderRadius: 35,
//         boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
//         transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       }}
//     >
//       {activeIndex !== -1 && (
//         <div
//           style={{
//             position: 'absolute',
//             top: 6,
//             bottom: 6,
//             left: 10,
//             width: `calc((100% - 20px) / ${items.length})`,
//             transform: `translateX(${activeIndex * 100}%)`,
//             background: 'rgba(80, 12, 65, 0.09)',
//             border: '1px solid rgba(80, 12, 65, 0.15)',
//             borderRadius: 24,
//             transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
//             pointerEvents: 'none',
//           }}
//         />
//       )}

//       {items.map((item, index) => {
//         const isActive = activeIndex === index;
//         const isNotifications =
//           (item.label || '').toLowerCase().includes('notification') ||
//           (item.path || '').toLowerCase().includes('notification');

//         const showBadge = isNotifications && unreadCount > 0;

//         return (
//           <Link
//             key={item.path}
//             to={item.path}
//             style={{
//               position: 'relative',
//               zIndex: 10,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               padding: '6px 4px',
//               flex: 1,
//               textDecoration: 'none',
//               color: isActive ? '#500c41' : '#6b7280',
//               transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
//               WebkitTapHighlightColor: 'transparent',
//               borderRadius: 24,
//             }}
//           >
//             <span
//               style={{
//                 position: 'relative',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transition: 'transform 0.25s ease, color 0.25s ease',
//                 transform: isActive ? 'translateY(-1px) scale(1.1)' : 'scale(1)',
//                 color: showBadge
//                   ? '#DC2626'
//                   : isActive
//                   ? '#500c41'
//                   : '#6b7280',
//               }}
//             >
//               {renderDynamicIcon(item, 20)}

//               {showBadge && (
//                 <span
//                   style={{
//                     position: 'absolute',
//                     top: -4,
//                     right: -8,
//                     minWidth: 16,
//                     height: 16,
//                     padding: '0 4px',
//                     background: '#DC2626',
//                     color: '#fff',
//                     fontSize: 10,
//                     fontWeight: 800,
//                     borderRadius: 999,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     lineHeight: 1,
//                     boxShadow: '0 0 0 2px ' + (theme.colors.sidebarBg || '#fff'),
//                     animation: 'notifPulse 1.5s infinite',
//                   }}
//                 >
//                   {unreadCount > 9 ? '9+' : unreadCount}
//                 </span>
//               )}
//             </span>

//             <span
//               style={{
//                 marginTop: 3,
//                 fontSize: 10,
//                 fontWeight: isActive ? 700 : 500,
//                 letterSpacing: '0.2px',
//                 lineHeight: 1.2,
//                 maxWidth: 68,
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 whiteSpace: 'nowrap',
//                 transition: 'color 0.25s ease',
//                 color: showBadge
//                   ? '#DC2626'
//                   : isActive
//                   ? '#500c41'
//                   : '#6b7280',
//               }}
//             >
//               {item.label}
//             </span>
//           </Link>
//         );
//       })}

//       <style>{`
//         @keyframes notifPulse {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.15); }
//         }
//       `}</style>
//     </nav>
//   );
// }



// import { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { theme } from '../../config/theme.js';
// import { renderDynamicIcon } from './Sidebar.jsx';
// import * as notificationApi from '../../features/notifications/notifications.api.js';

// export default function BottomBar({ menu = [] }) {
//   // ✅ BottomBar ke liye custom menu — Profile chahiye, Reports nahi
//   const menuMap = {
//     '/employee': [
//       { label: 'Dashboard', path: '/employee' },
//       { label: 'Work', path: '/employee/work' },
//       { label: 'Attendance', path: '/employee/attendance' },
//       { label: 'Notifications', path: '/employee/notifications' },
//       { label: 'Profile', path: '/employee/profile' },
//     ],
//     '/clf': [
//       { label: 'Dashboard', path: '/clf' },
//       { label: 'Employees', path: '/clf/employees' },
//       { label: 'Work', path: '/clf/work' },
//       { label: 'Notifications', path: '/clf/notifications' },
//       { label: 'Profile', path: '/clf/profile' },
//     ],
//     '/bpm': [
//       { label: 'Dashboard', path: '/bpm' },
//       { label: 'CLFs', path: '/bpm/clfs' },
//       { label: 'Work', path: '/bpm/work' },
//       { label: 'Notifications', path: '/bpm/notifications' },
//       { label: 'Profile', path: '/bpm/profile' },
//     ],
//   };

//   // ✅ Role ke hisab se correct menu lo
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const basePath = `/${(user.role || '').toLowerCase().replace('_', '-')}`;
//   const roleKey =
//     user.role === 'EMPLOYEE' ? '/employee' : user.role === 'CLF' ? '/clf' : user.role === 'BPM' ? '/bpm' : null;

//   const items = roleKey && menuMap[roleKey] ? menuMap[roleKey] : menu.slice(0, 5);

//   const location = useLocation();
//   const [unreadCount, setUnreadCount] = useState(0);

//   /* ─── Fetch unread count ─── */
//   useEffect(() => {
//     const canReceive = ['EMPLOYEE', 'CLF'].includes(user.role);
//     if (!canReceive) return;

//     let mounted = true;

//     const fetchUnread = async () => {
//       try {
//         const { data } = await notificationApi.unreadCount();
//         if (mounted) setUnreadCount(data?.data?.count || 0);
//       } catch (err) {
//         // Silent
//       }
//     };

//     fetchUnread();
//     const onFocus = () => fetchUnread();
//     window.addEventListener('focus', onFocus);

//     return () => {
//       mounted = false;
//       window.removeEventListener('focus', onFocus);
//     };
//   }, [user.role]);

//   /* ─── Refresh on route change ─── */
//   useEffect(() => {
//     const canReceive = ['EMPLOYEE', 'CLF'].includes(user.role);
//     if (!canReceive) return;

//     let mounted = true;
//     const fetchUnread = async () => {
//       try {
//         const { data } = await notificationApi.unreadCount();
//         if (mounted) setUnreadCount(data?.data?.count || 0);
//       } catch (err) {
//         // Silent
//       }
//     };
//     fetchUnread();
//     return () => {
//       mounted = false;
//     };
//   }, [location.pathname, user.role]);

//   /* ─── Active detection ─── */
//   let currentPath = location.pathname;
//   if (currentPath.endsWith('/') && currentPath.length > 1) {
//     currentPath = currentPath.slice(0, -1);
//   }

//   let activeIndex = -1;
//   let longestMatch = 0;

//   items.forEach((item, index) => {
//     let itemPath = item.path || '';
//     if (itemPath.endsWith('/') && itemPath.length > 1) {
//       itemPath = itemPath.slice(0, -1);
//     }

//     const isExact = currentPath === itemPath;
//     const isPrefix = currentPath.startsWith(itemPath + '/');

//     if ((isExact || isPrefix) && itemPath.length > longestMatch) {
//       activeIndex = index;
//       longestMatch = itemPath.length;
//     }
//   });

//   return (
//     <nav
//       className="clf-bottombar"
//       style={{
//         position: 'fixed',
//         bottom: 16,
//         left: 16,
//         right: 16,
//         maxWidth: 500,
//         margin: '0 auto',
//         zIndex: 100,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         padding: '8px 8px',
//         background: theme.colors.sidebarBg || '#ffffff',
//         backdropFilter: 'blur(16px)',
//         border: `1px solid ${theme.colors.border || 'rgba(0, 0, 0, 0.08)'}`,
//         borderRadius: 35,
//         boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
//         transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       }}
//     >
//       {/* Active indicator */}
//       {activeIndex !== -1 && (
//         <div
//           style={{
//             position: 'absolute',
//             top: 6,
//             bottom: 6,
//             left: 8,
//             width: `calc((100% - 16px) / ${items.length})`,
//             transform: `translateX(${activeIndex * 100}%)`,
//             background: 'rgba(80, 12, 65, 0.09)',
//             border: '1px solid rgba(80, 12, 65, 0.15)',
//             borderRadius: 24,
//             transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
//             pointerEvents: 'none',
//           }}
//         />
//       )}

//       {items.map((item, index) => {
//         const isActive = activeIndex === index;
//         const isNotifications =
//           (item.label || '').toLowerCase().includes('notification') ||
//           (item.path || '').toLowerCase().includes('notification');

//         const showBadge = isNotifications && unreadCount > 0;

//         return (
//           <Link
//             key={item.path}
//             to={item.path}
//             style={{
//               position: 'relative',
//               zIndex: 10,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               padding: '6px 2px',
//               flex: 1,
//               minWidth: 0,
//               textDecoration: 'none',
//               color: isActive ? '#500c41' : '#6b7280',
//               transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
//               WebkitTapHighlightColor: 'transparent',
//               borderRadius: 24,
//             }}
//           >
//             <span
//               style={{
//                 position: 'relative',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transition: 'transform 0.25s ease, color 0.25s ease',
//                 transform: isActive ? 'translateY(-1px) scale(1.1)' : 'scale(1)',
//                 color: showBadge
//                   ? '#DC2626'
//                   : isActive
//                   ? '#500c41'
//                   : '#6b7280',
//               }}
//             >
//               {renderDynamicIcon(item, 20)}

//               {showBadge && (
//                 <span
//                   style={{
//                     position: 'absolute',
//                     top: -4,
//                     right: -8,
//                     minWidth: 16,
//                     height: 16,
//                     padding: '0 4px',
//                     background: '#DC2626',
//                     color: '#fff',
//                     fontSize: 10,
//                     fontWeight: 800,
//                     borderRadius: 999,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     lineHeight: 1,
//                     boxShadow:
//                       '0 0 0 2px ' + (theme.colors.sidebarBg || '#fff'),
//                     animation: 'notifPulse 1.5s infinite',
//                   }}
//                 >
//                   {unreadCount > 9 ? '9+' : unreadCount}
//                 </span>
//               )}
//             </span>

//             <span
//               style={{
//                 marginTop: 3,
//                 fontSize: 9,
//                 fontWeight: isActive ? 700 : 500,
//                 letterSpacing: '0.2px',
//                 lineHeight: 1.2,
//                 maxWidth: 60,
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 whiteSpace: 'nowrap',
//                 transition: 'color 0.25s ease',
//                 color: showBadge
//                   ? '#DC2626'
//                   : isActive
//                   ? '#500c41'
//                   : '#6b7280',
//               }}
//             >
//               {item.label}
//             </span>
//           </Link>
//         );
//       })}

//       <style>{`
//         @keyframes notifPulse {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.15); }
//         }
//       `}</style>
//     </nav>
//   );
// }




// import { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { theme } from '../../config/theme.js';
// import { renderDynamicIcon } from './Sidebar.jsx';
// import * as notificationApi from '../../features/notifications/notifications.api.js';

// export default function BottomBar({ menu = [] }) {
//   const location = useLocation();
//   const [unreadCount, setUnreadCount] = useState(0);

//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const ROLE_MENUS = {
//     EMPLOYEE: [
//       { label: 'Dashboard', path: '/employee' },
//       { label: 'Work', path: '/employee/work' },
//       { label: 'Attendance', path: '/employee/attendance' },
//       { label: 'Notifications', path: '/employee/notifications' },
//       { label: 'Profile', path: '/employee/profile' },
      
//     ],
//     CLF: [
//       { label: 'Dashboard', path: '/clf' },
//       { label: 'Employees', path: '/clf/employees' },
//       { label: 'Work', path: '/clf/work' },
//       { label: 'Notifications', path: '/clf/notifications' },
//       { label: 'Profile', path: '/clf/profile' },
//     ],
//     BPM: [
//       { label: 'Dashboard', path: '/bpm' },
//       { label: 'CLFs', path: '/bpm/clfs' },
//       { label: 'Work', path: '/bpm/work' },
//       { label: 'Notifications', path: '/bpm/notifications' },
//       { label: 'Profile', path: '/bpm/profile' },
//     ],
//   };

//   const items =
//     ROLE_MENUS[user.role] && ROLE_MENUS[user.role].length
//       ? ROLE_MENUS[user.role]
//       : menu.slice(0, 5);

//   /* Fetch unread count */
//   useEffect(() => {
//     const canReceive = ['EMPLOYEE', 'CLF'].includes(user.role);
//     if (!canReceive) return;

//     let mounted = true;

//     const fetchUnread = async () => {
//       try {
//         const { data } = await notificationApi.unreadCount();
//         if (mounted) setUnreadCount(data?.data?.count || 0);
//       } catch (err) {
//         // silent
//       }
//     };

//     fetchUnread();
//     const onFocus = () => fetchUnread();
//     window.addEventListener('focus', onFocus);

//     return () => {
//       mounted = false;
//       window.removeEventListener('focus', onFocus);
//     };
//   }, [user.role]);

//   /* Refresh on route change */
//   useEffect(() => {
//     const canReceive = ['EMPLOYEE', 'CLF'].includes(user.role);
//     if (!canReceive) return;

//     let mounted = true;
//     const fetchUnread = async () => {
//       try {
//         const { data } = await notificationApi.unreadCount();
//         if (mounted) setUnreadCount(data?.data?.count || 0);
//       } catch (err) {
//         // silent
//       }
//     };
//     fetchUnread();
//     return () => {
//       mounted = false;
//     };
//   }, [location.pathname, user.role]);

//   /* Active index */
//   let currentPath = location.pathname;
//   if (currentPath.endsWith('/') && currentPath.length > 1) {
//     currentPath = currentPath.slice(0, -1);
//   }

//   let activeIndex = -1;
//   let longestMatch = 0;

//   items.forEach((item, index) => {
//     let itemPath = item.path || '';
//     if (itemPath.endsWith('/') && itemPath.length > 1) {
//       itemPath = itemPath.slice(0, -1);
//     }
//     const isExact = currentPath === itemPath;
//     const isPrefix = currentPath.startsWith(itemPath + '/');
//     if ((isExact || isPrefix) && itemPath.length > longestMatch) {
//       activeIndex = index;
//       longestMatch = itemPath.length;
//     }
//   });

//   /* ✅ Indicator width % */
//   const indicatorWidthPct = 100 / items.length;

//   return (
//     <>
//       <style>{`
//         /* ====== Bottombar Container ====== */
//         .clf-bottombar {
//           position: fixed;
//           bottom: 12px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: calc(100% - 24px);
//           max-width: 560px;
//           z-index: 100;
//           display: flex;
//           align-items: center;
//           justify-content: space-around;
//           padding: 6px 8px;
//           background: var(--clf-bb-bg, #ffffff);
//           backdrop-filter: blur(16px);
//           -webkit-backdrop-filter: blur(16px);
//           border: 1px solid var(--clf-bb-border, rgba(0,0,0,0.08));
//           border-radius: 999px;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         /* ====== Active Indicator (center slide) ====== */
//         .clf-bb-indicator {
//           position: absolute;
//           top: 6px;
//           bottom: 6px;
//           left: 8px;
//           border-radius: 999px;
//           background: rgba(80, 12, 65, 0.09);
//           border: 1px solid rgba(80, 12, 65, 0.15);
//           transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
//                       width 0.35s ease;
//           pointer-events: none;
//           will-change: transform;
//         }

//         /* ====== Each Item ====== */
//         .clf-bb-item {
//           position: relative;
//           z-index: 10;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 6px 2px;
//           flex: 1;
//           min-width: 0;
//           text-decoration: none;
//           transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
//           -webkit-tap-highlight-color: transparent;
//           border-radius: 999px;
//         }

//         .clf-bb-item-icon-wrap {
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: transform 0.25s ease, color 0.25s ease;
//         }

//         .clf-bb-item-label {
//           margin-top: 3px;
//           font-size: 9px;
//           font-weight: 500;
//           letter-spacing: 0.2px;
//           line-height: 1.2;
//           max-width: 64px;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           white-space: nowrap;
//           transition: color 0.25s ease;
//         }

//         /* ====== Very small screens (<340px) — icons only ====== */
//         @media (max-width: 340px) {
//           .clf-bb-item-label {
//             display: none;
//           }
//           .clf-bb-item {
//             padding: 8px 2px;
//           }
//         }

//         /* ====== Small phones (<380px) — tighter ====== */
//         @media (max-width: 380px) {
//           .clf-bottombar {
//             width: calc(100% - 16px);
//             bottom: 10px;
//             padding: 5px 6px;
//           }
//           .clf-bb-item-label {
//             font-size: 8px;
//             max-width: 52px;
//           }
//         }

//         /* ====== Medium phones (380-500px) ====== */
//         @media (min-width: 380px) and (max-width: 500px) {
//           .clf-bb-item-label {
//             font-size: 9px;
//           }
//         }

//         /* ====== Larger phones/tablets (>=500px) ====== */
//         @media (min-width: 500px) {
//           .clf-bb-item-label {
//             font-size: 10px;
//             max-width: 70px;
//           }
//         }

//         /* ====== Notification pulse badge ====== */
//         @keyframes notifPulse {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.15); }
//         }
//         .clf-bb-badge {
//           position: absolute;
//           top: -4px;
//           right: -8px;
//           min-width: 16px;
//           height: 16px;
//           padding: 0 4px;
//           background: #DC2626;
//           color: #fff;
//           font-size: 10px;
//           font-weight: 800;
//           border-radius: 999px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           line-height: 1;
//           animation: notifPulse 1.5s infinite;
//         }
//       `}</style>

//       <nav
//         className="clf-bottombar"
//         style={{
//           '--clf-bb-bg': theme.colors.sidebarBg || '#ffffff',
//           '--clf-bb-border': theme.colors.border || 'rgba(0,0,0,0.08)',
//         }}
//       >
//         {/* ✅ Sliding indicator — center aligned */}
//         {activeIndex !== -1 && (
//           <div
//             className="clf-bb-indicator"
//             style={{
//               width: `calc((100% - 16px) / ${items.length})`,
//               left: `calc(8px + ((100% - 16px) / ${items.length}) * ${activeIndex})`,
//               transform: 'translateX(0)',
//             }}
//           />
//         )}

//         {items.map((item, index) => {
//           const isActive = activeIndex === index;
//           const isNotifications =
//             (item.label || '').toLowerCase().includes('notification') ||
//             (item.path || '').toLowerCase().includes('notification');

//           const showBadge = isNotifications && unreadCount > 0;

//           const iconColor = showBadge
//             ? '#DC2626'
//             : isActive
//             ? '#500c41'
//             : '#6b7280';

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className="clf-bb-item"
//               style={{
//                 color: iconColor,
//               }}
//             >
//               <span
//                 className="clf-bb-item-icon-wrap"
//                 style={{
//                   transform: isActive
//                     ? 'translateY(-1px) scale(1.1)'
//                     : 'scale(1)',
//                   color: iconColor,
//                 }}
//               >
//                 {renderDynamicIcon(item, 20)}

//                 {showBadge && (
//                   <span
//                     className="clf-bb-badge"
//                     style={{
//                       boxShadow:
//                         '0 0 0 2px ' + (theme.colors.sidebarBg || '#fff'),
//                     }}
//                   >
//                     {unreadCount > 9 ? '9+' : unreadCount}
//                   </span>
//                 )}
//               </span>

//               <span
//                 className="clf-bb-item-label"
//                 style={{
//                   fontWeight: isActive ? 700 : 500,
//                   color: iconColor,
//                 }}
//               >
//                 {item.label}
//               </span>
//             </Link>
//           );
//         })}
//       </nav>
//     </>
//   );
// }




// import { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { theme } from '../../config/theme.js';
// import { renderDynamicIcon } from './Sidebar.jsx';
// import * as notificationApi from '../../features/notifications/notifications.api.js';

// export default function BottomBar({ menu = [] }) {
//   const location = useLocation();
//   const [unreadCount, setUnreadCount] = useState(0);

//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const ROLE_MENUS = {
//     EMPLOYEE: [
//       { label: 'Dashboard', path: '/employee' },
//       { label: 'Work', path: '/employee/work' },
//       { label: 'Leaves', path: '/employee/leaves' },
//       { label: 'Notifications', path: '/employee/notifications' },
//       { label: 'Profile', path: '/employee/profile' },
//     ],
//     CLF: [
//       { label: 'Dashboard', path: '/clf' },
//       { label: 'Employees', path: '/clf/employees' },
//       { label: 'Leaves', path: '/clf/leaves' }, // ✅ CLF ke liye Leaves add kiya
//       { label: 'Notifications', path: '/clf/notifications' },
//       { label: 'Profile', path: '/clf/profile' },
//     ],
//     BPM: [
//       { label: 'Dashboard', path: '/bpm' },
//       { label: 'CLFs', path: '/bpm/clfs' },
//       { label: 'Work', path: '/bpm/work' },
//       { label: 'Notifications', path: '/bpm/notifications' },
//       { label: 'Profile', path: '/bpm/profile' },
//     ],
//   };

//   const items =
//     ROLE_MENUS[user.role] && ROLE_MENUS[user.role].length
//       ? ROLE_MENUS[user.role]
//       : menu.slice(0, 5);

//   /* Fetch unread count */
//   useEffect(() => {
//     const canReceive = ['EMPLOYEE', 'CLF'].includes(user.role);
//     if (!canReceive) return;

//     let mounted = true;

//     const fetchUnread = async () => {
//       try {
//         const { data } = await notificationApi.unreadCount();
//         if (mounted) setUnreadCount(data?.data?.count || 0);
//       } catch (err) {
//         // silent
//       }
//     };

//     fetchUnread();
//     const onFocus = () => fetchUnread();
//     window.addEventListener('focus', onFocus);

//     return () => {
//       mounted = false;
//       window.removeEventListener('focus', onFocus);
//     };
//   }, [user.role]);

//   /* Refresh on route change */
//   useEffect(() => {
//     const canReceive = ['EMPLOYEE', 'CLF'].includes(user.role);
//     if (!canReceive) return;

//     let mounted = true;
//     const fetchUnread = async () => {
//       try {
//         const { data } = await notificationApi.unreadCount();
//         if (mounted) setUnreadCount(data?.data?.count || 0);
//       } catch (err) {
//         // silent
//       }
//     };
//     fetchUnread();
//     return () => {
//       mounted = false;
//     };
//   }, [location.pathname, user.role]);

//   /* Active index */
//   let currentPath = location.pathname;
//   if (currentPath.endsWith('/') && currentPath.length > 1) {
//     currentPath = currentPath.slice(0, -1);
//   }

//   let activeIndex = -1;
//   let longestMatch = 0;

//   items.forEach((item, index) => {
//     let itemPath = item.path || '';
//     if (itemPath.endsWith('/') && itemPath.length > 1) {
//       itemPath = itemPath.slice(0, -1);
//     }
//     const isExact = currentPath === itemPath;
//     const isPrefix = currentPath.startsWith(itemPath + '/');
//     if ((isExact || isPrefix) && itemPath.length > longestMatch) {
//       activeIndex = index;
//       longestMatch = itemPath.length;
//     }
//   });

//   const indicatorWidthPct = 100 / items.length;

//   return (
//     <>
//       <style>{`
//         .clf-bottombar {
//           position: fixed;
//           bottom: 12px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: calc(100% - 24px);
//           max-width: 560px;
//           z-index: 100;
//           display: flex;
//           align-items: center;
//           justify-content: space-around;
//           padding: 6px 8px;
//           background: var(--clf-bb-bg, #ffffff);
//           backdrop-filter: blur(16px);
//           -webkit-backdrop-filter: blur(16px);
//           border: 1px solid var(--clf-bb-border, rgba(0,0,0,0.08));
//           border-radius: 999px;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .clf-bb-indicator {
//           position: absolute;
//           top: 6px;
//           bottom: 6px;
//           left: 8px;
//           border-radius: 999px;
//           background: rgba(80, 12, 65, 0.09);
//           border: 1px solid rgba(80, 12, 65, 0.15);
//           transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
//                       width 0.35s ease;
//           pointer-events: none;
//           will-change: transform;
//         }

//         .clf-bb-item {
//           position: relative;
//           z-index: 10;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 6px 2px;
//           flex: 1;
//           min-width: 0;
//           text-decoration: none;
//           transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
//           -webkit-tap-highlight-color: transparent;
//           border-radius: 999px;
//         }

//         .clf-bb-item-icon-wrap {
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: transform 0.25s ease, color 0.25s ease;
//         }

//         .clf-bb-item-label {
//           margin-top: 3px;
//           font-size: 9px;
//           font-weight: 500;
//           letter-spacing: 0.2px;
//           line-height: 1.2;
//           max-width: 64px;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           white-space: nowrap;
//           transition: color 0.25s ease;
//         }

//         @media (max-width: 340px) {
//           .clf-bb-item-label {
//             display: none;
//           }
//           .clf-bb-item {
//             padding: 8px 2px;
//           }
//         }

//         @media (max-width: 380px) {
//           .clf-bottombar {
//             width: calc(100% - 16px);
//             bottom: 10px;
//             padding: 5px 6px;
//           }
//           .clf-bb-item-label {
//             font-size: 8px;
//             max-width: 52px;
//           }
//         }

//         @media (min-width: 380px) and (max-width: 500px) {
//           .clf-bb-item-label {
//             font-size: 9px;
//           }
//         }

//         @media (min-width: 500px) {
//           .clf-bb-item-label {
//             font-size: 10px;
//             max-width: 70px;
//           }
//         }

//         @keyframes notifPulse {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.15); }
//         }
//         .clf-bb-badge {
//           position: absolute;
//           top: -4px;
//           right: -8px;
//           min-width: 16px;
//           height: 16px;
//           padding: 0 4px;
//           background: #DC2626;
//           color: #fff;
//           font-size: 10px;
//           font-weight: 800;
//           border-radius: 999px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           line-height: 1;
//           animation: notifPulse 1.5s infinite;
//         }
//       `}</style>

//       <nav
//         className="clf-bottombar"
//         style={{
//           '--clf-bb-bg': theme.colors.sidebarBg || '#ffffff',
//           '--clf-bb-border': theme.colors.border || 'rgba(0,0,0,0.08)',
//         }}
//       >
//         {activeIndex !== -1 && (
//           <div
//             className="clf-bb-indicator"
//             style={{
//               width: `calc((100% - 16px) / ${items.length})`,
//               left: `calc(8px + ((100% - 16px) / ${items.length}) * ${activeIndex})`,
//               transform: 'translateX(0)',
//             }}
//           />
//         )}

//         {items.map((item, index) => {
//           const isActive = activeIndex === index;
//           const isNotifications =
//             (item.label || '').toLowerCase().includes('notification') ||
//             (item.path || '').toLowerCase().includes('notification');

//           const showBadge = isNotifications && unreadCount > 0;

//           const iconColor = showBadge
//             ? '#DC2626'
//             : isActive
//             ? '#500c41'
//             : '#6b7280';

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className="clf-bb-item"
//               style={{
//                 color: iconColor,
//               }}
//             >
//               <span
//                 className="clf-bb-item-icon-wrap"
//                 style={{
//                   transform: isActive
//                     ? 'translateY(-1px) scale(1.1)'
//                     : 'scale(1)',
//                   color: iconColor,
//                 }}
//               >
//                 {renderDynamicIcon(item, 20)}

//                 {showBadge && (
//                   <span
//                     className="clf-bb-badge"
//                     style={{
//                       boxShadow:
//                         '0 0 0 2px ' + (theme.colors.sidebarBg || '#fff'),
//                     }}
//                   >
//                     {unreadCount > 9 ? '9+' : unreadCount}
//                   </span>
//                 )}
//               </span>

//               <span
//                 className="clf-bb-item-label"
//                 style={{
//                   fontWeight: isActive ? 700 : 500,
//                   color: iconColor,
//                 }}
//               >
//                 {item.label}
//               </span>
//             </Link>
//           );
//         })}
//       </nav>
//     </>
//   );
// }





// import { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { theme } from '../../config/theme.js';
// import { renderDynamicIcon } from './Sidebar.jsx';
// import * as notificationApi from '../../features/notifications/notifications.api.js';

// export default function BottomBar({ menu = [] }) {
//   const location = useLocation();
//   const [unreadCount, setUnreadCount] = useState(0);

//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const ROLE_MENUS = {
//     EMPLOYEE: [
//       { label: 'Dashboard', path: '/employee' },
//       { label: 'Work', path: '/employee/work' },
//       { label: 'Attendance', path: '/employee/attendance' },
//       { label: 'Leaves', path: '/employee/leaves' },
//       { label: 'Notifications', path: '/employee/notifications' },
//       { label: 'Profile', path: '/employee/profile' },
//     ],
//     CLF: [
//       { label: 'Dashboard', path: '/clf' },
//       { label: 'Employees', path: '/clf/employees' },
//       { label: 'Attendance', path: '/clf/attendance' },
//       { label: 'Leaves', path: '/clf/leaves' },
//       { label: 'Notifications', path: '/clf/notifications' },
//       { label: 'Profile', path: '/clf/profile' },
//     ],
//     BPM: [
//       { label: 'Dashboard', path: '/bpm' },
//       { label: 'CLFs', path: '/bpm/clfs' },
//       { label: 'Work', path: '/bpm/work' },
//       { label: 'Notifications', path: '/bpm/notifications' },
//       { label: 'Profile', path: '/bpm/profile' },
//     ],
//   };

//   const items =
//     ROLE_MENUS[user.role] && ROLE_MENUS[user.role].length
//       ? ROLE_MENUS[user.role]
//       : menu.slice(0, 6);

//   useEffect(() => {
//     const canReceive = ['EMPLOYEE', 'CLF'].includes(user.role);
//     if (!canReceive) return;

//     let mounted = true;
//     const fetchUnread = async () => {
//       try {
//         const { data } = await notificationApi.unreadCount();
//         if (mounted) setUnreadCount(data?.data?.count || 0);
//       } catch (err) {
//         // silent
//       }
//     };

//     fetchUnread();
//     const onFocus = () => fetchUnread();
//     window.addEventListener('focus', onFocus);

//     return () => {
//       mounted = false;
//       window.removeEventListener('focus', onFocus);
//     };
//   }, [user.role]);

//   useEffect(() => {
//     const canReceive = ['EMPLOYEE', 'CLF'].includes(user.role);
//     if (!canReceive) return;

//     let mounted = true;
//     const fetchUnread = async () => {
//       try {
//         const { data } = await notificationApi.unreadCount();
//         if (mounted) setUnreadCount(data?.data?.count || 0);
//       } catch (err) {
//         // silent
//       }
//     };
//     fetchUnread();
//     return () => {
//       mounted = false;
//     };
//   }, [location.pathname, user.role]);

//   let currentPath = location.pathname;
//   if (currentPath.endsWith('/') && currentPath.length > 1) {
//     currentPath = currentPath.slice(0, -1);
//   }

//   let activeIndex = -1;
//   let longestMatch = 0;

//   items.forEach((item, index) => {
//     let itemPath = item.path || '';
//     if (itemPath.endsWith('/') && itemPath.length > 1) {
//       itemPath = itemPath.slice(0, -1);
//     }
//     const isExact = currentPath === itemPath;
//     const isPrefix = currentPath.startsWith(itemPath + '/');
//     if ((isExact || isPrefix) && itemPath.length > longestMatch) {
//       activeIndex = index;
//       longestMatch = itemPath.length;
//     }
//   });

//   return (
//     <>
//       <style>{`
//         .clf-bottombar {
//           position: fixed;
//           bottom: 12px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: calc(100% - 24px);
//           max-width: 560px;
//           z-index: 100;
//           display: flex;
//           align-items: center;
//           justify-content: space-around;
//           padding: 6px 8px;
          
//           /* ✅ NAYA COLORS YAHAN USE KIYE HAIN */
//           background: ${theme.colors.bbDarkBrown}; 
//           backdrop-filter: blur(16px);
//           -webkit-backdrop-filter: blur(16px);
//           border: 1px solid ${theme.colors.bbIndigo}50; 
//           border-radius: 999px;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .clf-bb-indicator {
//           position: absolute;
//           top: 6px;
//           bottom: 6px;
//           left: 8px;
//           border-radius: 999px;
          
//           /* ✅ Active Indicator Color */
//           background: ${theme.colors.bbLightCream}30; 
//           border: 1px solid ${theme.colors.bbLightCream}50;
          
//           transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
//                       width 0.35s ease;
//           pointer-events: none;
//           will-change: transform;
//         }

//         .clf-bb-item {
//           position: relative;
//           z-index: 10;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 6px 2px;
//           flex: 1;
//           min-width: 0;
//           text-decoration: none;
//           transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
//           -webkit-tap-highlight-color: transparent;
//           border-radius: 999px;
//         }

//         .clf-bb-item-icon-wrap {
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: transform 0.25s ease, color 0.25s ease;
//         }

//         .clf-bb-item-label {
//           margin-top: 3px;
//           font-size: 8px;
//           font-weight: 500;
//           letter-spacing: 0.2px;
//           line-height: 1.2;
//           max-width: 64px;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           white-space: nowrap;
//           transition: color 0.25s ease;
//         }

//         @media (max-width: 340px) {
//           .clf-bb-item-label {
//             display: none;
//           }
//           .clf-bb-item {
//             padding: 8px 2px;
//           }
//         }

//         @media (max-width: 380px) {
//           .clf-bottombar {
//             width: calc(100% - 16px);
//             bottom: 10px;
//             padding: 5px 4px;
//           }
//           .clf-bb-item-label {
//             font-size: 7.5px;
//             max-width: 50px;
//           }
//         }

//         @media (min-width: 380px) and (max-width: 500px) {
//           .clf-bb-item-label {
//             font-size: 8px;
//           }
//         }

//         @media (min-width: 500px) {
//           .clf-bb-item-label {
//             font-size: 9px;
//             max-width: 70px;
//           }
//         }

//         @keyframes notifPulse {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.15); }
//         }
//         .clf-bb-badge {
//           position: absolute;
//           top: -4px;
//           right: -8px;
//           min-width: 16px;
//           height: 16px;
//           padding: 0 4px;
//           background: ${theme.colors.danger};
//           color: #fff;
//           font-size: 10px;
//           font-weight: 800;
//           border-radius: 999px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           line-height: 1;
//           animation: notifPulse 1.5s infinite;
//         }
//       `}</style>

//       <nav className="clf-bottombar">
//         {activeIndex !== -1 && (
//           <div
//             className="clf-bb-indicator"
//             style={{
//               width: `calc((100% - 16px) / ${items.length})`,
//               left: `calc(8px + ((100% - 16px) / ${items.length}) * ${activeIndex})`,
//               transform: 'translateX(0)',
//             }}
//           />
//         )}

//         {items.map((item, index) => {
//           const isActive = activeIndex === index;
//           const isNotifications =
//             (item.label || '').toLowerCase().includes('notification') ||
//             (item.path || '').toLowerCase().includes('notification');

//           const showBadge = isNotifications && unreadCount > 0;

//           /* ✅ Icon Colors: Active hone par Light Cream, warna Light Lilac */
//           const iconColor = showBadge
//             ? theme.colors.danger
//             : isActive
//             ? theme.colors.bbLightCream
//             : theme.colors.bbLightLilac;

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className="clf-bb-item"
//               style={{ color: iconColor }}
//             >
//               <span
//                 className="clf-bb-item-icon-wrap"
//                 style={{
//                   transform: isActive ? 'translateY(-1px) scale(1.1)' : 'scale(1)',
//                   color: iconColor,
//                 }}
//               >
//                 {renderDynamicIcon(item, 20)}

//                 {showBadge && (
//                   <span
//                     className="clf-bb-badge"
//                     style={{ boxShadow: `0 0 0 2px ${theme.colors.bbDarkBrown}` }}
//                   >
//                     {unreadCount > 9 ? '9+' : unreadCount}
//                   </span>
//                 )}
//               </span>

//               <span
//                 className="clf-bb-item-label"
//                 style={{
//                   fontWeight: isActive ? 700 : 500,
//                   color: iconColor,
//                 }}
//               >
//                 {item.label}
//               </span>
//             </Link>
//           );
//         })}
//       </nav>
//     </>
//   );
// }





// import { useEffect, useState } from 'react';
// import { useLocation, Link, useNavigate } from 'react-router-dom';
// import { theme } from '../../config/theme.js';
// import { renderDynamicIcon } from './Sidebar.jsx';

// export default function BottomBar({ menu = [] }) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const ROLE_MENUS = {
//     EMPLOYEE: [
//       { label: 'Dashboard', path: '/employee' },
//       { label: 'Work', path: '/employee/work' },
//       { label: 'Leaves', path: '/employee/leaves' },
//       { label: 'Attendance', path: '/employee/attendance' },
//     ],
//     CLF: [
//       { label: 'Dashboard', path: '/clf' },
//       { label: 'Employees', path: '/clf/employees' },
//       { label: 'Leaves', path: '/clf/leaves' },
//       { label: 'Attendance', path: '/clf/attendance' },
//     ],
//     BPM: [
//       { label: 'Dashboard', path: '/bpm' },
//       { label: 'CLFs', path: '/bpm/clfs' },
//       { label: 'Work', path: '/bpm/work' },
//       { label: 'Attendance', path: '/bpm/attendance' },
//     ],
//   };

//   const isEmployee = user.role === 'EMPLOYEE';
//   const items = isEmployee 
//     ? ROLE_MENUS.EMPLOYEE 
//     : (ROLE_MENUS[user.role] ? ROLE_MENUS[user.role] : menu.slice(0, 4));

//   // Active Index Calculate
//   let currentPath = location.pathname;
//   if (currentPath.endsWith('/') && currentPath.length > 1) {
//     currentPath = currentPath.slice(0, -1);
//   }

//   // Profile Route dynamic match
//   const profilePath = isEmployee 
//     ? '/employee/profile' 
//     : user.role === 'CLF' 
//     ? '/clf/profile' 
//     : '/bpm/profile';

//   const isProfileActive = currentPath === profilePath || currentPath.startsWith(profilePath + '/');

//   let activeIndex = -1;
//   let longestMatch = 0;

//   // Profile active hone par items loop check ignore karo
//   if (!isProfileActive) {
//     items.forEach((item, index) => {
//       let itemPath = item.path || '';
//       if (itemPath.endsWith('/') && itemPath.length > 1) {
//         itemPath = itemPath.slice(0, -1);
//       }
      
//       const isExact = currentPath === itemPath;
//       const isPrefix = currentPath.startsWith(itemPath + '/');

//       if ((isExact || isPrefix) && itemPath.length > longestMatch) {
//         activeIndex = index;
//         longestMatch = itemPath.length;
//       }
//     });
//   }

//   return (
//     <>
//       <style>{`
//         /* Floating Pill Bottom Bar (Mobile Only) */
//         .custom-bb-container {
//           position: fixed;
//           bottom: 16px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: calc(100% - 24px);
//           max-width: 440px;
//           z-index: 1000;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 8px;
//           font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
//           pointer-events: none;
//           box-sizing: border-box;
//         }

//         .custom-bb-container * {
//           pointer-events: auto;
//         }

//         /* Dark Main Capsule */
//         .custom-bb-main {
//           flex: 1;
//           background: #18181b;
//           border-radius: 999px;
//           padding: 4px 6px;
//           display: flex;
//           align-items: center;
//           justify-content: space-around;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.3);
//           height: 56px;
//           box-sizing: border-box;
//           min-width: 0;
//         }

//         .custom-bb-item {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           height: 100%;
//           text-decoration: none;
//           border-radius: 999px;
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           color: #a1a1aa;
//           position: relative;
//           padding: 0 10px;
//           min-width: 0;
//         }

//         /* Active Item - Solid White Capsule */
//         .custom-bb-item.active {
//           background: #ffffff;
//           color: #18181b;
//           padding: 0 14px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.15);
//         }

//         .custom-bb-icon {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//         }

//         .custom-bb-label {
//           font-size: 13px;
//           font-weight: 600;
//           margin-left: 6px;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         /* Separate Right Circular Button */
//         .custom-bb-circle-btn {
//           width: 56px;
//           height: 56px;
//           background: #18181b;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #a1a1aa;
//           text-decoration: none;
//           box-shadow: 0 10px 30px rgba(0,0,0,0.3);
//           flex-shrink: 0;
//           transition: all 0.3s ease;
//         }

//         .custom-bb-circle-btn.active {
//           background: #ffffff;
//           color: #18181b;
//         }

//         /* Mobile Screen Adjustments */
//         @media (max-width: 380px) {
//           .custom-bb-container {
//             width: calc(100% - 16px);
//             bottom: 12px;
//             gap: 6px;
//           }
//           .custom-bb-main {
//             height: 52px;
//             padding: 3px 4px;
//           }
//           .custom-bb-circle-btn {
//             width: 52px;
//             height: 52px;
//           }
//           .custom-bb-label {
//             font-size: 12px;
//             margin-left: 4px;
//           }
//           .custom-bb-item {
//             padding: 0 8px;
//           }
//           .custom-bb-item.active {
//             padding: 0 10px;
//           }
//         }

//         /* Hide on Desktop Devices */
//         @media (min-width: 768px) {
//           .custom-bb-container {
//             display: none !important;
//           }
//         }
//       `}</style>

//       <div className="custom-bb-container">
//         {/* Main Pill Navbar */}
//         <nav className="custom-bb-main">
//           {items.map((item, index) => {
//             const isActive = activeIndex === index;

//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`custom-bb-item ${isActive ? 'active' : ''}`}
//               >
//                 <span className="custom-bb-icon">
//                   {renderDynamicIcon(item, 20)}
//                 </span>
//                 {isActive && (
//                   <span className="custom-bb-label">{item.label}</span>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Right Profile Circle Button */}
//         <Link
//           to={profilePath}
//           className={`custom-bb-circle-btn ${isProfileActive ? 'active' : ''}`}
//         >
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//             <circle cx="12" cy="7" r="4"></circle>
//           </svg>
//         </Link>
//       </div>
//     </>
//   );
// }




// import { useEffect, useState, useRef } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { theme } from '../../config/theme.js';
// import { renderDynamicIcon } from './Sidebar.jsx';

// export default function BottomBar({ menu = [] }) {
//   const location = useLocation();
  
//   // Sliding animation ke liye states
//   const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
//   const itemRefs = useRef([]);

//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const ROLE_MENUS = {
//     EMPLOYEE: [
//       { label: 'Dashboard', path: '/employee' },
//       { label: 'Work', path: '/employee/work' },
//       { label: 'Leaves', path: '/employee/leaves' },
//       { label: 'Attendance', path: '/employee/attendance' },
//     ],
//     CLF: [
//       { label: 'Dashboard', path: '/clf' },
//       { label: 'Employees', path: '/clf/employees' },
//       { label: 'Leaves', path: '/clf/leaves' },
//       { label: 'Attendance', path: '/clf/attendance' },
//     ],
//     BPM: [
//       { label: 'Dashboard', path: '/bpm' },
//       { label: 'CLFs', path: '/bpm/clfs' },
//       { label: 'Work', path: '/bpm/work' },
//       { label: 'Attendance', path: '/bpm/attendance' },
//     ],
//   };

//   const isEmployee = user.role === 'EMPLOYEE';
//   const items = isEmployee 
//     ? ROLE_MENUS.EMPLOYEE 
//     : (ROLE_MENUS[user.role] ? ROLE_MENUS[user.role] : menu.slice(0, 4));

//   // Active Index Calculate
//   let currentPath = location.pathname;
//   if (currentPath.endsWith('/') && currentPath.length > 1) {
//     currentPath = currentPath.slice(0, -1);
//   }

//   const profilePath = isEmployee 
//     ? '/employee/profile' 
//     : user.role === 'CLF' 
//     ? '/clf/profile' 
//     : '/bpm/profile';

//   const isProfileActive = currentPath === profilePath || currentPath.startsWith(profilePath + '/');

//   let activeIndex = -1;
//   let longestMatch = 0;

//   if (!isProfileActive) {
//     items.forEach((item, index) => {
//       let itemPath = item.path || '';
//       if (itemPath.endsWith('/') && itemPath.length > 1) {
//         itemPath = itemPath.slice(0, -1);
//       }
      
//       const isExact = currentPath === itemPath;
//       const isPrefix = currentPath.startsWith(itemPath + '/');

//       if ((isExact || isPrefix) && itemPath.length > longestMatch) {
//         activeIndex = index;
//         longestMatch = itemPath.length;
//       }
//     });
//   }

//   // ✅ SLIDING ANIMATION LOGIC
//   useEffect(() => {
//     // Agar profile active hai to slider hide kar do
//     if (isProfileActive || activeIndex === -1) {
//       setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
//       return;
//     }

//     const updateSlider = () => {
//       const activeEl = itemRefs.current[activeIndex];
//       if (activeEl) {
//         setSliderStyle({
//           left: activeEl.offsetLeft,
//           width: activeEl.offsetWidth,
//           opacity: 1,
//         });
//       }
//     };

//     // Thoda delay taaki DOM update ho jaye aur text expand ho sake
//     setTimeout(updateSlider, 50);

//     // Window resize par bhi adjust karo
//     window.addEventListener('resize', updateSlider);
//     return () => window.removeEventListener('resize', updateSlider);
//   }, [activeIndex, isProfileActive]);

//   return (
//     <>
//       <style>{`
//         .custom-bb-container {
//           position: fixed;
//           bottom: 16px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: calc(100% - 24px);
//           max-width: 440px;
//           z-index: 1000;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 8px;
//           font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
//           pointer-events: none;
//           box-sizing: border-box;
//         }

//         .custom-bb-container * {
//           pointer-events: auto;
//         }

//         /* Dark Main Capsule */
//         .custom-bb-main {
//           flex: 1;
//           background: ${theme.colors.bbDarkBrown}; 
//           border-radius: 999px;
//           padding: 4px 6px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           box-shadow: ${theme.shadow.lg};
//           height: 56px;
//           box-sizing: border-box;
//           min-width: 0;
//           border: 1px solid ${theme.colors.bbIndigo}40;
//           position: relative; /* Slider ke liye zaroori */
//         }

//         /* ✅ Floating White Slider Background */
//         .custom-bb-slider {
//           position: absolute;
//           top: 4px;
//           bottom: 4px;
//           background: ${theme.colors.surface};
//           border-radius: 999px;
//           box-shadow: ${theme.shadow.sm};
//           transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
//           z-index: 1;
//           pointer-events: none;
//         }

//         .custom-bb-item {
//           position: relative;
//           z-index: 2; /* Slider ke upar dikhne ke liye */
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           height: 100%;
//           text-decoration: none;
//           border-radius: 999px;
//           transition: color 0.3s ease;
//           color: ${theme.colors.bbLightLilac}; 
//           padding: 0 10px;
//           min-width: 0;
//           white-space: nowrap;
//         }

//         /* Active Item */
//         .custom-bb-item.active {
//           color: ${theme.colors.bbDarkBrown};
//           padding: 0 14px;
//         }

//         .custom-bb-icon {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//         }

//         .custom-bb-label {
//           font-size: 13px;
//           font-weight: 700;
//           margin-left: 6px;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         /* Right Circular Button */
//         .custom-bb-circle-btn {
//           width: 56px;
//           height: 56px;
//           background: ${theme.colors.bbDarkBrown};
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: ${theme.colors.bbLightLilac};
//           text-decoration: none;
//           box-shadow: ${theme.shadow.lg};
//           flex-shrink: 0;
//           transition: all 0.3s ease;
//           border: 1px solid ${theme.colors.bbIndigo}40;
//         }

//         .custom-bb-circle-btn.active {
//           background: ${theme.colors.surface};
//           color: ${theme.colors.bbDarkBrown};
//         }

//         @media (max-width: 380px) {
//           .custom-bb-container {
//             width: calc(100% - 16px);
//             bottom: 12px;
//             gap: 6px;
//           }
//           .custom-bb-main {
//             height: 52px;
//             padding: 3px 4px;
//           }
//           .custom-bb-circle-btn {
//             width: 52px;
//             height: 52px;
//           }
//           .custom-bb-label {
//             font-size: 12px;
//             margin-left: 4px;
//           }
//           .custom-bb-item {
//             padding: 0 8px;
//           }
//           .custom-bb-item.active {
//             padding: 0 10px;
//           }
//         }

//         @media (min-width: 768px) {
//           .custom-bb-container {
//             display: none !important;
//           }
//         }
//       `}</style>

//       <div className="custom-bb-container">
//         <nav className="custom-bb-main">
          
//           {/* ✅ The Sliding Background */}
//           <div 
//             className="custom-bb-slider" 
//             style={{
//               left: `${sliderStyle.left}px`,
//               width: `${sliderStyle.width}px`,
//               opacity: sliderStyle.opacity
//             }}
//           />

//           {items.map((item, index) => {
//             const isActive = activeIndex === index;

//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 ref={(el) => (itemRefs.current[index] = el)} // ✅ Ref store kiya
//                 className={`custom-bb-item ${isActive ? 'active' : ''}`}
//               >
//                 <span className="custom-bb-icon">
//                   {renderDynamicIcon(item, 20)}
//                 </span>
//                 {isActive && (
//                   <span className="custom-bb-label">{item.label}</span>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         <Link
//           to={profilePath}
//           className={`custom-bb-circle-btn ${isProfileActive ? 'active' : ''}`}
//         >
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//             <circle cx="12" cy="7" r="4"></circle>
//           </svg>
//         </Link>
//       </div>
//     </>
//   );
// }



// import { useEffect, useState, useRef } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { theme } from '../../config/theme.js';
// import { renderDynamicIcon } from './Sidebar.jsx';

// export default function BottomBar({ menu = [] }) {
//   const location = useLocation();
  
//   // Sliding animation ke liye states
//   const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
//   const itemRefs = useRef([]);

//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const ROLE_MENUS = {
//     EMPLOYEE: [
//       { label: 'Dashboard', path: '/employee' },
//       { label: 'Work', path: '/employee/work' },
//       { label: 'Leaves', path: '/employee/leaves' },
//       { label: 'Attendance', path: '/employee/attendance' },
//     ],
//     CLF: [
//       { label: 'Dashboard', path: '/clf' },
//       { label: 'Employees', path: '/clf/employees' },
//       { label: 'Leaves', path: '/clf/leaves' },
//       { label: 'Attendance', path: '/clf/attendance' },
//     ],
//     BPM: [
//       { label: 'Dashboard', path: '/bpm' },
//       { label: 'CLFs', path: '/bpm/clfs' },
//       { label: 'Work', path: '/bpm/work' },
//       { label: 'Attendance', path: '/bpm/attendance' },
//     ],
//   };

//   const isEmployee = user.role === 'EMPLOYEE';
//   const items = isEmployee 
//     ? ROLE_MENUS.EMPLOYEE 
//     : (ROLE_MENUS[user.role] ? ROLE_MENUS[user.role] : menu.slice(0, 4));

//   // Active Index Calculate
//   let currentPath = location.pathname;
//   if (currentPath.endsWith('/') && currentPath.length > 1) {
//     currentPath = currentPath.slice(0, -1);
//   }

//   const profilePath = isEmployee 
//     ? '/employee/profile' 
//     : user.role === 'CLF' 
//     ? '/clf/profile' 
//     : '/bpm/profile';

//   const isProfileActive = currentPath === profilePath || currentPath.startsWith(profilePath + '/');

//   let activeIndex = -1;
//   let longestMatch = 0;

//   if (!isProfileActive) {
//     items.forEach((item, index) => {
//       let itemPath = item.path || '';
//       if (itemPath.endsWith('/') && itemPath.length > 1) {
//         itemPath = itemPath.slice(0, -1);
//       }
      
//       const isExact = currentPath === itemPath;
//       const isPrefix = currentPath.startsWith(itemPath + '/');

//       if ((isExact || isPrefix) && itemPath.length > longestMatch) {
//         activeIndex = index;
//         longestMatch = itemPath.length;
//       }
//     });
//   }

//   // ✅ SLIDING ANIMATION LOGIC
//   useEffect(() => {
//     if (isProfileActive || activeIndex === -1) {
//       setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
//       return;
//     }

//     const updateSlider = () => {
//       const activeEl = itemRefs.current[activeIndex];
//       if (activeEl) {
//         setSliderStyle({
//           left: activeEl.offsetLeft,
//           width: activeEl.offsetWidth,
//           opacity: 1,
//         });
//       }
//     };

//     setTimeout(updateSlider, 50);
//     window.addEventListener('resize', updateSlider);
//     return () => window.removeEventListener('resize', updateSlider);
//   }, [activeIndex, isProfileActive]);

//   // User Initial nikalna agar photo nahi hai
//   const userInitial = (user.name || user.username || '?').charAt(0).toUpperCase();

//   return (
//     <>
//       <style>{`
//         .custom-bb-container {
//           position: fixed;
//           bottom: 16px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: calc(100% - 24px);
//           max-width: 440px;
//           z-index: 1000;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 8px;
//           font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
//           pointer-events: none;
//           box-sizing: border-box;
//         }

//         .custom-bb-container * {
//           pointer-events: auto;
//         }

//         .custom-bb-main {
//           flex: 1;
//           background: ${theme.colors.bbDarkBrown}; 
//           border-radius: 999px;
//           padding: 4px 6px;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           box-shadow: ${theme.shadow.lg};
//           height: 56px;
//           box-sizing: border-box;
//           min-width: 0;
//           border: 1px solid ${theme.colors.bbIndigo}40;
//           position: relative; 
//         }

//         .custom-bb-slider {
//           position: absolute;
//           top: 4px;
//           bottom: 4px;
//           background: ${theme.colors.surface};
//           border-radius: 999px;
//           box-shadow: ${theme.shadow.sm};
//           transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
//           z-index: 1;
//           pointer-events: none;
//         }

//         .custom-bb-item {
//           position: relative;
//           z-index: 2;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           height: 100%;
//           text-decoration: none;
//           border-radius: 999px;
//           transition: color 0.3s ease;
//           color: ${theme.colors.bbLightLilac}; 
//           padding: 0 10px;
//           min-width: 0;
//           white-space: nowrap;
//         }

//         .custom-bb-item.active {
//           color: ${theme.colors.bbDarkBrown};
//           padding: 0 14px;
//         }

//         .custom-bb-icon {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-shrink: 0;
//         }

//         .custom-bb-label {
//           font-size: 13px;
//           font-weight: 700;
//           margin-left: 6px;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         /* Profile Circle Button */
//         .custom-bb-circle-btn {
//           width: 56px;
//           height: 56px;
//           background: ${theme.colors.bbDarkBrown};
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: ${theme.colors.bbLightLilac};
//           text-decoration: none;
//           box-shadow: ${theme.shadow.lg};
//           flex-shrink: 0;
//           transition: all 0.3s ease;
//           border: 2px solid transparent;
//           overflow: hidden; /* Image ko circle me rakhne ke liye */
//           position: relative;
//         }

//         .custom-bb-circle-btn.active {
//           border-color: ${theme.colors.surface};
//           box-shadow: 0 0 0 2px ${theme.colors.bbIndigo};
//         }

//         /* Image style */
//         .custom-bb-profile-img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           border-radius: 50%;
//         }

//         /* Initial text style */
//         .custom-bb-initial {
//           font-size: 20px;
//           font-weight: 800;
//           color: ${theme.colors.bbLightLilac};
//         }

//         @media (max-width: 380px) {
//           .custom-bb-container {
//             width: calc(100% - 16px);
//             bottom: 12px;
//             gap: 6px;
//           }
//           .custom-bb-main {
//             height: 52px;
//             padding: 3px 4px;
//           }
//           .custom-bb-circle-btn {
//             width: 52px;
//             height: 52px;
//           }
//           .custom-bb-label {
//             font-size: 12px;
//             margin-left: 4px;
//           }
//           .custom-bb-item {
//             padding: 0 8px;
//           }
//           .custom-bb-item.active {
//             padding: 0 10px;
//           }
//         }

//         @media (min-width: 768px) {
//           .custom-bb-container {
//             display: none !important;
//           }
//         }
//       `}</style>

//       <div className="custom-bb-container">
//         <nav className="custom-bb-main">
//           <div 
//             className="custom-bb-slider" 
//             style={{
//               left: `${sliderStyle.left}px`,
//               width: `${sliderStyle.width}px`,
//               opacity: sliderStyle.opacity
//             }}
//           />

//           {items.map((item, index) => {
//             const isActive = activeIndex === index;

//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 ref={(el) => (itemRefs.current[index] = el)}
//                 className={`custom-bb-item ${isActive ? 'active' : ''}`}
//               >
//                 <span className="custom-bb-icon">
//                   {renderDynamicIcon(item, 20)}
//                 </span>
//                 {isActive && (
//                   <span className="custom-bb-label">{item.label}</span>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* ✅ Profile Button with Image / Initial */}
//         <Link
//           to={profilePath}
//           className={`custom-bb-circle-btn ${isProfileActive ? 'active' : ''}`}
//           title="Profile"
//         >
//           {user.profilePhoto ? (
//             <img 
//               src={user.profilePhoto} 
//               alt="Profile" 
//               className="custom-bb-profile-img" 
//             />
//           ) : (
//             <span className="custom-bb-initial">{userInitial}</span>
//           )}
//         </Link>
//       </div>
//     </>
//   );
// }




import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { theme } from '../../config/theme.js';
import { renderDynamicIcon } from './Sidebar.jsx';

export default function BottomBar({ menu = [] }) {
  const location = useLocation();
  
  // Sliding animation ke liye states
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const itemRefs = useRef([]);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const ROLE_MENUS = {
    EMPLOYEE: [
      { label: 'Dashboard', path: '/employee' },
      { label: 'Work', path: '/employee/work' },
      { label: 'Leaves', path: '/employee/leaves' },
      { label: 'Attendance', path: '/employee/attendance' },
    ],
    CLF: [
      { label: 'Dashboard', path: '/clf' },
      { label: 'Employees', path: '/clf/employees' },
      { label: 'Leaves', path: '/clf/leaves' },
      { label: 'Attendance', path: '/clf/attendance' },
    ],
    BPM: [
      { label: 'Dashboard', path: '/bpm' },
      { label: 'CLFs', path: '/bpm/clfs' },
      { label: 'Work', path: '/bpm/work' },
      { label: 'Attendance', path: '/bpm/attendance' },
    ],
  };

  const isEmployee = user.role === 'EMPLOYEE';
  const items = isEmployee 
    ? ROLE_MENUS.EMPLOYEE 
    : (ROLE_MENUS[user.role] ? ROLE_MENUS[user.role] : menu.slice(0, 4));

  // Active Index Calculate
  let currentPath = location.pathname;
  if (currentPath.endsWith('/') && currentPath.length > 1) {
    currentPath = currentPath.slice(0, -1);
  }

  const profilePath = isEmployee 
    ? '/employee/profile' 
    : user.role === 'CLF' 
    ? '/clf/profile' 
    : '/bpm/profile';

  const isProfileActive = currentPath === profilePath || currentPath.startsWith(profilePath + '/');

  let activeIndex = -1;
  let longestMatch = 0;

  if (!isProfileActive) {
    items.forEach((item, index) => {
      let itemPath = item.path || '';
      if (itemPath.endsWith('/') && itemPath.length > 1) {
        itemPath = itemPath.slice(0, -1);
      }
      
      const isExact = currentPath === itemPath;
      const isPrefix = currentPath.startsWith(itemPath + '/');

      if ((isExact || isPrefix) && itemPath.length > longestMatch) {
        activeIndex = index;
        longestMatch = itemPath.length;
      }
    });
  }

  // ✅ SLIDING ANIMATION LOGIC
  useEffect(() => {
    if (isProfileActive || activeIndex === -1) {
      setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const updateSlider = () => {
      const activeEl = itemRefs.current[activeIndex];
      if (activeEl) {
        setSliderStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        });
      }
    };

    setTimeout(updateSlider, 50);
    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [activeIndex, isProfileActive]);

  // User Initial nikalna agar photo nahi hai
  const userInitial = (user.name || user.username || '?').charAt(0).toUpperCase();

  return (
    <>
      <style>{`
        .custom-bb-container {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 28px);
          max-width: 440px;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          pointer-events: none;
          box-sizing: border-box;
        }

        .custom-bb-container * {
          pointer-events: auto;
        }

        .custom-bb-main {
          flex: 1;
          background: ${theme.colors.bbDarkBrown}; 
          border-radius: 999px;
          padding: 5px 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
          height: 60px;
          box-sizing: border-box;
          min-width: 0;
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative; 
          backdrop-filter: blur(8px);
        }

        .custom-bb-slider {
          position: absolute;
          top: 5px;
          bottom: 5px;
          background: ${theme.colors.surface};
          border-radius: 999px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: 1;
          pointer-events: none;
        }

        .custom-bb-item {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-decoration: none;
          border-radius: 999px;
          transition: all 0.3s ease;
          color: ${theme.colors.bbLightLilac}; 
          padding: 0 12px;
          min-width: 0;
          white-space: nowrap;
        }

        .custom-bb-item:hover {
          opacity: 0.9;
        }

        .custom-bb-item.active {
          color: ${theme.colors.bbDarkBrown};
          padding: 0 16px;
        }

        .custom-bb-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .custom-bb-item.active .custom-bb-icon {
          transform: scale(1.08);
        }

        .custom-bb-label {
          font-size: 13px;
          font-weight: 700;
          margin-left: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          animation: fadeInLabel 0.3s ease-in-out forwards;
        }

        @keyframes fadeInLabel {
          from {
            opacity: 0;
            transform: translateX(-4px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .custom-bb-circle-btn {
          width: 60px;
          height: 60px;
          background: ${theme.colors.bbDarkBrown};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${theme.colors.bbLightLilac};
          text-decoration: none;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 
                      0 0 0 1px rgba(255, 255, 255, 0.1),
                      0 0 20px rgba(99, 102, 241, 0.25);
          flex-shrink: 0;
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 2px solid rgba(255, 255, 255, 0.15);
          overflow: hidden;
          position: relative;
        }

        .custom-bb-circle-btn:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 14px 30px -4px rgba(0, 0, 0, 0.35), 
                      0 0 0 1px rgba(255, 255, 255, 0.2),
                      0 0 25px rgba(99, 102, 241, 0.4);
        }

        .custom-bb-circle-btn.active {
          border-color: ${theme.colors.surface};
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 
                      0 0 0 3px ${theme.colors.bbIndigo},
                      0 0 25px rgba(99, 102, 241, 0.5);
          transform: scale(1.05);
        }

        .custom-bb-profile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .custom-bb-initial {
          font-size: 20px;
          font-weight: 800;
          color: ${theme.colors.bbLightLilac};
          letter-spacing: 0.5px;
        }

        @media (max-width: 380px) {
          .custom-bb-container {
            width: calc(100% - 16px);
            bottom: 14px;
            gap: 8px;
          }
          .custom-bb-main {
            height: 54px;
            padding: 4px 5px;
          }
          .custom-bb-circle-btn {
            width: 54px;
            height: 54px;
          }
          .custom-bb-label {
            font-size: 12px;
            margin-left: 4px;
          }
          .custom-bb-item {
            padding: 0 8px;
          }
          .custom-bb-item.active {
            padding: 0 10px;
          }
        }

        @media (min-width: 768px) {
          .custom-bb-container {
            display: none !important;
          }
        }
      `}</style>

      <div className="custom-bb-container">
        <nav className="custom-bb-main">
          <div 
            className="custom-bb-slider" 
            style={{
              left: `${sliderStyle.left}px`,
              width: `${sliderStyle.width}px`,
              opacity: sliderStyle.opacity
            }}
          />

          {items.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <Link
                key={item.path}
                to={item.path}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`custom-bb-item ${isActive ? 'active' : ''}`}
              >
                <span className="custom-bb-icon">
                  {renderDynamicIcon(item, 20)}
                </span>
                {isActive && (
                  <span className="custom-bb-label">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          to={profilePath}
          className={`custom-bb-circle-btn ${isProfileActive ? 'active' : ''}`}
          title="Profile"
        >
          {user.profilePhoto ? (
            <img 
              src={user.profilePhoto} 
              alt="Profile" 
              className="custom-bb-profile-img" 
            />
          ) : (
            <span className="custom-bb-initial">{userInitial}</span>
          )}
        </Link>
      </div>
    </>
  );
}