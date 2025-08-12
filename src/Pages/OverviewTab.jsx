import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, DollarSign, TrendingUp, Search, Filter, 
  RefreshCw
} from 'lucide-react';

// Overview Tab Component
const OverviewTab = ({ stats, registrations, loading, getStudentName, getStudentInitials, getStatusColor }) => (
  <div className="space-y-6">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm">Total Students</p>
            <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
          </div>
          <Users className="h-8 w-8 text-blue-400" />
        </div>
      </div>
      
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm">Active Courses</p>
            <p className="text-2xl font-bold text-white">{stats.activeCourses}</p>
          </div>
          <BookOpen className="h-8 w-8 text-green-400" />
        </div>
      </div>
      
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold text-white">₹{stats.totalRevenue?.toLocaleString('en-IN') || '0'}</p>
          </div>
          <DollarSign className="h-8 w-8 text-yellow-400" />
        </div>
      </div>
      
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm">Completion Rate</p>
            <p className="text-2xl font-bold text-white">{stats.completionRate}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-purple-400" />
        </div>
      </div>
    </div>

    {/* Recent Registrations */}
    <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">Recent Registrations</h3>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="h-8 w-8 text-white animate-spin mx-auto mb-4" />
            <p className="text-white/70">Loading registrations...</p>
          </div>
        ) : registrations.slice(0, 5).length > 0 ? (
          <div className="space-y-4">
            {registrations.slice(0, 5).map((reg, index) => (
              <div key={reg.id || reg._id || index} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {getStudentInitials(reg)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{getStudentName(reg)}</p>
                  <p className="text-sm text-white/70">{reg.email || 'No email'}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.status || 'pending')}`}>
                  {reg.status || 'pending'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white/70 text-center py-8">No registrations found</p>
        )}
      </div>
    </div>
  </div>
);

export default OverviewTab