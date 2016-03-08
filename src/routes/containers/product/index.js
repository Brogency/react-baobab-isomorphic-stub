import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
    displayName: 'Main',

    render: function() {
        return (
            <div>
                <h1>Product Page</h1>
                <Link to="/">back</Link>
            </div>
        );
    },
});