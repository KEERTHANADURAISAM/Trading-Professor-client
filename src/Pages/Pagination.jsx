import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

// Pagination Component
const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Debug logging
  console.log('=== PAGINATION COMPONENT DEBUG ===');
  console.log('Current page:', currentPage);
  console.log('Total items:', totalItems);
  console.log('Items per page:', itemsPerPage);
  console.log('Total pages calculated:', totalPages);
  
  // Don't show pagination if no items or only one page
  if (totalItems === 0) return null;
  
  return (
    <div className="flex items-center justify-between mt-6 px-6 pb-4">
      <p className="text-white/70 text-sm">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
      </p>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => {
            console.log('Previous clicked, current page:', currentPage);
            onPageChange(currentPage - 1);
          }}
          disabled={currentPage === 1}
          className="p-2 text-white/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        {/* Always show at least current page, and show all pages if reasonable number */}
        {totalPages <= 10 ? (
          // Show all page numbers if 10 or fewer pages
          Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => {
                console.log(`Page ${page} clicked`);
                onPageChange(page);
              }}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-purple-600 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {page}
            </button>
          ))
        ) : (
          // Show truncated pagination for many pages
          <>
            {/* First page */}
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className="px-3 py-1 rounded text-white/70 hover:text-white hover:bg-white/10"
                >
                  1
                </button>
                {currentPage > 4 && <span className="text-white/50">...</span>}
              </>
            )}
            
            {/* Current page and neighbors */}
            {Array.from(
              { length: Math.min(5, totalPages) },
              (_, i) => Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i
            )
              .filter(page => page <= totalPages)
              .map(page => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? 'bg-purple-600 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {page}
                </button>
              ))}
            
            {/* Last page */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && <span className="text-white/50">...</span>}
                <button
                  onClick={() => onPageChange(totalPages)}
                  className="px-3 py-1 rounded text-white/70 hover:text-white hover:bg-white/10"
                >
                  {totalPages}
                </button>
              </>
            )}
          </>
        )}
        
        <button
          onClick={() => {
            console.log('Next clicked, current page:', currentPage, 'total pages:', totalPages);
            onPageChange(currentPage + 1);
          }}
          disabled={currentPage >= totalPages}
          className="p-2 text-white/70 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination