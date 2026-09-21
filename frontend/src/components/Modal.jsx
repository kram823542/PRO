

// import { useEffect } from 'react';

// const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const sizes = {
//     sm: 'max-w-md',
//     md: 'max-w-lg',
//     lg: 'max-w-2xl',
//     xl: 'max-w-4xl',
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       />

//       {/* Modal Box - Removed bg-white and applied dark background & deep shadow */}
//       <div
//         className={`relative bg-[#0d131f] text-white border border-white/10 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] w-full ${sizes[size]} max-h-[90vh] overflow-y-auto z-10`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#0d131f] rounded-t-2xl sticky top-0 z-20">
//           <h3 className="text-lg font-bold text-white">{title}</h3>
//           <button
//             onClick={onClose}
//             className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-5 bg-[#0d131f]">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Modal;



import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Overlay Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative bg-[#0e1626] text-white border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] w-full ${sizes[size]} max-h-[90vh] overflow-y-auto z-10`}
      >
        {/* Sticky Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#0e1626] rounded-t-2xl sticky top-0 z-20">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            type="button"
            className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 bg-[#0e1626] text-white">{children}</div>
      </div>
    </div>
  );
};

export default Modal;