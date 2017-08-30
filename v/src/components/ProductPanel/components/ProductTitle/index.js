import React, { Component } from 'react';

import './index.css';


class ProductTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is Product Title',
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


export default ProductTitle;

