import React from 'react';
import hello from './hello.css';

export default React.createClass({
  displayName: 'Hello',

  render() {
    return (
      <div className={hello.main}>
        <span className="test">hello12345</span>
      </div>
    );
  },
});
