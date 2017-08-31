import React, { Component } from 'react';

import ItemsTitle from './components/ItemsTitle';
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
      code: 'dat',
    };
  }
  
  defineItem(){
    const code = this.state.code;
    
    let value= null;
    
    switch(code) {
      case 'app':
        value = {name:'Application and That', icon:'ico_app'};
        break;
      case 'dat':
        value = {name:'Databases', icon:'ico_data'};
        break;
      default : value= {name:'default', icon:'ico_default'};
    }
    
    return value;
    
  }

  render() {
    const state = this.state;
    
    let item = this.defineItem();
    
    return (
      <div className="items_panel">
        <div className="content_wrapper">
            <div className="graph3d_wrapper">
              <Graph3d />
            </div>
            <div className="items_wrapper">
              <ItemsTitle name={item.name} icon={item.icon} />
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

