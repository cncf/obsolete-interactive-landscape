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
          <span>{state.title}</span>
          <span>{state.version}</span>
        </div>
        <div className="logos" />
      </div>
    );
  }
}


export default Header;

