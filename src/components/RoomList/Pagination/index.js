import React from 'react';
import Link from 'components/Link';

function Pagination() {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <Link to="/" className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </Link>
        </li>
        <li className="page-item">
          <Link to="/" className="page-link">
            1
          </Link>
        </li>
        <li className="page-item">
          <Link to="/" className="page-link">
            2
          </Link>
        </li>
        <li className="page-item">
          <Link to="/" className="page-link">
            3
          </Link>
        </li>
        <li className="page-item">
          <Link to="/" className="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
