import React, { Component } from 'react';

import './SideBar.css';


class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '33',
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


export default SideBar;

