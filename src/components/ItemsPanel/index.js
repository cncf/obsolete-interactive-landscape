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
    };
  }
  
  renderTitle(code){
    
    const state = this.state;
    
    let title= null;
    
    switch(code) {
      case 'app':
        title = {name:'Application and That', icon:'ico_app'};
        break;
      case 'dat':
        title = {name:'Databases', icon:'ico_data'};
        break;
      default : title= {name:'default', icon:'ico_default'};
    }
    
    return title;
    
  }

  render() {
    const state = this.state;
    
    let title = this.renderTitle('dat');
    return (
      <div className="items_panel">
        <div className="content_wrapper">
            <div className="graph3d_wrapper">
              <Graph3d />
            </div>
            <div className="items_wrapper">
              <ItemsTitle/>
  
              <h2 class="category-title-6 categ-big">
                <div class="ico-prov ico-medium"></div>
                { title.name}
              </h2>
              
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

