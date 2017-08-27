import React, { Component } from 'react';

import './ProductPanel.css';


class ProductPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is Product Product',
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


export default ProductPanel;

