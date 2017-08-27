import React, { Component } from 'react';

import './Sidebar.css';


class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is Sidebar',
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

