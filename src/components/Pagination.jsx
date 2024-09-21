import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, onPageChange, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(totalItems,itemsPerPage)

  return (
    <nav aria-label="Page navigation example" data-bs-theme="dark">
      <ul className="pagination justify-content-end">
        {
          pageNumbers.map(number=>(
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a href="#!" className='page-link' onClick={() => onPageChange(number)}>{number}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

export default Pagination;
/**
<li class="page-item"><a class="page-link"
*/
