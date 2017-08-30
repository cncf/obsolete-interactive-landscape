import React, { Component } from 'react';

import Results from './components/Results';
import SearchBar from './components/SearchBar';

import './index.css';


class ResultsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'this is Results Panel',
    };
  }

  render() {
    const state = this.state;
    return (
      <div className="results-panel">
        {state.title}
        <Results />
        <SearchBar />
      </div>

    );
  }
}


export default ResultsPanel;

