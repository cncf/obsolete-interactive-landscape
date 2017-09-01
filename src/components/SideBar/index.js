import React, { Component } from 'react';
import classNames from 'classnames';
import {Item} from 'semantic-ui-react';
import './SideBar.css';


class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '33',
      collapsed:true,
    };
  
    this.getClassNames = this.getClassNames.bind(this);
  }
  
  getClassNames() {
    const { selectedToActive } = this.state.collapsed;
    
    return classNames('treeview', { active: true });
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
                <i class="fa icon-uno"/>
                Databases and Storage
              </a>
  
              <ul className="treeview-menu">
                <li className="treeview" key='namehere' >
                  <Item>
                    <Item.Content as="a">
                      <i className="fa fa-holder" style={{ display: 'block' }} />
                      Item Name 22
                      <span className="pull-right-container">
                        <i className="fa fa-angle-left pull-right" />
                      </span>
                    </Item.Content>
                  </Item>
      
                  <ul className="treeview-menu level2  ">
                    
                      <li key='keynamehere'>
                        <a
                          role="button"
                        >
                          children here
                        </a>
                      </li>
                    
                  </ul>
                </li>
              </ul>
            </li>
            
          </ul>
        </section>


    );
  }
}


export default SideBar;

