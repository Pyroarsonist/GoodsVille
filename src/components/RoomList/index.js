import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import cx from 'classnames';
import RoomItem from './RoomItem';
import SearchBar from './SearchBar';
import roomListQuery from './roomList.graphql';

function RoomList() {
  const [limit /* setLimit */] = useState(10);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, data, error, refetch } = useQuery(roomListQuery, {
    variables: {
      input: {
        limit,
        offset,
      },
    },
  });

  useEffect(() => {
    refetch();
  }, [offset, limit]);

  useEffect(() => {
    setOffset((currentPage - 1) * limit);
  }, [currentPage]);

  // todo: add error view
  if (error) return <p>Error view</p>;
  if (loading) return <p>Loading ...</p>;
  const { rooms: { items: rooms, count } = {} } = data;

  const predictedLastPage = parseInt(count / limit) + 1;

  return (
    <>
      <SearchBar />
      <div className="container">
        <h4 className="mt-2 row">Total count: {count}</h4>
        <div className="d-flex flex-wrap align-content-around mt-3">
          {rooms.map(room => (
            <RoomItem room={room} key={room.id} refetch={refetch} />
          ))}
        </div>

        <nav>
          <ul className="pagination justify-content-center">
            <li className={cx('page-item', currentPage <= 1 && 'disabled')}>
              <button
                type="button"
                className="page-link"
                aria-label="Previous"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <span>
                  <i className="fas fa-backward" />
                </span>
              </button>
            </li>
            <li className="page-item">
              <button type="button" className="page-link">
                {currentPage}
              </button>
            </li>
            <li
              className={cx(
                'page-item',
                currentPage >= predictedLastPage && 'disabled',
              )}
            >
              <button
                type="button"
                className="page-link"
                aria-label="Next"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <span>
                  <i className="fas fa-forward" />
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default RoomList;
