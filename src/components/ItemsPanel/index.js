import React, { Component } from 'react';

import ItemsTitle from './components/ItemsTitle';
import ItemsBox from './components/ItemsBox';
import Graph3d from './components/Graph3d';
import Control from './components/Control';
import Footer from './../Footer';
import './index.css';


class ItemsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Orchestration',
      code: 'orch',
    };
  }
  

  render() {
    
    return (
      <div className="items_panel">
        <div className="content_wrapper">
            <div className="graph3d_wrapper">
              <Graph3d />
            </div>
            <div className="items_wrapper">
              <ItemsTitle name={this.state.title} icon={this.state.code} />
              <ItemsBox />
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

