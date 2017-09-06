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
    this.renderSecondLevel = this.renderSecondLevel.bind(this);
    this.renderThirdLevel = this.renderThirdLevel.bind(this);
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
        {this.renderSecondLevel(i)}
      </li>
      
    )
  }
  
  renderSecondLevel(i){
    
    const state = this.state;
    
    return i.subcategories.map(i =>
        <ul className="treeview-menu">
          <li className="treeview" key='namehere' >
            <Item>
              <Item.Content as="a">
                <i className="fa fa-holder" style={{ display: 'block' }} />
                {i.name}
                <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                 </span>
              </Item.Content>
            </Item>
            
          </li>
        </ul>
      )
    
  }
  
  renderThirdLevel(i){
    
    const state = this.state;
    
    return i.items.map(i =>
      <ul className="treeview-menu level2  ">
        <li key='keynamehere'>
          <a role="button">
            {i.name}
          </a>
        </li>
      </ul>
    )
    
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

