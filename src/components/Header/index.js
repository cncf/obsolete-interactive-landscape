import React, { Component } from 'react';

import './Header.css';


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is Header',
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


export default Header;

