import React from 'react';

function Categories() {
  const categories = [
    {
      name: 'All',
      amount: 58,
    },
    {
      name: 'rare',
      amount: 2,
    },
    {
      name: 'numismatics',
      amount: 15,
    },
    {
      name: 'mechanisms',
      amount: 24,
    },
    {
      name: 'auto',
      amount: 2,
    },
    {
      name: 'asdas',
      amount: 15,
    },
  ];

  return (
    <>
      <h1 className="mt-2 mb-2">Categories</h1>
      <ul className="list-group">
        {categories.map(item => (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {item.name}
            <span className="badge badge-primary badge-pill">
              {item.amount}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Categories;
