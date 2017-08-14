import React from 'react';
import { Button, Tooltip, Modal } from 'third-party-ui';

import myStyles from '../css/styles.less';
import logo from './assets/funny.png';

export default class Foo extends React.Component {
  render() {
    return (
      <div background={logo}>
        <Button />
        <Tooltip style={myStyles} value="Hey there!">
          <span>Some basic text...</span>
        </Tooltip>
        <Modal content="Awesome modal!" />
      </div>
    );
  }
}
