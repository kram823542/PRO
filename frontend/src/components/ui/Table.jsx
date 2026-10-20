// import { theme } from '../../config/theme.js';

// export default function Table({ columns = [], data = [], loading = false, emptyMessage = 'No data found' }) {
//   return (
//     <div
//       style={{
//         overflowX: 'auto',
//         background: theme.colors.surface,
//         borderRadius: theme.radius.md,
//         boxShadow: theme.shadow.sm,
//       }}
//     >
//       <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
//         <thead>
//           <tr style={{ background: theme.colors.background }}>
//             {columns.map((c, i) => (
//               <th
//                 key={i}
//                 style={{
//                   padding: '12px 14px',
//                   textAlign: 'left',
//                   fontWeight: 600,
//                   color: theme.colors.text,
//                   borderBottom: `1px solid ${theme.colors.border}`,
//                   whiteSpace: 'nowrap',
//                 }}
//               >
//                 {c.header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan={columns.length} style={{ padding: 30, textAlign: 'center', color: theme.colors.muted }}>
//                 Loading...
//               </td>
//             </tr>
//           ) : data.length === 0 ? (
//             <tr>
//               <td colSpan={columns.length} style={{ padding: 30, textAlign: 'center', color: theme.colors.muted }}>
//                 {emptyMessage}
//               </td>
//             </tr>
//           ) : (
//             data.map((row, ri) => (
//               <tr key={ri} style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
//                 {columns.map((c, ci) => (
//                   <td key={ci} style={{ padding: '12px 14px', color: theme.colors.text }}>
//                     {c.render ? c.render(row) : row[c.key]}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { theme } from '../../config/theme.js';

export default function Table({ columns = [], data = [], loading = false, emptyMessage = 'No data found' }) {
  return (
    <div
      style={{
        background: theme.colors.surface,
        borderRadius: theme.radius.md,
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        border: `1px solid ${theme.colors.border}`,
        overflow: 'hidden', // Border radius ke liye
        width: '100%',
      }}
    >
      {/* CSS Animations for Skeleton Loader */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .skeleton-line {
          background: #f6f7f8;
          background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
          background-repeat: no-repeat;
          background-size: 1000px 100%;
          animation: shimmer 1.5s infinite linear forwards;
          border-radius: 4px;
        }
      `}</style>

      {/* Scrollable Container */}
      <div style={{ overflowX: 'auto', maxHeight: '75vh' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          
          {/* ✅ Sticky & Clean Header */}
          <thead style={{ position: 'sticky', top: 0, zIndex: 10, background: theme.colors.surface }}>
            <tr>
              {columns.map((c, i) => (
                <th
                  key={i}
                  style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    color: theme.colors.muted,
                    borderBottom: `2px solid ${theme.colors.border}`,
                    whiteSpace: 'nowrap',
                    background: theme.colors.surface, // Sticky ke liye background zaroori hai
                  }}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              // ✅ PROFESSIONAL SKELETON LOADER
              Array.from({ length: 6 }).map((_, rowIndex) => (
                <tr key={`skeleton-${rowIndex}`} style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
                  {columns.map((_, colIndex) => (
                    <td key={`skeleton-col-${colIndex}`} style={{ padding: '16px' }}>
                      {/* Alag-alag width taaki natural lage */}
                      <div 
                        className="skeleton-line" 
                        style={{ 
                          height: 16, 
                          width: colIndex === 0 ? '60%' : colIndex % 2 === 0 ? '45%' : '80%',
                          maxWidth: 180,
                        }} 
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              // ✅ MEANINGFUL EMPTY STATE
              <tr>
                <td colSpan={columns.length} style={{ padding: '80px 20px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      width: 72, height: 72,
                      background: `${theme.colors.primary}08`,
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px dashed ${theme.colors.primary}30`,
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="13 2 13 9 20 9"></polyline>
                      </svg>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <span style={{ color: theme.colors.text, fontSize: 16, fontWeight: 700 }}>No Data Available</span>
                      <span style={{ color: theme.colors.muted, fontSize: 14 }}>{emptyMessage}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              // ✅ DATA ROWS (With Hover & Zebra Striping)
              data.map((row, ri) => (
                <tr
                  key={ri}
                  style={{
                    borderBottom: `1px solid ${theme.colors.border}`,
                    transition: 'background 0.2s ease',
                    background: ri % 2 === 0 ? theme.colors.surface : `${theme.colors.background}50`, // Zebra Stripe
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${theme.colors.primary}08`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = ri % 2 === 0 ? theme.colors.surface : `${theme.colors.background}50`;
                  }}
                >
                  {columns.map((c, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: '16px',
                        color: theme.colors.text,
                        whiteSpace: 'nowrap',
                        verticalAlign: 'middle',
                      }}
                    >
                      {c.render ? c.render(row) : row[c.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}