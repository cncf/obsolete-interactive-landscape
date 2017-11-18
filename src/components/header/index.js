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
        </div>
        <div className="logos">
          <div className="partner1" />
          <div className="partner2" />
          <div className="partner3" />
        </div>
        
      </div>
    );
  }
}


export default Header;

