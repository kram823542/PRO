// import NotificationCard from './NotificationCard.jsx';
// import { theme } from '../../config/theme.js';

// export default function NotificationList({
//   items = [],
//   isEmployee = false,
//   loading = false,
//   onMarkRead,
//   onIgnore,
// }) {
//   if (loading) {
//     return (
//       <div style={{ padding: 40, textAlign: 'center', color: theme.colors.muted }}>Loading...</div>
//     );
//   }
//   if (items.length === 0) {
//     return (
//       <div
//         style={{
//           padding: 40,
//           background: theme.colors.surface,
//           borderRadius: theme.radius.md,
//           textAlign: 'center',
//           color: theme.colors.muted,
//         }}
//       >
//         No notifications
//       </div>
//     );
//   }

//   return (
//     <>
//       {items.map((item) => (
//         <NotificationCard
//           key={item._id}
//           item={item}
//           isEmployee={isEmployee}
//           onMarkRead={onMarkRead}
//           onIgnore={onIgnore}
//         />
//       ))}
//     </>
//   );
// }


import NotificationCard from './NotificationCard.jsx';
import { theme } from '../../config/theme.js';

export default function NotificationList({
  items = [],
  isEmployee = false,
  loading = false,
  onMarkRead,
  onIgnore,
  onViewTracking,
}) {
  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: theme.colors.muted }}>
        Loading...
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div
        style={{
          padding: 40,
          background: theme.colors.surface,
          borderRadius: theme.radius.md,
          textAlign: 'center',
          color: theme.colors.muted,
        }}
      >
        No notifications
      </div>
    );
  }

  return (
    <>
      {items.map((item) => (
        <NotificationCard
          key={item._id}
          item={item}
          isEmployee={isEmployee}
          onMarkRead={onMarkRead}
          onIgnore={onIgnore}
          onViewTracking={onViewTracking}
        />
      ))}
    </>
  );
}