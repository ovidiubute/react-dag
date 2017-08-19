import React from 'react';
import { connect } from 'react-redux';
import Tooltip from 'third-party-ui/tooltip';

class Foo extends React.Component {
  render() {
    return (
      <div>
        <Tooltip value="Hey there!">
          <span>Some basic text...</span>
        </Tooltip>
      </div>
    );
  }
}

export const ConnectedFoo = connect(Foo);

export default Foo;
