import React, { Component } from 'react';
import ClassNames from 'classnames';

import './Layout.css';
import './Category.css';

class Start extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: 'Start',
    };
  }
  
  render() {
    return (
      <div>
        This is home
        
      </div>
      
    );
  }
}

export default Start;
