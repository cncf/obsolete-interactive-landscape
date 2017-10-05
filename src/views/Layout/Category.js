import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dataSet from './data/file.json';

class Category extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    
    };
    
    this.updateState = this.updateState.bind(this);
  }
  componentWillMount() {
    this.updateState();
  }
  
  updateState() {
    const data = dataSet;
    this.setState({ landscape: data });
  }
  
  render() {
    
    return (
      <div>
        <h1>Category here</h1>
        <h5>{props.match.params.slugname}</h5>
      </div>
    );
  }
}

const Player = (props) => {
  const player = PlayerAPI.get(
    parseInt(props.match.params.number, 10)
  )
  if (!player) {
    return <div>Sorry, but the player was not found</div>
  }
  return (
    <div>
      <h1>{player.name} (#{player.number})</h1>
      <h2>{player.position}</h2>
    </div>
  )
}

export default Category;

