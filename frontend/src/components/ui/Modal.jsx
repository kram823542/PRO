// import { theme } from '../../config/theme.js';

// export default function Modal({ open, onClose, title, children, footer }) {
//   if (!open) return null;

//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: 'fixed',
//         inset: 0,
//         background: 'rgba(0,0,0,0.5)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 999,
//         padding: 20,
//       }}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           background: theme.colors.surface,
//           borderRadius: theme.radius.lg,
//           width: '100%',
//           maxWidth: 520,
//           maxHeight: '90vh',
//           overflow: 'auto',
//           boxShadow: theme.shadow.lg,
//         }}
//       >
//         <div
//           style={{
//             padding: '16px 20px',
//             borderBottom: `1px solid ${theme.colors.border}`,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}
//         >
//           <h3 style={{ margin: 0, fontSize: 17, color: theme.colors.text }}>{title}</h3>
//           <button
//             onClick={onClose}
//             style={{
//               border: 'none',
//               background: 'transparent',
//               fontSize: 22,
//               cursor: 'pointer',
//               color: theme.colors.muted,
//             }}
//           >
//             ×
//           </button>
//         </div>
//         <div style={{ padding: 20 }}>{children}</div>
//         {footer && (
//           <div
//             style={{
//               padding: 16,
//               borderTop: `1px solid ${theme.colors.border}`,
//               display: 'flex',
//               justifyContent: 'flex-end',
//               gap: 10,
//             }}
//           >
//             {footer}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { theme } from '../../config/theme.js';

export default function Modal({ open, isOpen, onClose, title, children, footer, size = 'md' }) {
  // ✅ Dono props support karo
  const isVisible = open ?? isOpen;
  if (!isVisible) return null;

  const sizes = {
    sm: 400,
    md: 520,
    lg: 720,
    xl: 1100,   // ✅ XL for advice preview
  };
  const maxWidth = sizes[size] || sizes.md;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme.colors.surface,
          borderRadius: theme.radius.lg,
          width: '100%',
          maxWidth,
          maxHeight: '92vh',
          overflow: 'auto',
          boxShadow: theme.shadow.lg,
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderBottom: `1px solid ${theme.colors.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            background: theme.colors.surface,
            zIndex: 10,
          }}
        >
          <h3 style={{ margin: 0, fontSize: 17, color: theme.colors.text }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: 22,
              cursor: 'pointer',
              color: theme.colors.muted,
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
        {footer && (
          <div
            style={{
              padding: 16,
              borderTop: `1px solid ${theme.colors.border}`,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 10,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}