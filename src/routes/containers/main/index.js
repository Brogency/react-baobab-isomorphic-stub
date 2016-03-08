import React from 'react';
import {Link} from 'react-router'

import logo from 'images/logo.png'

export default React.createClass({
    displayName: 'Main',

    render: function() {
        return (
            <div>
                <img src={logo} alt="logo"/>
                <h1>Main Page</h1>
                <Link to="/products">product</Link>
            </div>
        );
    },
});