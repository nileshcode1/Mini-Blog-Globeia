import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, hasNext, hasPrev }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          hasPrev
            ? 'bg-background text-text-secondary border border-border hover:bg-surface-hover'
            : 'bg-secondary-100 text-text-muted cursor-not-allowed'
        }`}
      >
        Previous
      </button>
      
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            page === currentPage
              ? 'bg-accent text-text-inverse'
              : 'bg-background text-text-secondary border border-border hover:bg-surface-hover'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          hasNext
            ? 'bg-background text-text-secondary border border-border hover:bg-surface-hover'
            : 'bg-secondary-100 text-text-muted cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;