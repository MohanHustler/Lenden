import React from 'react';
import "./pagination.scss"

const Pagination = ({ postPerpage, totalPost, paginate }) => {
  
  const pageNumber = [];

  for(let i = 1; i<= Math.ceil(totalPost / postPerpage); i++ ) {
    pageNumber.push(i);
  }
  
  return(
    <div>
      <ul className="pagination" >
        {pageNumber.map(number => (
          <li key={number} className="page-item"  >
            <a onClick={() => paginate(number)} className="page-link"  >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination
