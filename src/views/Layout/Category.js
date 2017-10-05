import React, { Component } from 'react';

class Category extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      active: true,
    
    };
  }
  
  render() {
    return (
      <div>
        <h1>This is Category</h1>
        <h5>aloha {this.props.data[1].name}</h5>
        
      </div>
    );
  }
}

export default Category;

