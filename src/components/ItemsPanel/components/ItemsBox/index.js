import React, { Component } from 'react';

import './index.css';


class ItemsBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is ItemsBox',
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


export default ItemsBox;

