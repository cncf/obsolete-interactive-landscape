import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react'

import './Filter.css';


class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cncf: {
        title: 'cncf',
        status: true,
      },
      oss: {
        title: 'oss',
        status: true,
      },
    };
  }

  render() {
    const state = this.state;
    return (
      <div>
        <div><Checkbox toggle defaultChecked /> {state.cncf.title}</div>
        <div><Checkbox toggle /> {state.oss.title}</div>
      </div>

    );
  }
}


export default Filter;

