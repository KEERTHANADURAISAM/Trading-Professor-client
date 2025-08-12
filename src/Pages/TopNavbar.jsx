import React, { useState, useEffect } from 'react';
import { 
 RefreshCw, Menu, 
 Bell, Settings, LogOut
} from 'lucide-react';
// Top Navigation Bar
const TopNavbar = ({ sidebarOpen, setSidebarOpen, handleRefresh, refreshing }) => (
  <div className="fixed top-0 right-0 left-0 lg:left-64 bg-black/20 backdrop-blur-sm border-b border-white/10 z-40">
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden text-white hover:text-purple-300 transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-white ml-4 lg:ml-0">Trading Academy</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
        <Bell className="h-5 w-5 text-white hover:text-purple-300 cursor-pointer" />
        <Settings className="h-5 w-5 text-white hover:text-purple-300 cursor-pointer" />
        <LogOut className="h-5 w-5 text-white hover:text-purple-300 cursor-pointer" />
      </div>
    </div>
  </div>
);


export default TopNavbar