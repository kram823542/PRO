// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';   // ✅ Tailwind CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#18181B',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 600,
          border: '1px solid #27272A',
          borderRadius: '10px',
        },
        success: {
          iconTheme: { primary: '#16A34A', secondary: '#fff' },
        },
        error: {
          iconTheme: { primary: '#DC2626', secondary: '#fff' },
        },
      }}
    />
  </React.StrictMode>
);