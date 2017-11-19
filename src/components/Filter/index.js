import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';

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
        <div><Checkbox toggle defaultChecked label={this.state.cncf.title} /></div>
        <div><Checkbox toggle label={this.state.oss.title} /></div>
        <div><Checkbox toggle label={this.state.commercial.title} /></div>
      </div>

    );
  }
}


export default Filter;

