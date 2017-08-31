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
      <div className="items_title">
  
        <h2 class="category-title-6 categ-big">
          <div class="ico-prov ico-medium"/>
          { this.props.name}
        </h2>
        
      </div>

    );
  }
}


export default ProductTitle;

