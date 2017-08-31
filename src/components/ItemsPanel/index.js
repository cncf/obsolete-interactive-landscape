import React, { Component } from 'react';

import ProductTitle from './components/ProductTitle';
import Product from './components/Product';
import Graph3d from './components/Graph3d';
import Control from './components/Control';
import Footer from './../Footer';
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
        <div className="content_wrapper">
            <div className="graph3d_wra">
            </div>
            <Graph3d />
          
            <div>
              <ProductTitle />
              <Product />
              <Control />
            </div>
         
        </div>
        <div className="footer_wrapper">
          <Footer />
        </div>
      </div>

    );
  }
}


export default ItemsPanel;

