// import { useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import ActionPlansPage from '../actionPlans/ActionPlansPage.jsx';
// import WorkDonePage from '../workDone/WorkDonePage.jsx';
// import { theme } from '../../config/theme.js';

// export default function Work() {
//   const [tab, setTab] = useState('action-plan');

//   const tabs = [
//     { key: 'action-plan', label: '📝 Action Plans' },
//     { key: 'work-done', label: '✅ Work Done' },
//   ];

//   return (
//     <div style={{ maxWidth: 1200, margin: '0 auto' }}>
//       <PageHeader
//         title="Work"
//         subtitle="Action plans and work done submissions"
//       />

//       {/* Toggle */}
//       <div
//         style={{
//           display: 'inline-flex',
//           gap: 4,
//           padding: 4,
//           background: theme.colors.background,
//           border: `1px solid ${theme.colors.border}`,
//           borderRadius: theme.radius.md,
//           marginBottom: 16,
//         }}
//       >
//         {tabs.map((t) => {
//           const isActive = tab === t.key;
//           return (
//             <button
//               key={t.key}
//               onClick={() => setTab(t.key)}
//               style={{
//                 padding: '8px 16px',
//                 borderRadius: theme.radius.sm,
//                 border: 'none',
//                 background: isActive ? theme.colors.primary : 'transparent',
//                 color: isActive ? '#FFFFFF' : theme.colors.muted,
//                 fontWeight: 700,
//                 fontSize: 11,
//                 letterSpacing: 1,
//                 textTransform: 'uppercase',
//                 cursor: 'pointer',
//                 transition: 'all 0.25s ease',
//               }}
//             >
//               {t.label}
//             </button>
//           );
//         })}
//       </div>

//       {/* Content */}
//       {tab === 'action-plan' && <ActionPlansPage />}
//       {tab === 'work-done' && <WorkDonePage />}
//     </div>
//   );
// }


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
//     { key: 'action-plan', label: '📝 Action Plan' },
//     { key: 'work-done', label: '✅ Work Done' },
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

//       {/* Toggle */}
//       <div
//         style={{
//           display: 'inline-flex',
//           gap: 4,
//           padding: 4,
//           background: theme.colors.background,
//           border: `1px solid ${theme.colors.border}`,
//           borderRadius: theme.radius.md,
//           marginBottom: 16,
//         }}
//       >
//         {tabs.map((t) => {
//           const isActive = tab === t.key;
//           return (
//             <button
//               key={t.key}
//               onClick={() => setTab(t.key)}
//               style={{
//                 padding: '8px 16px',
//                 borderRadius: theme.radius.sm,
//                 border: 'none',
//                 background: isActive ? theme.colors.primary : 'transparent',
//                 color: isActive ? '#FFFFFF' : theme.colors.muted,
//                 fontWeight: 700,
//                 fontSize: 11,
//                 letterSpacing: 1,
//                 textTransform: 'uppercase',
//                 cursor: 'pointer',
//                 transition: 'all 0.25s ease',
//               }}
//             >
//               {t.label}
//             </button>
//           );
//         })}
//       </div>

//       {/* Content */}
//       {tab === 'action-plan' && <ActionPlansPage />}
//       {tab === 'work-done' && <WorkDonePage />}
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
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <PageHeader
        title={isEmployee ? 'Daily Reports' : 'Work'}
        subtitle={
          isEmployee
            ? 'Morning action plan & evening work done'
            : 'Action plans and work done submissions'
        }
      />

      {/* ═════ RESPONSIVE TOGGLE ═════ */}
      <div
        className="clf-toggle-wrap"
        style={{
          marginBottom: 16,
        }}
      >
        <div
          className="clf-toggle"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 6,
            padding: 6,
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius.lg,
            boxShadow: theme.shadow.sm,
            maxWidth: 480,
            width: '100%',
          }}
        >
          {tabs.map((t) => {
            const isActive = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="clf-toggle-btn"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  padding: '10px 8px',
                  borderRadius: theme.radius.md,
                  border: 'none',
                  background: isActive ? theme.colors.primary : 'transparent',
                  color: isActive ? '#FFFFFF' : theme.colors.muted,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive
                    ? '0 4px 12px rgba(0, 0, 0, 0.12)'
                    : 'none',
                  outline: 'none',
                  minWidth: 0,
                }}
              >
                {/* Icon + Label */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 13,
                    fontWeight: isActive ? 700 : 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <span style={{ fontSize: 16, lineHeight: 1 }}>
                    {t.icon}
                  </span>
                  <span>{t.label}</span>
                </div>

                {/* Time hint — chhota text */}
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: 0.3,
                    opacity: isActive ? 0.85 : 0.7,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.hint}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═════ CONTENT ═════ */}
      <div className="clf-work-content">
        {tab === 'action-plan' && <ActionPlansPage />}
        {tab === 'work-done' && <WorkDonePage />}
      </div>

      {/* ═════ RESPONSIVE CSS ═════ */}
      <style>{`
        .clf-toggle-wrap {
          display: flex;
          justify-content: flex-start;
        }

        /* Mobile: full width, stacking tighter */
        @media (max-width: 480px) {
          .clf-toggle {
            max-width: 100% !important;
            gap: 4px !important;
            padding: 4px !important;
          }
          .clf-toggle-btn {
            padding: 8px 4px !important;
          }
          .clf-toggle-btn span {
            font-size: 12px !important;
          }
          .clf-toggle-wrap {
            justify-content: stretch !important;
          }
        }

        /* Small mobile: hint chhupa do */
        @media (max-width: 360px) {
          .clf-toggle-btn > div:last-child {
            display: none !important;
          }
        }

        /* Content padding adjust on mobile */
        @media (max-width: 768px) {
          .clf-work-content {
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}