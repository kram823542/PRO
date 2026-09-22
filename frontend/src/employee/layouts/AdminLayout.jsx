import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Path update karein agar aapka Sidebar components folder me hai

const AdminLayout = ({ children, menuItems, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex relative">
      {/* Sidebar Component */}
      <Sidebar 
        menuItems={menuItems} 
        title={title} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />

      {/* Main Content Area (Dynamic Margin) */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out p-6 ${
          isCollapsed ? 'md:ml-24' : 'md:ml-60'
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;