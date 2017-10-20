import React, { Component } from 'react';
import classNames from 'classnames';
import { Item, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Iconator from './../../components/Iconator';

import './SideBar.css';

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '33',
      collapsed: true,
    };
    
    this.renderFirstLevel = this.renderFirstLevel.bind(this);
  }
  
  handleClick() {
    if (this.state.selectedToActive) {
      this.props.handleActiveListItem(null);
    } else {
      this.props.handleActiveListItem(this.props.group.name);
    }
    
    this.props.handleMenuOpen();
  }
  
  renderFirstLevel() {
    const getClassNames = () => (
      classNames('treeview', { active: true })
    );
    
    const data = this.props.data.landscape;
    
    return data.map((i, index) =>

      (<li className={getClassNames()} >
  
        <Popup
          trigger={
            <Link
              key={index}
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
                  <Icon disabled name="angle left" />
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
                <Item>
                  <Link
                    key={subindex}
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
  
  //   renderThirdLevel(i){
  //
  //   return i.items.map(s =>
  //     (<ul className="treeview-menu level2  ">
  //       <li key="keynamehere">
  //         <a role="button">
  //           {s.name}
  //         </a>
  //       </li>
  //     </ul>),
  //   );
  // }

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

