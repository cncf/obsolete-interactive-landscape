import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="header_container">
        <div className="title">
          <Link
            to={{
              pathname: '/',
            }}
          >
            {state.title}
          </Link>
          <p>v0.1</p>
        </div>
        
        <div className="header">
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
      </div>
      
    );
  }
}


export default Header;

