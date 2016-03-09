import React from 'react'
import SchemaBranchMixin from 'baobab-react-schemabranchmixin';
import {Link} from 'react-router'


function Input({ cursor }) {
  return (
    <input value={cursor.get()}
      onChange={(e) => cursor.set(e.target.value)}/>
  );
}

const Greet =  React.createClass({
  displayName: 'Greet',

  mixins: [SchemaBranchMixin],
  schema: {
    input: '',
  },

  render() {
    return (
      <div>
        <h1>Input</h1>
        <p>Hello {this.state.input} !</p>
        <Input cursor={this.cursors.input}/>
      </div>
    );
  },
});

export default React.createClass({
    displayName: 'Main',

    render: function() {
        return (
            <div>
                <h1>Product Page</h1>
                <Link to="/">back</Link>
                <Greet />
            </div>
        );
    },
});
