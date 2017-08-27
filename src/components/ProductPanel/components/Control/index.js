import React, { Component } from 'react';

import './index.css';


class Control extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is Control',
    };
  }

  render() {
    const state = this.state;
    return (
      <div>
        {state.title}
      </div>

    );
  }
}


export default Control;

