import React, { Component } from 'react';

import './Footer.css';


class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is Footer',
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


export default Footer;

