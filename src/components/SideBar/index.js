import React, { Component } from 'react';
// import classNames from 'classnames';
import { Item } from 'semantic-ui-react';
import {
  Link,
} from 'react-router-dom';
import './SideBar.css';

function renderSecondLevel(i) {
  return i.subcategories.map(s =>
    (<ul className="treeview-menu">
      <li className="treeview" key="namehere" >
        <Item>
          <Item.Content as="a">
            <i className="fa fa-holder" style={{ display: 'block' }} />
            {s.name}
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right" />
            </span>
          </Item.Content>
        </Item>
      </li>
    </ul>),
  );
}

// function renderThirdLevel(i){
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

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '33',
      collapsed: true,
    };

    this.getClassNames = this.getClassNames.bind(this);
    this.renderFirstLevel = this.renderFirstLevel.bind(this);
    this.renderSecondLevel = this.renderSecondLevel.bind(this);
  }

  // getClassNames() {
  //   const { selectedToActive } = this.state.collapsed;
  //
  //   return classNames('treeview', { active: true });
  // }

  renderFirstLevel() {
    const data = this.props.data.landscape;

    return data.map(i =>

      (<li className={this.getClassNames()}>

        <Link
          key={i.slug_name}
          to={{
            pathname: `/${i.slug_name}`,
            // this is the trick!
            state: { modal: true },
          }}
        >
          <p>{i.name}</p>
        </Link>

        {renderSecondLevel(i)}
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

