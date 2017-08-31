import React, { Component } from 'react';

import './index.css';
import Item from './../../../../components/Item';


class ItemsBox extends Component {
  constructor(props) {
    super(props);

    this.state={
      category: this.props.category,
    };

  }
  
  render() {
  
    const category= this.state.category;
    
    return (
      <div className="items_box">
        {category.items.map(function(item,index){
          return  <Item key={index} data={item} index={index} />;
    
        })}
        {category.items.map(function(item,index){
          return  <Item key={index} data={item} index={index} />;
    
        })}
        {category.items.map(function(item,index){
          return  <Item key={index} data={item} index={index} />;
    
        })}
        {category.items.map(function(item,index){
          return  <Item key={index} data={item} index={index} />;
    
        })}
        {category.items.map(function(item,index){
          return  <Item key={index} data={item} index={index} />;
    
        })}
        {category.items.map(function(item,index){
          return  <Item key={index} data={item} index={index} />;
    
        })}
        {category.items.map(function(item,index){
          return  <Item key={index} data={item} index={index} />;
    
        })}
      </div>

    );
  }
}


export default ItemsBox;

