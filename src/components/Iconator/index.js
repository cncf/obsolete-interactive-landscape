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
      case 'apis':
        value = 'ico-apis';
        break;
      case 'data':
        value = 'ico-data';
        break;
      case 'deve':
        value = 'ico-deve';
        break;
      case 'infr':
        value = 'ico-infr';
        break;
      case 'obse':
        value = 'ico-obse';
        break;
      case 'orch':
        value = 'ico-orch';
        break;
      case 'plat':
        value = 'ico-plat';
        break;
      case 'prov':
        value = 'ico-prov';
        break;
      case 'runt':
        value = 'ico-runt';
        break;
      default : value = 'ico-prov';
    }
    return value;
  }
  
  iconSize(){
    const icon = this.props.size;
    let value = null;
    
    switch(icon) {
      case 's':
        value = 'ico-small';
        break;
      case 'm':
        value = 'ico-medium';
        break;
      case 'l':
        value = 'ico-large';
        break;
      default : value = 'ico-medium';
    }
    return value;
  }
  

  render() {
    const icon = this.renderIcon();
    const size = this.iconSize();
    
    return (
      <div className="iconator">
       
        <div className={classNames(size, icon)} />
        
      </div>
    );
  }
}


export default Iconator;

