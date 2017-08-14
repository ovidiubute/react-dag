import React from 'react';
import * as UiComponents from 'third-party-ui';

export default class Foo extends React.Component {
  render() {
    return (
      <div>
        <UiComponents.Button />
        <UiComponents.Tooltip value="Hey there!">
          <span>Some basic text...</span>
        </UiComponents.Tooltip>
        <UiComponents.Modal content="Awesome modal!" />
      </div>
    );
  }
}
