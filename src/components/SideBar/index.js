import React, { Component } from 'react';
import classNames from 'classnames';
import { Item, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Iconator from './../Iconator';
import Mapping from './../../views/Layout/utilities/Mapping';

import './SideBar.css';


const Color = (cat) => {
  let values = null;
  let value;
  switch (cat) {
    case 'apis':
      value = '1';
      break;
    case 'data':
      value = '1';
      break;
    case 'app_definition_development':
      value = '1';
      break;
    case 'observability_analysis':
      value = '2';
      break;
    case 'platform':
      value = '3';
      break;
    case 'orchestration_and_management':
      value = '4';
      break;
    case 'runtime':
      value = '5';
      break;
    case 'provisioning':
      value = '6';
      break;
    case 'public_cloud':
      value = '7';
      break;
    default : value = '1';
  }
  
  values = 'cat_' + value;
  return values;
};


class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '33',
      collapsed: true,
    };
    
    this.renderFirstLevel = this.renderFirstLevel.bind(this);
  }
  renderFirstLevel(){
    const data = this.props.data.landscape;
    const currentCat = this.props.category;
    
    return data.map((i, index) =>
      (<li className={classNames(`treeview ${currentCat === Mapping(i.slug_name) ? 'cat_' + currentCat : Mapping(i.slug_name)}`, { active: true })} >
  
        <Popup
          trigger={
            <Link
              key={i.slug_name}
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
                <Item>
                  <Link
                    key={s.slug_name}
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

