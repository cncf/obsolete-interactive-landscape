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
  iconSize() {
    const icon = this.props.size;
    let value = null;
    
    switch (icon) {
      case 's':
        value = 'icon_small';
        break;
      case 'm':
        value = 'icon_medium';
        break;
      case 'l':
        value = 'icon_large';
        break;
      case 'background':
        value = 'icon_background';
        break;
      default : value = 'icon_medium';
    }
    return value;
  }
  
  renderIcon() {
    const icon = this.props.icon;
    let value = null;
    
    switch (icon) {
      case 'apis':
        value = 'icon_apis';
        break;
      case 'data':
        value = 'icon_data';
        break;
      case 'app_definition_development':
        value = 'icon_deve';
        break;
      case 'public_cloud':
        value = 'icon_infr';
        break;
      case 'observability_analysis':
        value = 'icon_obse';
        break;
      case 'orchestration_and_management':
        value = 'icon_orch';
        break;
      case 'platform':
        value = 'icon_plat';
        break;
      case 'provisioning':
        value = 'icon_prov';
        break;
      case 'runtime':
        value = 'icon_runt';
        break;
      default : value = 'icon_prov';
    }
    return value;
  }
  

  render() {
    const icon = this.renderIcon(this.props.icon);
    const size = this.iconSize(this.props.size);
    
    return (
      <div className="iconator">
       
        <div className={classNames(size, icon)} />
        
      </div>
    );
  }
}


export default Iconator;

