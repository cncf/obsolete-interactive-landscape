import React, { Component } from 'react';

import './index.css';


class Iconator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  render() {
    const state = this.state;
    return (
      <div className="iconator">
        Iconator
      </div>
    );
  }
}


export default Iconator;

