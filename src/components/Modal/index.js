import React, { Component } from 'react';

import './Modal.css';


class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is Modal',
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


export default Modal;

