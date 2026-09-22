

import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const renderProfessionalIcon = (item) => {
  const label = (item.label || '').toLowerCase();
  const path = (item.path || '').toLowerCase();

  // 1. Dashboard
  if (label.includes('dashboard') || path.includes('dashboard')) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    );
  }

  // 2. Employees / Users
  if (label.includes('employee') || label.includes('user') || path.includes('employee')) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5 5 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  }

  // 3. Approvals / Submissions / Advice
  if (
    label.includes('approval') ||
    label.includes('submit') ||
    label.includes('submission') ||
    label.includes('pending') ||
    label.includes('advice') ||
    path.includes('approval') ||
    path.includes('submission') ||
    path.includes('advice')
  ) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  // 4. Attendance / Log / History
  if (
    label.includes('attendance') ||
    label.includes('log') ||
    label.includes('history') ||
    path.includes('attendance')
  ) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  }

  // 5. Reports / Analytics
  if (label.includes('report') || path.includes('report')) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    );
  }

  // 6. Profile / Settings / Account
  if (label.includes('profile') || label.includes('setting') || path.includes('profile')) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    );
  }

  // 7. CLFs / Node / Organization Units
  if (label.includes('clf') || path.includes('/clfs')) {
    return (
      <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0V7m0 4h4m-4 0H7" />
      </svg>
    );
  }

  // Default Fallback Icon
  return (
    <svg className="w-5 h-5 min-w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
};

const Sidebar = ({ menuItems = [], title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const index = menuItems.findIndex((item) => item.path === location.pathname);
    if (index !== -1) setActiveIndex(index);
  }, [location.pathname, menuItems]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`hidden md:flex flex-col fixed left-4 top-4 bottom-4 bg-zinc-900 border border-zinc-800 text-white rounded-3xl shadow-2xl z-40 py-4 px-2.5 justify-between transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16 items-center' : 'w-52 px-3.5'
      }`}
    >
      <div className="flex flex-col w-full">
        <div className="relative pb-3 mb-3 border-b border-zinc-800 w-full flex flex-col gap-2.5">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="w-10 h-10 bg-zinc-800 border border-zinc-700 rounded-2xl flex items-center justify-center text-white font-black text-base shrink-0">
              {title ? title.charAt(0) : 'C'}
            </div>

            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="w-7 h-7 rounded-xl bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-white flex items-center justify-center transition-all duration-300"
                title="Collapse Sidebar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>

          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden animate-in fade-in duration-300 px-0.5">
              <h1 className="text-xs font-bold text-white truncate">{title}</h1>
              <p className="text-[10px] text-zinc-400 truncate">{user?.name}</p>
              <span className="w-max mt-1 text-[8px] uppercase tracking-wider font-extrabold bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded-full">
                {user?.role?.replace('_', ' ')}
              </span>
            </div>
          )}

          {isCollapsed && (
            <button
              onClick={() => setIsCollapsed(false)}
              className="w-10 h-6 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full flex items-center justify-center text-white transition-all duration-300 mt-0.5"
              title="Expand Sidebar"
            >
              <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>

        <nav className="relative flex flex-col gap-2.5 w-full">
          {activeIndex !== -1 && (
            <div
              className={`absolute bg-zinc-800 border border-zinc-700 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0 h-10 ${
                isCollapsed ? 'w-10 left-1/2 -translate-x-1/2' : 'w-full left-0'
              }`}
              style={{
                transform: `translateY(${activeIndex * (40 + 10)}px) ${
                  isCollapsed ? 'translateX(-50%)' : ''
                }`,
              }}
            />
          )}

          {menuItems.map((item, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div key={item.path} className="relative group flex items-center w-full">
                {isCollapsed && (
                  <div className="absolute left-14 bg-zinc-900 text-zinc-100 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl border border-zinc-700 whitespace-nowrap opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-50 flex items-center gap-1.5">
                    <span className={isActive ? 'text-white font-extrabold' : ''}>
                      {item.label}
                    </span>
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-zinc-700 rotate-45" />
                  </div>
                )}

                <NavLink
                  to={item.path}
                  className={`relative z-10 flex items-center h-10 rounded-2xl transition-all duration-300 w-full ${
                    isCollapsed ? 'justify-center' : 'px-3 gap-2.5'
                  } ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span
                    className={`flex items-center justify-center transition-transform duration-300 ${
                      isActive ? 'scale-110 text-white' : 'group-hover:scale-110'
                    }`}
                  >
                    {renderProfessionalIcon(item)}
                  </span>

                  {!isCollapsed && (
                    <span className="text-xs font-semibold tracking-wide truncate transition-opacity duration-300">
                      {item.label}
                    </span>
                  )}

                  {isActive && (
                    <span
                      className={`absolute bg-white rounded-full ${
                        isCollapsed
                          ? '-bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-1'
                          : 'right-2 top-1/2 -translate-y-1/2 w-1.5 h-3.5'
                      }`}
                    />
                  )}
                </NavLink>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="relative group pt-3 border-t border-zinc-800 w-full flex justify-center">
        {isCollapsed && (
          <div className="absolute left-14 bg-zinc-900 text-red-400 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl border border-red-900 whitespace-nowrap opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-50 flex items-center">
            Logout
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-l border-b border-red-900 rotate-45" />
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`h-10 flex items-center justify-center bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 rounded-2xl transition-all duration-300 border border-red-800/60 shadow-sm ${
            isCollapsed ? 'w-10' : 'w-full gap-2 px-2.5'
          }`}
        >
          <svg className="w-5 h-5 transition-transform group-hover:scale-110 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {!isCollapsed && <span className="text-xs font-bold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;



