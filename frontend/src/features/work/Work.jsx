// import { useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import ActionPlansPage from '../actionPlans/ActionPlansPage.jsx';
// import WorkDonePage from '../workDone/WorkDonePage.jsx';
// import { theme } from '../../config/theme.js';

// export default function Work() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const isEmployee = user.role === 'EMPLOYEE';

//   const [tab, setTab] = useState('action-plan');

//   const tabs = [
//     {
//       key: 'action-plan',
//       label: 'Action Plan',
//       icon: '📝',
//       hint: '10 AM – 11 AM',
//     },
//     {
//       key: 'work-done',
//       label: 'Work Done',
//       icon: '✅',
//       hint: '5 PM – 10 PM',
//     },
//   ];

//   return (
//     <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//       <PageHeader
//         title={isEmployee ? 'Daily Reports' : 'Work'}
//         subtitle={
//           isEmployee
//             ? 'Morning action plan & evening work done'
//             : 'Action plans and work done submissions'
//         }
//       />

//       {/* ═════ RESPONSIVE TOGGLE ═════ */}
//       <div
//         className="clf-toggle-wrap"
//         style={{
//           marginBottom: 16,
//         }}
//       >
//         <div
//           className="clf-toggle"
//           style={{
//             display: 'grid',
//             gridTemplateColumns: '1fr 1fr',
//             gap: 6,
//             padding: 6,
//             background: theme.colors.surface,
//             border: `1px solid ${theme.colors.border}`,
//             borderRadius: theme.radius.lg,
//             boxShadow: theme.shadow.sm,
//             maxWidth: 480,
//             width: '100%',
//           }}
//         >
//           {tabs.map((t) => {
//             const isActive = tab === t.key;
//             return (
//               <button
//                 key={t.key}
//                 onClick={() => setTab(t.key)}
//                 className="clf-toggle-btn"
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   gap: 2,
//                   padding: '10px 8px',
//                   borderRadius: theme.radius.md,
//                   border: 'none',
//                   background: isActive ? theme.colors.primary : 'transparent',
//                   color: isActive ? '#FFFFFF' : theme.colors.muted,
//                   cursor: 'pointer',
//                   transition: 'all 0.25s ease',
//                   boxShadow: isActive
//                     ? '0 4px 12px rgba(0, 0, 0, 0.12)'
//                     : 'none',
//                   outline: 'none',
//                   minWidth: 0,
//                 }}
//               >
//                 {/* Icon + Label */}
//                 <div
//                   style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 6,
//                     fontSize: 13,
//                     fontWeight: isActive ? 700 : 600,
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                   }}
//                 >
//                   <span style={{ fontSize: 16, lineHeight: 1 }}>
//                     {t.icon}
//                   </span>
//                   <span>{t.label}</span>
//                 </div>

//                 {/* Time hint — chhota text */}
//                 <div
//                   style={{
//                     fontSize: 10,
//                     fontWeight: 600,
//                     letterSpacing: 0.3,
//                     opacity: isActive ? 0.85 : 0.7,
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   {t.hint}
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* ═════ CONTENT ═════ */}
//       <div className="clf-work-content">
//         {tab === 'action-plan' && <ActionPlansPage />}
//         {tab === 'work-done' && <WorkDonePage />}
//       </div>

//       {/* ═════ RESPONSIVE CSS ═════ */}
//       <style>{`
//         .clf-toggle-wrap {
//           display: flex;
//           justify-content: flex-start;
//         }

//         /* Mobile: full width, stacking tighter */
//         @media (max-width: 480px) {
//           .clf-toggle {
//             max-width: 100% !important;
//             gap: 4px !important;
//             padding: 4px !important;
//           }
//           .clf-toggle-btn {
//             padding: 8px 4px !important;
//           }
//           .clf-toggle-btn span {
//             font-size: 12px !important;
//           }
//           .clf-toggle-wrap {
//             justify-content: stretch !important;
//           }
//         }

//         /* Small mobile: hint chhupa do */
//         @media (max-width: 360px) {
//           .clf-toggle-btn > div:last-child {
//             display: none !important;
//           }
//         }

//         /* Content padding adjust on mobile */
//         @media (max-width: 768px) {
//           .clf-work-content {
//             padding: 0 !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader.jsx';
import ActionPlansPage from '../actionPlans/ActionPlansPage.jsx';
import WorkDonePage from '../workDone/WorkDonePage.jsx';
import { theme } from '../../config/theme.js';

export default function Work() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isEmployee = user.role === 'EMPLOYEE';

  const [tab, setTab] = useState('action-plan');

  const tabs = [
    {
      key: 'action-plan',
      label: 'Action Plan',
      icon: '📝',
      hint: '10 AM – 11 AM',
    },
    {
      key: 'work-done',
      label: 'Work Done',
      icon: '✅',
      hint: '5 PM – 10 PM',
    },
  ];

  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', width: '100%', padding: '0 8px' }}>
      <PageHeader
        title={isEmployee ? 'Daily Reports' : 'Work'}
        subtitle={
          isEmployee
            ? 'Morning action plan & evening work done'
            : 'Action plans and work done submissions'
        }
      />

      {/* ✅ Modern Segmented Control (No Box) */}
      <div
        style={{
          display: 'inline-flex',
          gap: 8,
          marginBottom: 28,
          marginTop: 8,
          padding: 4,
          background: `${theme.colors.muted}10`, // Very light background
          borderRadius: 999, // Pill shape
          border: `1px solid ${theme.colors.border}50`,
        }}
      >
        {tabs.map((t) => {
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 999,
                border: 'none',
                background: isActive ? '#FFFFFF' : 'transparent',
                color: isActive ? theme.colors.text : theme.colors.muted,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                fontWeight: isActive ? 700 : 500,
                fontSize: 14,
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = theme.colors.text;
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = theme.colors.muted;
              }}
            >
              <span style={{ fontSize: 16, opacity: isActive ? 1 : 0.7 }}>{t.icon}</span>
              <span>{t.label}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '2px 6px',
                  borderRadius: 4,
                  background: isActive ? `${theme.colors.primary}15` : 'transparent',
                  color: isActive ? theme.colors.primary : theme.colors.muted,
                  display: window.innerWidth < 400 ? 'none' : 'inline-block', // Mobile par hint chhupa do
                }}
              >
                {t.hint}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content Area - Seamless */}
      <div style={{ width: '100%', animation: 'fadeIn 0.3s ease' }}>
        {tab === 'action-plan' && <ActionPlansPage />}
        {tab === 'work-done' && <WorkDonePage />}
      </div>

      {/* Simple Animation CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}