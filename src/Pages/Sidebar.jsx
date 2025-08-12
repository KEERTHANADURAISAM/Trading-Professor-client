
import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, DollarSign, TrendingUp, X,Repeat 
} from 'lucide-react';
import AnimatedBackground from './AnimatedGridBackground';

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    {id:'Copy Trading',label: 'Copy Trading', icon: Repeat}
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64 lg:flex lg:flex-col">
        <div className="bg-black/30 backdrop-blur-sm border-r border-white/10 h-full">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
          </div>
          
          <nav className="mt-8 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-purple-600/30 text-white border-r-2 border-purple-400'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-black/30 backdrop-blur-sm border-r border-white/10 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 lg:hidden`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white hover:text-purple-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-purple-600/30 text-white border-r-2 border-purple-400'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};



export default Sidebar