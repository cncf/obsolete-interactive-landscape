import React, { Component } from 'react';

import ProductTitle from './components/ProductTitle';
import Product from './components/Product';
import Graph3d from './components/Graph3d';
import Control from './components/Control';
import './index.css';


class ItemsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is Product',
    };
  }

  render() {
    const state = this.state;
    return (
      <div className="items_panel">
        {state.title}
        <ProductTitle />
        <Product />
        <Graph3d />
        <Control />
      </div>

    );
  }
}


export default ItemsPanel;

