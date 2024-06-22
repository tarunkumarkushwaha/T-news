import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center my-4">
      <ul className="flex list-none p-0">
        <li className={`page-item ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <button 
            className="px-3 py-1 mx-1 border border-gray-300 rounded hover:bg-gray-400"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item `}>
            <button 
              onClick={() => onPageChange(number)} 
              className={`px-3 py-1 mx-1 border border-gray-300 rounded hover:bg-gray-400 ${number === currentPage ? 'bg-slate-700 text-white' : ''}`}
            >
              {number}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <button 
            className="px-3 py-1 mx-1 border border-gray-300 rounded hover:bg-gray-400"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
