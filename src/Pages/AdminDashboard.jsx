import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Settings, TrendingUp, Plus, Edit, Trash2, Eye, Search, Filter, Download, Menu, X, Bell, User, DollarSign, FileImage, FileText, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

// Animated Background Component
const AnimatedBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-10px) rotate(180deg); opacity: 0.6; }
        }
      `}</style>
      
      {children}
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showEditRegistration, setShowEditRegistration] = useState(false);
  const [editingRegistration, setEditingRegistration] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);


  // API Base URL
  const API_BASE_URL = 'https://trading-professor-server.onrender.com/';

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch registrations with proper error handling
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/registration/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Registration data:', data);
      
      // Handle different possible response structures
      let registrationData = [];
      if (data.registrations && Array.isArray(data.registrations)) {
        registrationData = data.registrations;
      } else if (Array.isArray(data)) {
        registrationData = data;
      } else if (data.data && Array.isArray(data.data)) {
        registrationData = data.data;
      }else if (data.data && data.data.registrations && Array.isArray(data.data.registrations)) {
  registrationData = data.data.registrations;
}
      
      setRegistrations(registrationData);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch registrations:', err);
      setError(`Failed to load registrations: ${err.message}`);
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch payments
  const fetchPayments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }
      const data = await response.json();
      setPayments(Array.isArray(data.payments) ? data.payments : []);
    } catch (err) {
      console.error('Failed to fetch payments:', err);
      setPayments([]);
    }
  };

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchRegistrations(), fetchPayments()]);
    setRefreshing(false);
    showNotification('Data refreshed successfully');
  };

  // Update registration status
  const updateRegistrationStatus = async (registrationId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/registration/${registrationId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local state
      setRegistrations(prev => 
        prev.map(reg => 
          (reg.id || reg._id) === registrationId 
            ? { ...reg, status: newStatus }
            : reg
        )
      );
      
      showNotification(`Status updated to ${newStatus}`);
    } catch (err) {
      console.error('Failed to update status:', err);
      showNotification('Failed to update status', 'error');
    }
  };

  // Delete registration
  const deleteRegistration = async (registrationId) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/registration/${registrationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete registration');
      }

      // Update local state
      setRegistrations(prev => 
        prev.filter(reg => (reg.id || reg._id) !== registrationId)
      );
      
      showNotification('Registration deleted successfully');
    } catch (err) {
      console.error('Failed to delete registration:', err);
      showNotification('Failed to delete registration', 'error');
    }
  };

  // Download file
 // Frontend: Fixed handleDownloadFile function
const handleDownloadFile = async (registrationId, fileType, fileName) => {
  try {
    console.log('Downloading file:', { registrationId, fileType, fileName });
    setFileLoading(true)
    // Download URL
const apiUrl = `${API_BASE_URL}api/registration/download/${registrationId}/${fileType}`;
// View URL  

    console.log('API URL:', apiUrl);
    
    // Show loading indicator (optional)
    const downloadBtn = document.querySelector(`[data-download="${registrationId}-${fileType}"]`);
    if (downloadBtn) {
      downloadBtn.disabled = true;
      downloadBtn.textContent = 'Downloading...';
    }
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/octet-stream, application/pdf, image/*',
      },
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      let errorData;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        errorData = { 
          error: `HTTP ${response.status}: ${response.statusText}`,
          details: await response.text()
        };
      }
      
      console.error('Server response:', errorData);
      
      // Show user-friendly error message
      alert(`File download failed: ${errorData.error || 'Unknown error'}`);
      return;
    }
    
    // Get filename from response headers if available
    const contentDisposition = response.headers.get('content-disposition');
    let downloadFileName = fileName;
    
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (fileNameMatch && fileNameMatch[1]) {
        downloadFileName = fileNameMatch[1].replace(/['"]/g, '');
      }
    }
    
    // Fallback filename if none provided
    if (!downloadFileName) {
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadFileName = `${fileType}_${registrationId}_${timestamp}`;
    }
    
    console.log('Using filename:', downloadFileName);
    
    // Handle successful download
    const blob = await response.blob();
    console.log('Downloaded blob size:', blob.size, 'bytes');
    
    // Check if blob is not empty
    if (blob.size === 0) {
      throw new Error('Downloaded file is empty');
    }
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadFileName;
    a.style.display = 'none'; // Hide the element
    
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 100);
    
    console.log('✅ File download initiated successfully');
    
    // Show success message (optional)
    // alert(`File "${downloadFileName}" downloaded successfully!`);
    
  } catch (error) {
    console.error('Download failed:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // More specific error messages
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      alert('Unable to connect to server. Please check your internet connection and try again.');
    } else if (error.message.includes('empty')) {
      alert('The downloaded file appears to be empty. Please contact support.');
    } else {
      alert(`Download failed: ${error.message}. Please try again or contact support.`);
    }
  } finally {
    // Reset button state (optional)
    const downloadBtn = document.querySelector(`[data-download="${registrationId}-${fileType}"]`);
    if (downloadBtn) {
      downloadBtn.disabled = false;
      downloadBtn.textContent = 'Download';
    }
   
    setFileLoading(false);
  

  }
};

  // View file
 const handleViewFile = async (registrationId, fileType, fileName) => {
  try {
    setFileLoading(true);
    const fileUrl = `${API_BASE_URL}api/registration/view/${registrationId}/${fileType}`;
    
    // First check if the file exists by making a HEAD request or GET request
    const response = await fetch(fileUrl, {
      method: 'HEAD', // Just check if file exists without downloading
      headers: {
        'Authorization': `Bearer ${token}`, // Add if you have authentication
      }
    });

    if (!response.ok) {
      // If HEAD request fails, try GET to get the actual error message
      const getResponse = await fetch(fileUrl);
      const errorData = await getResponse.json();
      
      showNotification(errorData.message || 'File not found', 'error');
      return;
    }

    setSelectedFile({ url: fileUrl, name: fileName });
    setShowFileModal(true);
    
  } catch (error) {
    console.error('View failed:', error);
    showNotification('Failed to view file', 'error');
  } finally {
    setFileLoading(false);
  }
};
  // Initial data fetch
  useEffect(() => {
    fetchRegistrations();
    fetchPayments();
  }, []);

  const [courses, setCourses] = useState([
    { id: 1, title: 'Basic Trading Fundamentals', duration: '4 weeks', price: '₹5,999', students: 156, status: 'active', description: 'Learn the basics of stock market trading' },
    { id: 2, title: 'Advanced Trading Strategies', duration: '6 weeks', price: '₹8,999', students: 89, status: 'active', description: 'Master advanced trading techniques' },
    { id: 3, title: 'Options Trading Mastery', duration: '8 weeks', price: '₹12,999', students: 67, status: 'active', description: 'Complete guide to options trading' },
    { id: 4, title: 'Cryptocurrency Trading', duration: '5 weeks', price: '₹7,499', students: 123, status: 'draft', description: 'Digital currency trading strategies' },
  ]);

  const stats = {
    totalStudents: registrations.length,
    activeCourses: courses.filter(c => c.status === 'active').length,
    totalRevenue: payments.reduce((sum, payment) => sum + (payment.amount || 0), 0),
    completionRate: '78%'
  };

  const filteredRegistrations = registrations.filter(reg => {
    if (!reg) return false;
    const searchFields = [
      reg.firstName, reg.lastName, reg.name, reg.email, 
      reg.phone, reg.courseName, reg.course
    ].filter(Boolean).join(' ').toLowerCase();
    
    const matchesSearch = searchFields.includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || reg.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredPayments = payments.filter(payment => {
    if (!payment) return false;
    return (payment.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
           (payment.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
  });

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowEditModal(true);
  };

  const handleSaveCourse = (updatedCourse) => {
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    setShowEditModal(false);
    setEditingCourse(null);
    showNotification('Course updated successfully');
  };

  const handleEditRegistration = (registration) => {
    setEditingRegistration(registration);
    setShowEditRegistration(true);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'success':
      case 'completed':
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileExtension = (url) => {
    if (!url || typeof url !== 'string') return '';
    return url.split('.').pop()?.toLowerCase() || '';
  };

  const isImageFile = (url) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    return imageExtensions.includes(getFileExtension(url));
  };

  const isPdfFile = (url) => {
    return getFileExtension(url) === 'pdf';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-IN');
    } catch {
      return 'Invalid Date';
    }
  };

  const getStudentName = (reg) => {
    if (reg.firstName && reg.lastName) {
      return `${reg.firstName} ${reg.lastName}`;
    }
    return reg.name || reg.firstName || reg.lastName || 'Unknown';
  };

  const getStudentInitials = (reg) => {
    const name = getStudentName(reg);
    return name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase();
  };

  const hasFiles = (reg) => {
    // Check if registration has file fields
    return !!(reg.aadharFile || reg.aadharCard || reg.signatureFile || reg.signature);
  };

  const hasAadharFile = (reg) => {
  return !!(reg.aadharFile || reg.aadharCard);
};

const hasSignatureFile = (reg) => {
  return !!(reg.signatureFile || reg.signature);
};


  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = () => {
      if (sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <AnimatedBackground>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' 
            ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
            : 'bg-red-500/20 border border-red-500/30 text-red-300'
        } backdrop-blur-md`}>
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            {notification.message}
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
                className="lg:hidden p-2 rounded-md text-white hover:bg-white/20 transition-colors"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <div className="flex items-center ml-2 lg:ml-0">
                <TrendingUp className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold text-white hidden sm:block">Trading Academy</span>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-white hover:bg-white/20 rounded-md transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-6 w-6 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
              <button className="p-2 text-white hover:bg-white/20 rounded-md">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-white hover:bg-white/20 rounded-md">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white/10 backdrop-blur-md border-r border-white/20 transform transition-transform duration-300 ease-in-out z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 pt-16`}>
        <div className="p-6">
          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveTab('overview');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Settings className="h-5 w-5 mr-3" />
              Overview
            </button>
            <button
              onClick={() => {
                setActiveTab('registrations');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'registrations' 
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="h-5 w-5 mr-3" />
              Student Registrations
            </button>
            <button
              onClick={() => {
                setActiveTab('courses');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'courses' 
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BookOpen className="h-5 w-5 mr-3" />
              Course Management
            </button>
            <button
              onClick={() => {
                setActiveTab('payments');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === 'payments' 
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <DollarSign className="h-5 w-5 mr-3" />
              Payments
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">Admin Dashboard</h2>
          <p className="text-white/70 mt-2">Manage your trading academy efficiently</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Total Students</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">{stats.totalStudents}</p>
                  </div>
                  <Users className="h-8 lg:h-10 w-8 lg:w-10 text-blue-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Active Courses</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">{stats.activeCourses}</p>
                  </div>
                  <BookOpen className="h-8 lg:h-10 w-8 lg:w-10 text-green-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Total Revenue</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">₹{stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 lg:h-10 w-8 lg:w-10 text-purple-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Completion Rate</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">{stats.completionRate}</p>
                  </div>
                  <Settings className="h-8 lg:h-10 w-8 lg:w-10 text-orange-400" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-4">Recent Registrations</h3>
              {loading ? (
                <p className="text-white/70">Loading...</p>
              ) : registrations.length === 0 ? (
                <p className="text-white/70">No registrations found</p>
              ) : (
                <div className="space-y-3 lg:space-y-4">
                  {registrations.slice(0, 3).map(reg => (
                    <div key={reg.id || reg._id} className="flex items-center justify-between p-3 lg:p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className="w-8 lg:w-10 h-8 lg:h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-300 font-semibold text-sm lg:text-base">{getStudentInitials(reg)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm lg:text-base">{getStudentName(reg)}</p>
                          <p className="text-xs lg:text-sm text-white/70">{reg.courseName || reg.course || 'No course'}</p>
                        </div>
                      </div>
                      <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.status || 'pending')}`}>
                        {reg.status || 'pending'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Registrations Tab */}
        {activeTab === 'registrations' && (
          <div>
            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 lg:p-6 mb-4 lg:mb-6">
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button className="px-3 lg:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Download className="h-4 w-4 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Students Table - Mobile Cards / Desktop Table */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-white/70">Loading registrations...</div>
              ) : filteredRegistrations.length === 0 ? (
                <div className="p-8 text-center text-white/70">No registrations found</div>
              ) : (
                <>
                  {/* Mobile View - Cards */}
                  <div className="lg:hidden">
                    {filteredRegistrations.map(reg => (
                      <div key={reg.id || reg._id} className="p-4 border-b border-white/10 last:border-b-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                              <span className="text-blue-300 font-semibold text-sm">{getStudentInitials(reg)}</span>
                            </div>
                            <div>
                              <p className="font-medium text-white">{getStudentName(reg)}</p>
                              <p className="text-sm text-white/70">{reg.email || 'No email'}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={reg.status || 'pending'}
                              onChange={(e) => updateRegistrationStatus(reg.id || reg._id, e.target.value)}
                              className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded text-white"
                            >
                              <option value="pending">Pending</option>
                              <option value="active">Active</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div>
                            <span className="text-white/70">Course:</span>
                            <p className="text-white">{reg.courseName || reg.course || 'No course'}</p>
                          </div>
                          <div>
                            <span className="text-white/70">Phone:</span>
                            <p className="text-white">{reg.phone || 'No phone'}</p>
                          </div>
                          <div>
                            <span className="text-white/70">Join Date:</span>
                            <p className="text-white">{formatDate(reg.createdAt || reg.joinDate)}</p>
                          </div>
                          <div>
                            <span className="text-white/70">Experience:</span>
                            <p className="text-white">{reg.tradingExperience || 'Not specified'}</p>
                          </div>
                        </div>
                        {(hasFiles(reg)) && (
                          <div className="mb-3">
                            <span className="text-white/70 text-sm">Files:</span>
                            <div className="flex gap-2 mt-1">
                              <div className="flex">
                                <button
                                  onClick={() => handleViewFile(reg.id || reg._id, 'aadhar', 'Aadhar Card')}
                                  className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded-l text-xs flex items-center"
                                >
                                  <FileImage className="h-3 w-3 mr-1" />
                                  Aadhar
                                </button>
                                <button
                                  onClick={() => handleDownloadFile(reg.id || reg._id, 'aadhar', `${getStudentName(reg)}_Aadhar`)}
                                  className="px-1 py-1 bg-blue-700/20 text-blue-300 rounded-r text-xs hover:bg-blue-600/30"
                                  title="Download Aadhar Card"
                                >
                                  <Download className="h-3 w-3" />
                                </button>
                              </div>
                              <div className="flex">
                                <button
                                  onClick={() => handleViewFile(reg.id || reg._id, 'signature', 'Signature')}
                                  className="px-2 py-1 bg-green-600/20 text-green-300 rounded-l text-xs flex items-center"
                                >
                                  <FileText className="h-3 w-3 mr-1" />
                                  Signature
                                </button>
                                <button
                                  onClick={() => handleDownloadFile(reg.id || reg._id, 'signature', `${getStudentName(reg)}_Signature`)}
                                  className="px-1 py-1 bg-green-700/20 text-green-300 rounded-r text-xs hover:bg-green-600/30"
                                  title="Download Signature"
                                >
                                  <Download className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditRegistration(reg)}
                              className="p-2 text-blue-400 hover:bg-blue-600/20 rounded"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleEditRegistration(reg)}
                              className="p-2 text-green-400 hover:bg-green-600/20 rounded"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => deleteRegistration(reg.id || reg._id)}
                              className="p-2 text-red-400 hover:bg-red-600/20 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop View - Table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Student</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Contact</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Course</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Join Date</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Files</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {filteredRegistrations.map(reg => (
                          <tr key={reg.id || reg._id} className="hover:bg-white/5">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center">
                                  <span className="text-blue-300 font-medium text-sm">{getStudentInitials(reg)}</span>
                                </div>
                                <span className="font-medium text-white">{getStudentName(reg)}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm">
                                <p className="text-white">{reg.email || 'No email'}</p>
                                <p className="text-white/70">{reg.phone || 'No phone'}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-white">{reg.courseName || reg.course || 'No course'}</td>
                            <td className="px-6 py-4 text-sm text-white">{formatDate(reg.createdAt || reg.joinDate)}</td>
                            <td className="px-6 py-4">
                              <div className="flex gap-1">
  {hasFiles(reg) ? (
    <>
      {/* Aadhar File Buttons - Only show if aadhar file exists */}
      {hasAadharFile(reg) && (
        <div className="flex">
          <button
            onClick={() => handleViewFile(reg.id || reg._id, 'aadhar', 'Aadhar Card')}
            className="p-1 text-blue-400 hover:bg-blue-600/20 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
            title="View Aadhar Card"
            disabled={fileLoading}
          >
            <FileImage className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDownloadFile(reg.id || reg._id, 'aadhar', `${getStudentName(reg)}_Aadhar`)}
            className="p-1 text-blue-400 hover:bg-blue-600/20 rounded-r border-l border-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download Aadhar Card"
            disabled={fileLoading}
          >
            <Download className="h-3 w-3" />
          </button>
        </div>
      )}
      
      {/* Signature File Buttons - Only show if signature file exists */}
      {hasSignatureFile(reg) && (
        <div className={`flex ${hasAadharFile(reg) ? 'ml-1' : ''}`}>
          <button
            onClick={() => handleViewFile(reg.id || reg._id, 'signature', 'Signature')}
            className="p-1 text-green-400 hover:bg-green-600/20 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
            title="View Signature"
            disabled={fileLoading}
          >
            <FileText className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDownloadFile(reg.id || reg._id, 'signature', `${getStudentName(reg)}_Signature`)}
            className="p-1 text-green-400 hover:bg-green-600/20 rounded-r border-l border-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download Signature"
            disabled={fileLoading}
          >
            <Download className="h-3 w-3" />
          </button>
        </div>
      )}
      
      {/* Show message if no specific files found but hasFiles returned true */}
      {!hasAadharFile(reg) && !hasSignatureFile(reg) && (
        <span className="text-white/50 text-xs">Files detected but not accessible</span>
      )}
    </>
  ) : (
    <span className="text-white/50 text-xs">No files</span>
  )}
</div>
                            </td>
                            <td className="px-6 py-4">
                              <select
                                value={reg.status || 'pending'}
                                onChange={(e) => updateRegistrationStatus(reg.id || reg._id, e.target.value)}
                                className={`px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20 text-white ${getStatusColor(reg.status || 'pending')}`}
                              >
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => handleEditRegistration(reg)}
                                  className="p-1 text-blue-400 hover:bg-blue-600/20 rounded"
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleEditRegistration(reg)}
                                  className="p-1 text-green-400 hover:bg-green-600/20 rounded"
                                  title="Edit Registration"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => deleteRegistration(reg.id || reg._id)}
                                  className="p-1 text-red-400 hover:bg-red-600/20 rounded"
                                  title="Delete Registration"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Course Management</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add New Course
              </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {courses.map(course => (
                <div key={course.id} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 lg:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-white pr-2">{course.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)} flex-shrink-0`}>
                      {course.status}
                    </span>
                  </div>
                  
                  <p className="text-white/70 text-sm mb-4">{course.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Duration:</span>
                      <span className="text-white">{course.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Price:</span>
                      <span className="text-white font-semibold">{course.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Students:</span>
                      <span className="text-white">{course.students}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditCourse(course)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button className="px-3 py-2 text-red-400 hover:bg-red-600/20 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white">Payment Records</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export Payments
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 lg:p-6 mb-4 lg:mb-6">
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                    <input
                      type="text"
                      placeholder="Search payments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 lg:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="success">Success</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payments Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Total Payments</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">{payments.length}</p>
                  </div>
                  <DollarSign className="h-8 lg:h-10 w-8 lg:w-10 text-green-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Successful Payments</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">
                      {payments.filter(p => p.paymentStatus?.toLowerCase() === 'success' || p.status?.toLowerCase() === 'success').length}
                    </p>
                  </div>
                  <TrendingUp className="h-8 lg:h-10 w-8 lg:w-10 text-blue-400" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Total Revenue</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">
                      ₹{payments.filter(p => p.paymentStatus?.toLowerCase() === 'success' || p.status?.toLowerCase() === 'success')
                        .reduce((sum, payment) => sum + (payment.amount || 0), 0).toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-8 lg:h-10 w-8 lg:w-10 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              {payments.length === 0 ? (
                <div className="p-8 text-center text-white/70">No payment records found</div>
              ) : (
                <>
                  {/* Mobile View - Cards */}
                  <div className="lg:hidden">
                    {filteredPayments.map((payment, idx) => (
                      <div key={payment.id || payment._id || idx} className="p-4 border-b border-white/10 last:border-b-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-600/20 rounded-full flex items-center justify-center">
                              <DollarSign className="h-5 w-5 text-green-300" />
                            </div>
                            <div>
                              <p className="font-medium text-white">{payment.userName || payment.name || 'Unknown'}</p>
                              <p className="text-sm text-white/70">{payment.email || 'No email'}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.paymentStatus || payment.status)}`}>
                            {payment.paymentStatus || payment.status || 'unknown'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div>
                            <span className="text-white/70">Amount:</span>
                            <p className="text-white font-semibold">₹{payment.amount?.toLocaleString() || '0'}</p>
                          </div>
                          <div>
                            <span className="text-white/70">Date:</span>
                            <p className="text-white">{formatDate(payment.createdAt)}</p>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-white/70">Course:</span>
                          <p className="text-white">{payment.courseName || payment.course || 'No course specified'}</p>
                        </div>
                        {payment.transactionId && (
                          <div className="text-sm mt-2">
                            <span className="text-white/70">Transaction ID:</span>
                            <p className="text-white text-xs font-mono">{payment.transactionId}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Desktop View - Table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Customer</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Amount</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Course</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Date</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Transaction ID</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {filteredPayments.map((payment, idx) => (
                          <tr key={payment.id || payment._id || idx} className="hover:bg-white/5">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-600/20 rounded-full flex items-center justify-center">
                                  <span className="text-green-300 font-medium text-sm">{(payment.userName || payment.name || 'U').charAt(0)}</span>
                                </div>
                                <div>
                                  <p className="font-medium text-white">{payment.userName || payment.name || 'Unknown'}</p>
                                  <p className="text-sm text-white/70">{payment.email || 'No email'}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-lg font-semibold text-white">₹{payment.amount?.toLocaleString() || '0'}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-white">{payment.courseName || payment.course || 'No course specified'}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.paymentStatus || payment.status)}`}>
                                {payment.paymentStatus || payment.status || 'unknown'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-white">
                              {formatDate(payment.createdAt)}
                            </td>
                            <td className="px-6 py-4 text-sm text-white font-mono">
                              {payment.transactionId ? payment.transactionId.substring(0, 12) + '...' : 'N/A'}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button className="p-1 text-blue-400 hover:bg-blue-600/20 rounded">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-1 text-green-400 hover:bg-green-600/20 rounded">
                                  <Download className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Edit Course Modal */}
        {showEditModal && editingCourse && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-white mb-4">Edit Course</h3>
              <div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Course Title</label>
                    <input
                      type="text"
                      value={editingCourse.title}
                      onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Description</label>
                    <textarea
                      value={editingCourse.description}
                      onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Duration</label>
                    <input
                      type="text"
                      value={editingCourse.duration}
                      onChange={(e) => setEditingCourse({...editingCourse, duration: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Price</label>
                    <input
                      type="text"
                      value={editingCourse.price}
                      onChange={(e) => setEditingCourse({...editingCourse, price: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Status</label>
                    <select
                      value={editingCourse.status}
                      onChange={(e) => setEditingCourse({...editingCourse, status: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => handleSaveCourse(editingCourse)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Registration Modal */}
        {showEditRegistration && editingRegistration && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">Registration Details</h3>
                <button
                  onClick={() => setShowEditRegistration(false)}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="text-md font-medium text-white mb-3">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">First Name</label>
                      <input
                        type="text"
                        value={editingRegistration.firstName || ''}
                        onChange={(e) => setEditingRegistration({...editingRegistration, firstName: e.target.value})}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={editingRegistration.lastName || ''}
                        onChange={(e) => setEditingRegistration({...editingRegistration, lastName: e.target.value})}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                      <input
                        type="email"
                        value={editingRegistration.email || ''}
                        onChange={(e) => setEditingRegistration({...editingRegistration, email: e.target.value})}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={editingRegistration.phone || ''}
                        onChange={(e) => setEditingRegistration({...editingRegistration, phone: e.target.value})}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Course Information */}
                <div>
                  <h4 className="text-md font-medium text-white mb-3">Course Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Course Name</label>
                      <input
                        type="text"
                        value={editingRegistration.courseName || editingRegistration.course || ''}
                        onChange={(e) => setEditingRegistration({...editingRegistration, courseName: e.target.value})}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Trading Experience</label>
                      <select
                        value={editingRegistration.tradingExperience || ''}
                        onChange={(e) => setEditingRegistration({...editingRegistration, tradingExperience: e.target.value})}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Experience</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h4 className="text-md font-medium text-white mb-3">Registration Status</h4>
                  <select
                    value={editingRegistration.status || 'pending'}
                    onChange={(e) => setEditingRegistration({...editingRegistration, status: e.target.value})}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Files Section */}
                {hasFiles(editingRegistration) && (
                  <div>
                    <h4 className="text-md font-medium text-white mb-3">Uploaded Files</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h5 className="text-sm font-medium text-white mb-2">Aadhar Card</h5>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewFile(editingRegistration.id || editingRegistration._id, 'aadhar', 'Aadhar Card')}
                            className="px-3 py-2 bg-blue-600/20 text-blue-300 rounded text-sm flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </button>
                          <button
                            onClick={() => handleDownloadFile(editingRegistration.id || editingRegistration._id, 'aadhar', `${getStudentName(editingRegistration)}_Aadhar`)}
                            className="px-3 py-2 bg-green-600/20 text-green-300 rounded text-sm flex items-center"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </button>
                        </div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h5 className="text-sm font-medium text-white mb-2">Signature</h5>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewFile(editingRegistration.id || editingRegistration._id, 'signature', 'Signature')}
                            className="px-3 py-2 bg-blue-600/20 text-blue-300 rounded text-sm flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </button>
                          <button
                            onClick={() => handleDownloadFile(editingRegistration.id || editingRegistration._id, 'signature', `${getStudentName(editingRegistration)}_Signature`)}
                            className="px-3 py-2 bg-green-600/20 text-green-300 rounded text-sm flex items-center"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Registration Details */}
                <div>
                  <h4 className="text-md font-medium text-white mb-3">Registration Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/70">Registration ID:</span>
                      <p className="text-white font-mono">{editingRegistration.id || editingRegistration._id || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-white/70">Registration Date:</span>
                      <p className="text-white">{formatDate(editingRegistration.createdAt || editingRegistration.joinDate)}</p>
                    </div>
                    <div>
                      <span className="text-white/70">Last Updated:</span>
                      <p className="text-white">{formatDate(editingRegistration.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
                <button
                  onClick={() => deleteRegistration(editingRegistration.id || editingRegistration._id)}
                  className="px-4 py-2 bg-red-600/20 text-red-300 rounded-lg hover:bg-red-600/30 transition-colors flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Registration
                </button>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditRegistration(false)}
                    className="px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Here you would typically save the changes to the server
                      setRegistrations(prev => 
                        prev.map(reg => 
                          (reg.id || reg._id) === (editingRegistration.id || editingRegistration._id) 
                            ? editingRegistration 
                            : reg
                        )
                      );
                      setShowEditRegistration(false);
                      setEditingRegistration(null);
                      showNotification('Registration updated successfully');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* File View Modal */}
        {showFileModal && selectedFile && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">{selectedFile.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(selectedFile.url, '_blank')}
                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                    title="Open in New Tab"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setShowFileModal(false);
                      setSelectedFile(null);
                    }}
                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center">
                {isImageFile(selectedFile.url) ? (
                  <img
                    src={selectedFile.url}
                    alt={selectedFile.name}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : isPdfFile(selectedFile.url) ? (
                  <iframe
                    src={selectedFile.url}
                    className="w-full h-[70vh] rounded-lg"
                    title={selectedFile.name}
                  />
                ) : (
                  <div className="text-white/70 text-center py-8">
                    <FileImage className="h-16 w-16 mx-auto mb-4" />
                    <p className="mb-2 text-lg font-semibold">File Preview</p>
                    <p className="mb-4 text-sm">Click "Open in New Tab" to view the file.</p>
                    <button
                      onClick={() => window.open(selectedFile.url, '_blank')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </button>
                  </div>
                )}
                
                <div style={{ display: 'none' }} className="text-white/70 text-center py-8">
                  <FileImage className="h-16 w-16 mx-auto mb-4" />
                  <p className="mb-2 text-lg font-semibold">Unable to display file</p>
                  <p className="mb-4 text-sm">The file could not be loaded or displayed.</p>
                  <button
                    onClick={() => window.open(selectedFile.url, '_blank')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatedBackground>
  );
};

export default AdminDashboard;