import React, { useState } from 'react';

function SearchBar() {
  const [value, setValue] = useState('');
  const handleSubmit = async () => {};
  return (
    <nav className="navbar navbar-light bg-light">
      <h1 className="ml-5 pl-5">Rooms</h1>
      <form className="form-inline" onSubmit={handleSubmit()}>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </nav>
  );
}

export default SearchBar;
