import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import './Layout.css';


class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'title',
    };

    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    const title = this.state.title;
    return (
      <Card>
        <h1>This is {title}</h1>
      </Card>

    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
      </div>

    );
  }
}


export default Layout;
