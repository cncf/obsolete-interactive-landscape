import React, { Component } from 'react';

import './index.css';


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Cloud Native Landscape',
      version: 'v0.1',
    };
  }

  render() {
    const state = this.state;
    return (
      <div className="header">
        <div className="title">
          <div>{state.title}</div>
          <div>{state.version}</div>
        </div>
        <div className="logos" />
      </div>
    );
  }
}


export default Header;

