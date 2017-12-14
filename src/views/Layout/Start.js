import React, { Component } from 'react';
import classNames from 'classnames';
import { Item, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Iconator from '../../components/Iconator';
import Mapping from './../../views/Layout/utilities/Mapping';

import './Layout.css';
import './Category.css';

class Start extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: 'Start',
    };
  }
  
  renderFirstLevel() {
    const data = this.props.data.landscape;
    const currentCat = this.props.category;
    
    
    return data.map((i, index) =>
      (<div
        className="hello"
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
      </div>),
    
    );
  }
  
  render() {
    return (
      <div className="start">
        {this.renderFirstLevel()}
        
      </div>
      
    );
  }
}

export default Start;
