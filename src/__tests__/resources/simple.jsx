import React from 'react';
import Tooltip from 'third-party-ui/tooltip';

export default class Foo extends React.Component {
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
