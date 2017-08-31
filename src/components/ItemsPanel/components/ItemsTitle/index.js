import React, { Component } from 'react';
import Iconator from './../../../../components/Iconator';
import './index.css';


class ProductTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is ItemsBox Title',
    };
  }
  

  render() {
    const state = this.state;
    return (
      <div className="items_title">
        <Iconator icon={this.props.icon} size="m" />
        <h2 class="category-title-6 categ-big">
          
          { this.props.name}
        </h2>
        
      </div>

    );
  }
}


export default ProductTitle;

