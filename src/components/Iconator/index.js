import React, { Component } from 'react';
import classNames from 'classnames';

import './index.css';


class Iconator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }
  
  renderIcon(){
    const icon = this.props.icon;
    let value = null;
    
    switch(icon) {
      case 'app':
        value = 'ico-prov';
        break;
      case 'dat':
        value = 'ico-data';
        break;
      default : value = 'ico-prov';
    }
    
    return value;
  }
  

  render() {
    const icon = this.renderIcon();
    
    return (
      <div className="iconator">
       
        <div className={classNames('ico-medium', icon)} />
        
      </div>
    );
  }
}


export default Iconator;

