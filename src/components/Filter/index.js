import React, { Component } from 'react';

import './Filter.css';


class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cncf: {
        title: 'CNCF',
        status: true,
      },
      oss: {
        title: 'Open Source',
        status: true,
      },
      commercial: {
        title: 'Commercial',
        status: true,
      },
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>

    );
  }
}


export default Filter;

