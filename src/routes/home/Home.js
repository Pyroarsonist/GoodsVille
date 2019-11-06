import React, { Component } from 'react';
import { compose } from 'redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Home.css';

class Home extends Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>Home</h1>
        </div>
      </div>
    );
  }
}

export default compose(withStyles(s))(Home);
