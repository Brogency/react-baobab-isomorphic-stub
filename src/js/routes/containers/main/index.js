import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  displayName: 'Main',

  render() {
    return (
      <div>
        <h1>Main Page</h1>
        <Link to="/products">
          product
        </Link>
      </div>
    );
  },
});
