import React from 'react';

export default React.createClass({
    displayName: 'BaseApp',

    render: function () {
        return this.props.children;
    },
});
