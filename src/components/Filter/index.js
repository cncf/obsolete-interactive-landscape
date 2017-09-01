import React, { Component } from 'react';

import './Filter.css';


class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '+',
    };
  }

  render() {
    const state = this.state;
    return (
      <div>
        {state.title}
      </div>

    );
  }
}


export default Filter;

