import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'
import './index.css';
import image3d from './images/stack5.png';

class Graph3d extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is Graph 3D..',
    };
  }
  

  render() {
    return (
      <div className="graph_3d">
          { this.state.title}
  
        <Image fluid src={image3d} />
      </div>

    );
  }
}


export default Graph3d;

