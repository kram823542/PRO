// // import { useLocation } from 'react-router-dom';
// // import { theme } from '../../config/theme.js';

// // export default function Breadcrumb() {
// //   const location = useLocation();
// //   const parts = location.pathname.split('/').filter(Boolean);

// //   return (
// //     <div
// //       style={{
// //         padding: '12px 24px',
// //         background: theme.colors.surface,
// //         borderBottom: `1px solid ${theme.colors.border}`,
// //         fontSize: 13,
// //         color: theme.colors.muted,
// //       }}
// //     >
// //       {parts.map((p, i) => (
// //         <span key={i}>
// //           {i > 0 && ' / '}
// //           <span style={{ color: i === parts.length - 1 ? theme.colors.text : theme.colors.muted }}>
// //             {p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' ')}
// //           </span>
// //         </span>
// //       ))}
// //     </div>
// //   );
// // }


// import { useLocation, Link } from 'react-router-dom';
// import { theme } from '../../config/theme.js';

// export default function Breadcrumb() {
//   const location = useLocation();
//   const parts = location.pathname.split('/').filter(Boolean);

//   return (
//     <div
//       className="flex items-center gap-2 px-4 py-3 bg-white border-b border-slate-200/80 text-xs font-semibold overflow-x-auto whitespace-nowrap shadow-2xs"
//       style={{
//         background: theme?.colors?.surface || '#FFFFFF',
//         borderBottomColor: theme?.colors?.border || '#E2E8F0',
//       }}
//     >
//       {/* Home Link */}
//       <Link
//         to="/"
//         className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 transition-colors duration-200"
//       >
//         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//         </svg>
//         <span>Home</span>
//       </Link>

//       {parts.length > 0 && (
//         <svg className="w-3 h-3 text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//         </svg>
//       )}

//       {/* Path Parts */}
//       {parts.map((p, i) => {
//         const isLast = i === parts.length - 1;
//         const routeTo = `/${parts.slice(0, i + 1).join('/')}`;
//         const label = p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' ');

//         return (
//           <div key={i} className="flex items-center gap-2 shrink-0">
//             {isLast ? (
//               <span
//                 className="px-2.5 py-1 rounded-lg bg-slate-100 font-bold text-slate-900 border border-slate-200/60 shadow-2xs"
//                 style={{ color: theme?.colors?.text || '#0F172A' }}
//               >
//                 {label}
//               </span>
//             ) : (
//               <Link
//                 to={routeTo}
//                 className="text-slate-500 hover:text-slate-800 transition-colors duration-200"
//                 style={{ color: theme?.colors?.muted || '#64748B' }}
//               >
//                 {label}
//               </Link>
//             )}

//             {!isLast && (
//               <svg className="w-3 h-3 text-slate-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//               </svg>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }



// import { useLocation, Link } from 'react-router-dom';
// import { theme } from '../../config/theme.js';

// export default function Breadcrumb() {
//   const location = useLocation();
//   const parts = location.pathname.split('/').filter(Boolean);

//   const Chevron = () => (
//     <svg
//       width="12"
//       height="12"
//       fill="none"
//       stroke={theme.colors.muted}
//       strokeWidth="2.5"
//       viewBox="0 0 24 24"
//       style={{ flexShrink: 0, opacity: 0.6 }}
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//     </svg>
//   );

//   return (
//     <div
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: 8,
//         padding: '12px 24px',
//         background: theme.colors.surface,
//         borderBottom: `1px solid ${theme.colors.border}`,
//         fontSize: 12,
//         fontWeight: 600,
//         overflowX: 'auto',
//         whiteSpace: 'nowrap',
//         fontFamily: 'system-ui, sans-serif',
//       }}
//     >
//       {/* Home */}
//       <Link
//         to="/"
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: 6,
//           color: theme.colors.muted,
//           textDecoration: 'none',
//           transition: 'color 0.2s',
//         }}
//       >
//         <svg
//           width="14"
//           height="14"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2.2"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//           />
//         </svg>
//         <span>Home</span>
//       </Link>

//       {parts.length > 0 && <Chevron />}

//       {parts.map((p, i) => {
//         const isLast = i === parts.length - 1;
//         const routeTo = `/${parts.slice(0, i + 1).join('/')}`;
//         const label = p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' ');

//         return (
//           <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
//             {isLast ? (
//               <span
//                 style={{
//                   padding: '4px 10px',
//                   borderRadius: 8,
//                   background: `${theme.colors.primary}15`,
//                   fontWeight: 700,
//                   color: theme.colors.primary,
//                   border: `1px solid ${theme.colors.primary}30`,
//                 }}
//               >
//                 {label}
//               </span>
//             ) : (
//               <Link
//                 to={routeTo}
//                 style={{
//                   color: theme.colors.muted,
//                   textDecoration: 'none',
//                   transition: 'color 0.2s',
//                 }}
//               >
//                 {label}
//               </Link>
//             )}

//             {!isLast && <Chevron />}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import { useLocation, Link } from 'react-router-dom';
import { theme } from '../../config/theme.js';

export default function Breadcrumb() {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);

  const Chevron = () => (
    <svg
      width="12"
      height="12"
      fill="none"
      stroke="#9ca3af"
      strokeWidth="2.2"
      viewBox="0 0 24 24"
      style={{ flexShrink: 0, margin: '0 2px' }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '10px 20px',
        background: theme.colors.surface || '#ffffff',
        borderBottom: `1px solid ${theme.colors.border || '#f3f4f6'}`,
        fontSize: 12,
        fontWeight: 500,
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Home Button */}
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: '#6b7280',
          textDecoration: 'none',
          padding: '4px 8px',
          borderRadius: '6px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#f3f4f6')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <svg
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span>Home</span>
      </Link>

      {parts.length > 0 && <Chevron />}

      {parts.map((p, i) => {
        const isLast = i === parts.length - 1;
        const routeTo = `/${parts.slice(0, i + 1).join('/')}`;
        const label = p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' ');

        return (
          <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {isLast ? (
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(80, 12, 65, 0.08)',
                  fontWeight: 600,
                  color: '#500c41',
                  border: '1px solid rgba(80, 12, 65, 0.15)',
                }}
              >
                {label}
              </span>
            ) : (
              <Link
                to={routeTo}
                style={{
                  color: '#6b7280',
                  textDecoration: 'none',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f3f4f6')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {label}
              </Link>
            )}

            {!isLast && <Chevron />}
          </div>
        );
      })}
    </div>
  );
}