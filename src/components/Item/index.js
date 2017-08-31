import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'
import './index.css';


class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is Item',
    };
  }
  

  render() {
    const state = this.state;
    return (
      <div className="item">
  
        <Image src={ this.props.data.calculated.resized_logo} size='small' />
        <h2>
          { this.props.data.name}
          
        </h2>
        <p>
          { this.props.data.calculated.gh_stars}
        </p>
        
      </div>

    );
  }
}


export default Item;

