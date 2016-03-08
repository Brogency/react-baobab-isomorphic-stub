import React from 'react';
import { root as RootMixin} from '../node_modules/baobab-react/mixins';
import '../static/scss/main.scss'

const Root = React.createClass({
    mixins: [RootMixin],

    render() {
        return this.props.children;
    },
});

export default function (tree) {
    return function (Component, props) {
        const treeName = Component.displayName.toLowerCase();
        const treeNested = props.tree || tree.select(treeName);

        return (
            <Root tree={tree}>
                <Component {...props} tree={treeNested} />
            </Root>
        );
    };
}