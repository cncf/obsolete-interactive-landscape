import React, { Component } from 'react';

import './index.css';
import Item from './../../../../components/Item';


class ItemsBox extends Component {
  constructor(props) {
    super(props);

    this.state={
      category: this.props.category,
    };
    
    this.renderItems = this.renderItems.bind(this);

  }
  
  
  renderItems(){
    
    const category= this.state.category;
    
    return(
      <div>
        <h1> {category.name}</h1>
        <div>
          {category.items.map(function(item,index){
            return  <Item key={index} data={item} index={index} />;
            
          })}
        </div>
      </div>
    );
  }
  
 

  render() {
    const state = this.state;
    return (
      <div className="items_box">
        {state.title}
        {this.renderItems()}
      </div>

    );
  }
}


export default ItemsBox;

