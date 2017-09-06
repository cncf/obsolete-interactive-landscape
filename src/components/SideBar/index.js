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
    this.renderFirstLevel = this.renderFirstLevel.bind(this);
  }
  
  getClassNames() {
    const { selectedToActive } = this.state.collapsed;
    
    return classNames('treeview', { active: true });
  }
  
  renderFirstLevel(){
    
    let data = this.props.data.landscape;
    //console.log(data);
    
    return data.map(i =>
 
      <li className={this.getClassNames()}>
        <a role="button">
          <i className="fa icon-uno"/>
          {i.name}
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
      
      
    )
    
    
    // console.log('-----------');
    // console.log(data.category.subcategory.name);
    // console.log('-----------');
    //
    
    // const items = this.props.data.category.subcategory.items;
    // console.log(items);
    
    // items.map(i =>
    //   console.log(i.item.name)
    // );
    
    
    
  
    
    
  }

  render() {
    
    
    
    return (
      
        <section className="sidebar" style={{ height: 'auto' }}>
          
          <ul className="sidebar-menu text-left-padding">
            <li className="header">
              {this.props.children}
            </li>
            {this.renderFirstLevel()}
            
          </ul>
        </section>


    );
  }
}


export default SideBar;

