import React, { Component } from 'react';
import classNames from 'classnames'
import './SideBar.css';


class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '33',
    };
  
    this.getClassNames = this.getClassNames.bind(this);
  }
  
  getClassNames() {
    const { selectedToActive } = this.state;
    
    return classNames('treeview', { active: selectedToActive });
  }

  render() {
    
    return (
      
        <section className="sidebar" style={{ height: 'auto' }}>
          
          <ul className="sidebar-menu text-left-padding">
            <li className="header">
              {this.props.children}
            </li>
  
            <li className={this.getClassNames()}>
              <a role="button">
                item1
              </a>
            </li>
            <li className={this.getClassNames()}>
              <a role="button">
                item2
              </a>
            </li>
            <li className={this.getClassNames()}>
              <a role="button">
                item3
              </a>
            </li>
          </ul>
        </section>


    );
  }
}


export default SideBar;

