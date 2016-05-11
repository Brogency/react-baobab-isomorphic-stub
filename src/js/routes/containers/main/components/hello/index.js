import React from 'react';
import hello from './hello.css';

export default React.createClass({
  displayName: 'Hello',

  render() {
    return (
      <div className={hello.main} />
    );
  },
});
