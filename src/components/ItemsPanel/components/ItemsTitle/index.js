import React, { Component } from 'react';

import './index.css';


class ProductTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is Product Titlex',
    };
  }

  render() {
    const state = this.state;
    return (
      <div className="items_title">
        {state.title}
      </div>

    );
  }
}


export default ProductTitle;

