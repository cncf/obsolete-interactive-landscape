import React, { Component } from 'react';

import './index.css';


class Graph3d extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is Graph3d',
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


export default Graph3d;

