import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        {!isFirstPage && (
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => onPageChange(prevPage)}
            >
              Previous
            </a>
          </li>
        )}

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          const isCurrent = pageNumber === currentPage;

          return (
            <li key={pageNumber}>
              <a
                href="#"
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  isCurrent
                    ? 'text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </a>
            </li>
          );
        })}

        {!isLastPage && (
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => onPageChange(nextPage)}
            >
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
