import React from 'react';

export default React.createClass({
  displayName: 'BaseApp',

  render() {
    return this.props.children;
  },
});
