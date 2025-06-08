import React, { useState } from 'react';

const Sidebar = ({ isCollapsed, onToggle }) => {
  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-80'} flex-shrink-0 bg-gray-900 text-gray-100 flex flex-col h-full border-r border-gray-800 transition-all duration-300`}>
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
        {!isCollapsed && <span className="text-lg font-bold tracking-tight" style={{color: '#BFD741'}}>LeadGen Pro</span>}
        <button
          onClick={onToggle}
          className="p-1 rounded hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isCollapsed ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Pipeline Progress */}
      {!isCollapsed && (
        <div className="px-6 py-4 border-b border-gray-800">
          <h2 className="text-xs font-semibold text-gray-400 uppercase mb-2">Pipeline Health</h2>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-300">Monthly Goal</span>
              <span className="text-[11px] text-gray-500">68%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mb-3">
              <div className="h-1.5 rounded-full" style={{backgroundColor: '#BFD741', width: '68%'}}></div>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full" style={{backgroundColor: '#BFD741'}}>
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-sm text-gray-100">Lead Sources Active</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full" style={{backgroundColor: '#BFD741'}}>
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="text-sm text-gray-100">Workflows Running</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full border-2 border-gray-700"></span>
                <span className="text-sm text-gray-400">CRM Integration</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full border-2 border-gray-700"></span>
                <span className="text-sm text-gray-400">Email Templates</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Quick Actions */}
      <nav className={`flex-1 py-4 space-y-2 ${isCollapsed ? 'px-2' : 'px-6'}`}>
        <a href="#" className={`flex items-center gap-3 px-2 py-2 bg-gray-800 rounded text-sm font-medium text-gray-100 hover:text-white transition-colors ${isCollapsed ? 'justify-center' : ''}`} 
           onMouseEnter={(e) => e.target.style.backgroundColor = '#BFD741'} 
           onMouseLeave={(e) => e.target.style.backgroundColor = '#374151'}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          {!isCollapsed && 'Add New Lead'}
        </a>
        <a href="#" className={`flex items-center gap-3 px-2 py-2 rounded text-sm font-medium text-gray-100 hover:text-white transition-colors ${isCollapsed ? 'justify-center' : ''}`}
           onMouseEnter={(e) => e.target.style.backgroundColor = '#BFD741'} 
           onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          {!isCollapsed && 'Email Campaign'}
        </a>
        <a href="#" className={`flex items-center gap-3 px-2 py-2 rounded text-sm font-medium text-gray-100 hover:text-white transition-colors ${isCollapsed ? 'justify-center' : ''}`}
           onMouseEnter={(e) => e.target.style.backgroundColor = '#BFD741'} 
           onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          {!isCollapsed && 'Analytics'}
        </a>
        <a href="#" className={`flex items-center gap-3 px-2 py-2 rounded text-sm font-medium text-gray-100 hover:text-white transition-colors ${isCollapsed ? 'justify-center' : ''}`}
           onMouseEnter={(e) => e.target.style.backgroundColor = '#BFD741'} 
           onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {!isCollapsed && 'Settings'}
        </a>
      </nav>
      
      {/* Footer */}
      {!isCollapsed && (
        <div className="px-6 py-4 mt-auto border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-100">Great work!</p>
              <p className="text-xs text-gray-500">213 leads this month</p>
            </div>
            <button className="px-3 py-2 text-white text-xs font-semibold rounded transition-colors" 
                    style={{backgroundColor: '#BFD741'}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#A5C332'} 
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#BFD741'}>
              Export
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar; 