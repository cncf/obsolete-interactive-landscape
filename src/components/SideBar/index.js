import React, { Component } from 'react';
import classNames from 'classnames';
import { Item, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Iconator from './../Iconator';
import Mapping from './../../views/Layout/utilities/Mapping';

import './SideBar.css';

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      activeIndex:'',
    };
    
    this.renderFirstLevel = this.renderFirstLevel.bind(this);
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }
  handleTabSelect(activeIndex) {
    this.setState({ activeIndex });
  }
  
  renderFirstLevel() {
    const data = this.props.data.landscape;
    const currentCat = this.props.category;
    
    console.log(data);
    
    return data.map((i, index) =>
      (<li
        className={
          classNames(`treeview ${currentCat === Mapping(i.slug_name) ? 'cat_' + currentCat : Mapping(i.slug_name)}`
            , { active: index === this.state.activeIndex })
        }
        key={i.slug_name}
        onClick={() => this.setState({ activeIndex: index })}
      >
  
        <Popup
          trigger={
            <Link
              to={{
                pathname: `/${i.slug_name}`,
                // this is the trick!
                state: { modal: true },
              }}
            >
              <div>
                <Iconator icon={i.slug_name} size="s" />
                <span>{i.name}</span>
              </div>
    
              {i.subcategories.length ?
                <span className="pull-right-container">
                  {/* <Icon disabled name="angle left" /> */}
                </span>
                : ''}
            </Link>
          }
          content={i.name}
          size="mini"
          position="right center"
        />
        
        
        {/* Second level */}
        <ul className="treeview-menu">
          <li className="treeview" key="namehere" >
          
            {i.subcategories.map((s, subindex) =>
              (
                <Item
                  key={s.slug_name}
                >
                  <Link
                    to={{
                      pathname: `/${i.slug_name}/${subindex}`,
                      // this is the trick!
                      state: { modal: true },
                    }}
                  >
                    {s.name}
                  </Link>
                </Item>
              ))
            }
        
          </li>
        </ul>
      </li>),

    );
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

