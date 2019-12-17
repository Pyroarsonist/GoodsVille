import React from 'react';
import history from '../../core/history';

function Home() {
  return (
    <div
      className="jumbotron jumbotron-fluid h-100"
      style={{ marginBottom: -32 }}
    >
      <div className="container">
        <h1 className="display-4">GoodsVille</h1>
        <p className="lead">
          Online platform implemented on the basis of an auction.
        </p>
        <hr className="my-4" />
        <p>
          Each user can submit their bids. Each lot has its own room. In order
          to be able to bid, you need to confirm your participation in the room
          with an interested lot. This can be done before bidding, time which
          was set by lot`s author. The room stores in itself: information about
          the lot, the start time of the auction and the list of participants.
          Participants receive a notification of the beginning and end of
          bidding. If no bids have been made, then the bidding is postponed and
          a notification about a new time is sent to all participants with a
          proposal to refuse to bid for this lot.
        </p>
        <hr className="my-4" />
        <div className="d-flex justify-content-between align-items-center my-5 px-5">
          <div className="d-flex flex-column text-center">
            <h4>Users</h4>
            <h4>228</h4>
          </div>
          <div className="d-flex flex-column text-center">
            <h4>Lots</h4>
            <h4>1488</h4>
          </div>
          <div className="d-flex flex-column text-center">
            <h4>Bids</h4>
            <h4>13337</h4>
          </div>
        </div>
        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            type="button"
            onClick={() => {
              history.push('/rooms');
              window.location.href = '/rooms';
            }}
          >
            Start
          </button>
        </p>
      </div>
    </div>
  );
}

export default Home;
