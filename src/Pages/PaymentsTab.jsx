import React from 'react';
import { 
  DollarSign, Search

} from 'lucide-react';
import Pagination from './Pagination';

// Payments Tab Component
const PaymentsTab = ({ 
  payments, filteredPayments, searchTerm, setSearchTerm, selectedStatus, setSelectedStatus,
  getPaymentStatusColor, formatDate, currentPage, setCurrentPage, itemsPerPage
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Payment History</h3>
        </div>
        
        {paginatedPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paginatedPayments.map((payment, index) => (
                  <tr key={payment.id || index} className="hover:bg-white/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{payment.name || 'Unknown'}</div>
                      <div className="text-sm text-white/70">{payment.email || 'No email'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">₹{payment.amount?.toLocaleString('en-IN') || '0'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{formatDate(payment.date || payment.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.status)}`}>
                        {payment.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{payment.method || 'Online'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/70">No payments found</p>
          </div>
        )}
        
        <Pagination
          currentPage={currentPage}
          totalItems={filteredPayments.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PaymentsTab