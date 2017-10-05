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
        <h1>This is Category component</h1>
      </div>
    );
  }
}

export default Category;

