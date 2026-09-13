// const Loader = ({ fullScreen = false, size = 'md' }) => {
//   const sizes = {
//     sm: 'w-6 h-6 border-2',
//     md: 'w-10 h-10 border-3',
//     lg: 'w-16 h-16 border-4',
//   };

//   const spinner = (
//     <div
//       className={`${sizes[size]} border-secondary border-t-transparent rounded-full animate-spin`}
//       style={{ borderWidth: size === 'sm' ? '2px' : size === 'md' ? '3px' : '4px' }}
//     />
//   );

//   if (fullScreen) {
//     return (
//       <div className="fixed inset-0 bg-primary flex items-center justify-center z-50">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto" />
//           <p className="text-white mt-4 font-semibold">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return <div className="flex justify-center items-center py-8">{spinner}</div>;
// };

// export default Loader;



import React from 'react';

const Loader = ({ fullScreen = false, size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Centered Orbit Rings */}
      <div className={`relative ${sizeClasses[size] || sizeClasses.md} flex items-center justify-center`}>
        {/* Outer Orbit Ring 1 */}
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-[spin_1.5s_linear_infinite]" />
        
        {/* Inner Counter Orbit Ring 2 */}
        <div className="absolute inset-1.5 rounded-full border-2 border-violet-500/30 border-b-violet-400 animate-[spin_1s_linear_infinite_reverse]" />
        
        {/* Center Glowing Core */}
        <div className="w-2.5 h-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,1)] animate-ping" />
      </div>

      {/* Loading Text */}
      {text && (
        <p className="mt-4 text-xs font-semibold tracking-widest uppercase text-slate-300 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  // Full Screen Mode - Exact Screen Center
  if (fullScreen) {
    return (
      <div className="fixed inset-0 min-h-screen w-screen bg-slate-950/80 backdrop-blur-xl flex items-center justify-center z-[9999] m-0 p-0">
        <div className="px-8 py-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center">
          {spinner}
        </div>
      </div>
    );
  }

  // Normal In-Page Mode - Parent Container Exact Center
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full py-8">
      {spinner}
    </div>
  );
};

export default Loader;