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
          <a href="https://www.cncf.io/" target="_blank" rel="noopener noreferrer">
            <div className="partner1" />
          </a>
          <a href="http://www.redpoint.com/" target="_blank" rel="noopener noreferrer">
            <div className="partner2" />
          </a>
          <a href="http://www.amplifypartners.com/" target="_blank" rel="noopener noreferrer">
            <div className="partner3" />
          </a>
        </div>
        
      </div>
    );
  }
}


export default Header;

