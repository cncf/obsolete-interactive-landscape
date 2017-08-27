import React, { Component } from 'react';

import './index.css';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is SearchBar',
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


export default SearchBar;

