import React, { Component } from 'react';

class Event extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li>
        {this.props.event.name}
      </li>
    );
  }
}

export default Event;
