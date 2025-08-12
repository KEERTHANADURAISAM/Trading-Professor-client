import React from 'react'
import Pagination from './Pagination';
import { 
  Users, Search, Edit3, Trash2, RefreshCw, FileText, Eye, Download
} from 'lucide-react';

// Registrations Tab Component
const RegistrationsTab = ({ 
  filteredRegistrations, loading, searchTerm, setSearchTerm, selectedStatus, setSelectedStatus,
  updateRegistrationStatus, deleteRegistration, handleEditRegistration, handleViewFile,
  handleDownloadFile, formatDate, getStudentName, getStudentInitials, hasFiles, hasAadharFile,
  hasSignatureFile, fileLoading, getStatusColor, currentPage, setCurrentPage, itemsPerPage
}) => {
  // Ensure filteredRegistrations is an array
  const safeRegistrations = Array.isArray(filteredRegistrations) ? filteredRegistrations : [];
  
  // Calculate pagination
  const totalItems = safeRegistrations.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRegistrations = safeRegistrations.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle page change with validation
  const handlePageChange = (newPage) => {
    console.log('Page change requested:', newPage, 'Total pages:', totalPages);
    
    // Validate page number
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      
      // Optional: Scroll to top of table
      const tableElement = document.querySelector('.registrations-table');
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

  // Debug logging
  console.log('=== PAGINATION DEBUG ===');
  console.log('Total registrations:', totalItems);
  console.log('Items per page:', itemsPerPage);
  console.log('Current page:', currentPage);
  console.log('Total pages calculated:', totalPages);
  console.log('Start index:', startIndex);
  console.log('End index:', endIndex);
  console.log('Paginated items count:', paginatedRegistrations.length);
  console.log('Filtered registrations:', safeRegistrations);

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search registrations..."
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
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        {/* Results summary */}
        <div className="mt-4 text-sm text-white/70">
          {totalItems === 0 ? (
            'No registrations found'
          ) : (
            <>
              Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} registrations
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedStatus !== 'all' && ` with status "${selectedStatus}"`}
            </>
          )}
        </div>
      </div>

      {/* Registrations List */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 registrations-table">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Student Registrations</h3>
            <div className="text-sm text-white/70">
              Page {currentPage} of {totalPages || 1} (Total: {totalItems})
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 text-white animate-spin mx-auto mb-4" />
            <p className="text-white/70">Loading registrations...</p>
          </div>
        ) : totalItems === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 mb-2">No registrations found</p>
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
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Files
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {paginatedRegistrations.map((reg, index) => {
                    const registrationId = reg.id || reg._id;
                    const globalIndex = startIndex + index + 1; // For debugging
                    return (
                      <tr key={registrationId || `reg-${index}`} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium mr-3">
                              {getStudentInitials(reg)}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">
                                {getStudentName(reg)} <span className="text-xs text-white/50">(#{globalIndex})</span>
                              </div>
                              <div className="text-sm text-white/70">
                                {reg.email || 'No email'}
                              </div>
                              {reg.phone && (
                                <div className="text-xs text-white/50">
                                  {reg.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">
                            {reg.courseName || reg.course || 'N/A'}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white/70">
                            {formatDate(reg.createdAt || reg.registrationDate)}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={reg.status || 'pending'}
                            onChange={(e) => updateRegistrationStatus(registrationId, e.target.value)}
                            className={`text-xs font-medium px-3 py-1 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-purple-400 ${getStatusColor(reg.status || 'pending')}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          {hasFiles(reg) ? (
                            <div className="flex space-x-2">
                              {hasAadharFile(reg) && (
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => handleViewFile(registrationId, 'aadhar', 'Aadhar Card')}
                                    className="text-blue-400 hover:text-blue-300 transition-colors p-1 rounded"
                                    disabled={fileLoading}
                                    title="View Aadhar"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDownloadFile(registrationId, 'aadhar', 'aadhar.pdf')}
                                    className="text-green-400 hover:text-green-300 transition-colors p-1 rounded"
                                    disabled={fileLoading}
                                    title="Download Aadhar"
                                    data-download={`${registrationId}-aadhar`}
                                  >
                                    <Download className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
                              {hasSignatureFile(reg) && (
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => handleViewFile(registrationId, 'signature', 'Signature')}
                                    className="text-blue-400 hover:text-blue-300 transition-colors p-1 rounded"
                                    disabled={fileLoading}
                                    title="View Signature"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDownloadFile(registrationId, 'signature', 'signature.png')}
                                    className="text-green-400 hover:text-green-300 transition-colors p-1 rounded"
                                    disabled={fileLoading}
                                    title="Download Signature"
                                    data-download={`${registrationId}-signature`}
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
                              onClick={() => handleEditRegistration(reg)}
                              className="text-blue-400 hover:text-blue-300 transition-colors p-1 rounded"
                              title="Edit Registration"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteRegistration(registrationId)}
                              className="text-red-400 hover:text-red-300 transition-colors p-1 rounded"
                              title="Delete Registration"
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

export default RegistrationsTab