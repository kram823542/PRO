
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




import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { theme } from '../../config/theme.js';
import { renderDynamicIcon } from './Sidebar.jsx';
import * as notificationApi from '../../features/notifications/notifications.api.js';

export default function BottomBar({ menu = [] }) {
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const ROLE_MENUS = {
    EMPLOYEE: [
      { label: 'Dashboard', path: '/employee' },
      { label: 'Work', path: '/employee/work' },
      { label: 'Attendance', path: '/employee/attendance' },
      { label: 'Notifications', path: '/employee/notifications' },
      { label: 'Profile', path: '/employee/profile' },
    ],
    CLF: [
      { label: 'Dashboard', path: '/clf' },
      { label: 'Employees', path: '/clf/employees' },
      { label: 'Work', path: '/clf/work' },
      { label: 'Notifications', path: '/clf/notifications' },
      { label: 'Profile', path: '/clf/profile' },
    ],
    BPM: [
      { label: 'Dashboard', path: '/bpm' },
      { label: 'CLFs', path: '/bpm/clfs' },
      { label: 'Work', path: '/bpm/work' },
      { label: 'Notifications', path: '/bpm/notifications' },
      { label: 'Profile', path: '/bpm/profile' },
    ],
  };

  const items =
    ROLE_MENUS[user.role] && ROLE_MENUS[user.role].length
      ? ROLE_MENUS[user.role]
      : menu.slice(0, 5);

  /* Fetch unread count */
  useEffect(() => {
    const canReceive = ['EMPLOYEE', 'CLF'].includes(user.role);
    if (!canReceive) return;

    let mounted = true;

    const fetchUnread = async () => {
      try {
        const { data } = await notificationApi.unreadCount();
        if (mounted) setUnreadCount(data?.data?.count || 0);
      } catch (err) {
        // silent
      }
    };

    fetchUnread();
    const onFocus = () => fetchUnread();
    window.addEventListener('focus', onFocus);

    return () => {
      mounted = false;
      window.removeEventListener('focus', onFocus);
    };
  }, [user.role]);

  /* Refresh on route change */
  useEffect(() => {
    const canReceive = ['EMPLOYEE', 'CLF'].includes(user.role);
    if (!canReceive) return;

    let mounted = true;
    const fetchUnread = async () => {
      try {
        const { data } = await notificationApi.unreadCount();
        if (mounted) setUnreadCount(data?.data?.count || 0);
      } catch (err) {
        // silent
      }
    };
    fetchUnread();
    return () => {
      mounted = false;
    };
  }, [location.pathname, user.role]);

  /* Active index */
  let currentPath = location.pathname;
  if (currentPath.endsWith('/') && currentPath.length > 1) {
    currentPath = currentPath.slice(0, -1);
  }

  let activeIndex = -1;
  let longestMatch = 0;

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

  /* ✅ Indicator width % */
  const indicatorWidthPct = 100 / items.length;

  return (
    <>
      <style>{`
        /* ====== Bottombar Container ====== */
        .clf-bottombar {
          position: fixed;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 24px);
          max-width: 560px;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 6px 8px;
          background: var(--clf-bb-bg, #ffffff);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--clf-bb-border, rgba(0,0,0,0.08));
          border-radius: 999px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* ====== Active Indicator (center slide) ====== */
        .clf-bb-indicator {
          position: absolute;
          top: 6px;
          bottom: 6px;
          left: 8px;
          border-radius: 999px;
          background: rgba(80, 12, 65, 0.09);
          border: 1px solid rgba(80, 12, 65, 0.15);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                      width 0.35s ease;
          pointer-events: none;
          will-change: transform;
        }

        /* ====== Each Item ====== */
        .clf-bb-item {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 6px 2px;
          flex: 1;
          min-width: 0;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-tap-highlight-color: transparent;
          border-radius: 999px;
        }

        .clf-bb-item-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease, color 0.25s ease;
        }

        .clf-bb-item-label {
          margin-top: 3px;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.2px;
          line-height: 1.2;
          max-width: 64px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: color 0.25s ease;
        }

        /* ====== Very small screens (<340px) — icons only ====== */
        @media (max-width: 340px) {
          .clf-bb-item-label {
            display: none;
          }
          .clf-bb-item {
            padding: 8px 2px;
          }
        }

        /* ====== Small phones (<380px) — tighter ====== */
        @media (max-width: 380px) {
          .clf-bottombar {
            width: calc(100% - 16px);
            bottom: 10px;
            padding: 5px 6px;
          }
          .clf-bb-item-label {
            font-size: 8px;
            max-width: 52px;
          }
        }

        /* ====== Medium phones (380-500px) ====== */
        @media (min-width: 380px) and (max-width: 500px) {
          .clf-bb-item-label {
            font-size: 9px;
          }
        }

        /* ====== Larger phones/tablets (>=500px) ====== */
        @media (min-width: 500px) {
          .clf-bb-item-label {
            font-size: 10px;
            max-width: 70px;
          }
        }

        /* ====== Notification pulse badge ====== */
        @keyframes notifPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .clf-bb-badge {
          position: absolute;
          top: -4px;
          right: -8px;
          min-width: 16px;
          height: 16px;
          padding: 0 4px;
          background: #DC2626;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          animation: notifPulse 1.5s infinite;
        }
      `}</style>

      <nav
        className="clf-bottombar"
        style={{
          '--clf-bb-bg': theme.colors.sidebarBg || '#ffffff',
          '--clf-bb-border': theme.colors.border || 'rgba(0,0,0,0.08)',
        }}
      >
        {/* ✅ Sliding indicator — center aligned */}
        {activeIndex !== -1 && (
          <div
            className="clf-bb-indicator"
            style={{
              width: `calc((100% - 16px) / ${items.length})`,
              left: `calc(8px + ((100% - 16px) / ${items.length}) * ${activeIndex})`,
              transform: 'translateX(0)',
            }}
          />
        )}

        {items.map((item, index) => {
          const isActive = activeIndex === index;
          const isNotifications =
            (item.label || '').toLowerCase().includes('notification') ||
            (item.path || '').toLowerCase().includes('notification');

          const showBadge = isNotifications && unreadCount > 0;

          const iconColor = showBadge
            ? '#DC2626'
            : isActive
            ? '#500c41'
            : '#6b7280';

          return (
            <Link
              key={item.path}
              to={item.path}
              className="clf-bb-item"
              style={{
                color: iconColor,
              }}
            >
              <span
                className="clf-bb-item-icon-wrap"
                style={{
                  transform: isActive
                    ? 'translateY(-1px) scale(1.1)'
                    : 'scale(1)',
                  color: iconColor,
                }}
              >
                {renderDynamicIcon(item, 20)}

                {showBadge && (
                  <span
                    className="clf-bb-badge"
                    style={{
                      boxShadow:
                        '0 0 0 2px ' + (theme.colors.sidebarBg || '#fff'),
                    }}
                  >
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </span>

              <span
                className="clf-bb-item-label"
                style={{
                  fontWeight: isActive ? 700 : 500,
                  color: iconColor,
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}