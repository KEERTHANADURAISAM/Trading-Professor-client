import React from 'react';
import Pagination from './Pagination';
import { 
  TrendingUp, Search, Edit3, Trash2, RefreshCw, FileText, Eye, Download, DollarSign
} from 'lucide-react';

// Copy Trading Tab Component
const CopyTradingTab = ({ 
  filteredApplications, loading, searchTerm, setSearchTerm, selectedStatus, setSelectedStatus,
  updateApplicationStatus, deleteApplication, handleEditApplication, handleViewFile,
  handleDownloadFile, formatDate, getStudentName, getStudentInitials, hasFiles, hasAadharFile,
  hasSignatureFile, fileLoading, getStatusColor, currentPage, setCurrentPage, itemsPerPage,
  formatCurrency, calculateAge
}) => {
  // Ensure filteredApplications is an array
  const safeApplications = Array.isArray(filteredApplications) ? filteredApplications : [];
  
  // Calculate pagination
  const totalItems = safeApplications.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedApplications = safeApplications.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle page change with validation
  const handlePageChange = (newPage) => {
    console.log('Page change requested:', newPage, 'Total pages:', totalPages);
    
    // Validate page number
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      
      // Optional: Scroll to top of table
      const tableElement = document.querySelector('.copy-trading-table');
      if (tableElement) {
        tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Handle search with page reset
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle status filter with page reset
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Get investment risk level color
  const getRiskLevelColor = (amount) => {
    if (amount >= 500000) return 'text-red-400 font-semibold';
    if (amount >= 100000) return 'text-yellow-400 font-semibold';
    return 'text-green-400 font-semibold';
  };

  // Get investment risk level text
  const getRiskLevel = (amount) => {
    if (amount >= 500000) return 'High Risk';
    if (amount >= 100000) return 'Medium Risk';
    return 'Low Risk';
  };

  // Debug logging
  console.log('=== COPY TRADING PAGINATION DEBUG ===');
  console.log('Total applications:', totalItems);
  console.log('Items per page:', itemsPerPage);
  console.log('Current page:', currentPage);
  console.log('Total pages calculated:', totalPages);
  console.log('Start index:', startIndex);
  console.log('End index:', endIndex);
  console.log('Paginated items count:', paginatedApplications.length);
  console.log('Filtered applications:', safeApplications);

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search copy trading applications..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="active">Active</option>
            <option value="rejected">Rejected</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        
        {/* Results summary */}
        <div className="mt-4 text-sm text-white/70">
          {totalItems === 0 ? (
            'No copy trading applications found'
          ) : (
            <>
              Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} applications
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedStatus !== 'all' && ` with status "${selectedStatus}"`}
            </>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/50">Total Applications</div>
            <div className="text-lg font-semibold text-white">{totalItems}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/50">Active Traders</div>
            <div className="text-lg font-semibold text-green-400">
              {safeApplications.filter(app => app.status === 'active').length}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/50">Total Investment</div>
            <div className="text-lg font-semibold text-blue-400">
              ₹{safeApplications.reduce((sum, app) => sum + (parseFloat(app.investmentAmount) || 0), 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-xs text-white/50">Avg. Investment</div>
            <div className="text-lg font-semibold text-purple-400">
              ₹{totalItems > 0 ? Math.round(safeApplications.reduce((sum, app) => sum + (parseFloat(app.investmentAmount) || 0), 0) / totalItems).toLocaleString() : 0}
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 copy-trading-table">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
              Copy Trading Applications
            </h3>
            <div className="text-sm text-white/70">
              Page {currentPage} of {totalPages || 1} (Total: {totalItems})
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 text-white animate-spin mx-auto mb-4" />
            <p className="text-white/70">Loading copy trading applications...</p>
          </div>
        ) : totalItems === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 mb-2">No copy trading applications found</p>
            {searchTerm && (
              <p className="text-white/50 text-sm">
                Try adjusting your search terms or filters
              </p>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Investment Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Application Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Documents
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {paginatedApplications.map((app, index) => {
                    const applicationId = app.id || app._id;
                    const globalIndex = startIndex + index + 1; // For debugging
                    const investmentAmount = parseFloat(app.investmentAmount) || 0;
                    
                    return (
                      <tr key={applicationId || `app-${index}`} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-medium mr-3">
                              {getStudentInitials(app)}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">
                                {getStudentName(app)} <span className="text-xs text-white/50">(#{globalIndex})</span>
                              </div>
                              <div className="text-sm text-white/70">
                                {app.email || 'No email'}
                              </div>
                              {app.phone && (
                                <div className="text-xs text-white/50">
                                  {app.phone} • Age: {calculateAge(app.dateOfBirth)}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-white font-semibold">
                              <DollarSign className="w-4 h-4 mr-1 text-green-400" />
                              ₹{investmentAmount.toLocaleString()}
                            </div>
                            <div className={`text-xs font-medium ${getRiskLevelColor(investmentAmount)}`}>
                              {getRiskLevel(investmentAmount)}
                            </div>
                            {app.investmentGoals && (
                              <div className="text-xs text-white/60 max-w-xs truncate" title={app.investmentGoals}>
                                {app.investmentGoals}
                              </div>
                            )}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/70">
                            {formatDate(app.createdAt || app.applicationDate)}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={app.status || 'pending'}
                            onChange={(e) => updateApplicationStatus(applicationId, e.target.value)}
                            className={`text-xs font-medium px-3 py-1 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-purple-400 ${getStatusColor(app.status || 'pending')}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="under_review">Under Review</option>
                            <option value="approved">Approved</option>
                            <option value="active">Active</option>
                            <option value="rejected">Rejected</option>
                            <option value="suspended">Suspended</option>
                          </select>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          {hasFiles(app) ? (
                            <div className="flex space-x-2">
                              {hasAadharFile(app) && (
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => handleViewFile(applicationId, 'aadhar', 'Aadhar Card')}
                                    className="text-blue-400 hover:text-blue-300 transition-colors p-1 rounded"
                                    disabled={fileLoading}
                                    title="View Aadhar"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDownloadFile(applicationId, 'aadhar', 'aadhar.pdf')}
                                    className="text-green-400 hover:text-green-300 transition-colors p-1 rounded"
                                    disabled={fileLoading}
                                    title="Download Aadhar"
                                    data-download={`${applicationId}-aadhar`}
                                  >
                                    <Download className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
                              {hasSignatureFile(app) && (
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => handleViewFile(applicationId, 'signature', 'Signature')}
                                    className="text-blue-400 hover:text-blue-300 transition-colors p-1 rounded"
                                    disabled={fileLoading}
                                    title="View Signature"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDownloadFile(applicationId, 'signature', 'signature.png')}
                                    className="text-green-400 hover:text-green-300 transition-colors p-1 rounded"
                                    disabled={fileLoading}
                                    title="Download Signature"
                                    data-download={`${applicationId}-signature`}
                                  >
                                    <Download className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-white/50 text-sm">No files</span>
                          )}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditApplication(app)}
                              className="text-blue-400 hover:text-blue-300 transition-colors p-1 rounded"
                              title="Edit Application"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteApplication(applicationId)}
                              className="text-red-400 hover:text-red-300 transition-colors p-1 rounded"
                              title="Delete Application"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Pagination - Show if more than itemsPerPage items OR if currently on page > 1 */}
            {(totalItems > itemsPerPage || currentPage > 1) && (
              <div className="border-t border-white/10">
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CopyTradingTab;