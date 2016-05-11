import React from 'react';
import HelloBlock from './components/hello';
import { Link } from 'react-router';

export default React.createClass({
  displayName: 'Main',

  render() {
    return (
      <div>
        <h1>Main Pager</h1>
        <Link to="/products">
          product
        </Link>
        <HelloBlock />
      </div>
    );
  },
});
