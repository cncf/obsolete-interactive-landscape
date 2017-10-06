import React, { Component } from 'react';
import classNames from 'classnames';
import { Item, Icon } from 'semantic-ui-react';
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
  
  renderFirstLevel() {
    const getClassNames = () => (
      classNames('treeview', { active: true })
    );
    
    const data = this.props.data.landscape;
    
    return data.map(i =>

      (<li className={getClassNames()}>

        <Link
          key={i.id}
          to={{
            pathname: `/${i.slug_name}`,
            // this is the trick!
            state: { modal: true },
          }}
        >
          <Iconator icon={i.slug_name} size="s" />
          <p>{i.name}</p>
          {i.subcategories.length ?
            <span className="pull-right-container">
              <Icon disabled name="angle left"/>
            </span>
            : ''}
        </Link>

        {/* Second level */}
        {i.subcategories.map(s =>
          (<ul className="treeview-menu">
            <li className="treeview" key="namehere" >
              <Item>
                <Link
                  key={s.id}
                  to={{
                    pathname: `/${i.slug_name}/${s.id}`,
                    // this is the trick!
                    state: { modal: true },
                  }}
                >
                  <i className="fa fa-holder" style={{ display: 'block' }} />
                  {s.name}
                  <span className="pull-right-container">
                    <i className="fa fa-angle-left pull-right" />
                  </span>
                </Link>
                
              </Item>
            </li>
          </ul>))
        }
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

