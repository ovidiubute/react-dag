import React from 'react';
import { Button, Tooltip, Modal } from 'third-party-ui';

export default class Foo extends React.Component {
  render() {
    return (
      <div>
        <Button />
        <Tooltip value="Hey there!">
          <span>Some basic text...</span>
        </Tooltip>
        <Modal content="Awesome modal!" />
      </div>
    );
  }
}
