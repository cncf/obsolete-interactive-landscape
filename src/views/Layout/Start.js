import React, { Component } from 'react';
import classNames from 'classnames';
import { Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ReactHoverObserver from 'react-hover-observer';
import Iconator from '../../components/Iconator';
import Mapping from './../../views/Layout/utilities/Mapping';

import './Start.css';

class Start extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      title: 'Start',
      element1: { isHovering: false },
      element2: { isHovering: true },
    };
    
    this.onHoverChanged = this.onHoverChanged.bind(this);
    this.onHoverChanged2 = this.onHoverChanged2.bind(this);
    this.renderExample = this.renderExample.bind(this);
  }
  
  onHoverChanged({ isHovering }) {
    this.setState({
      element1: { isHovering },
    });
  }
  onHoverChanged2({ isHovering }) {
    this.setState({
      element2: { isHovering },
    });
  }
  
  renderExample() {
    return (
      <div className="example">
        <ReactHoverObserver {...{
          className: 'example__observer',
          onHoverChanged: this.onHoverChanged,
        }}
        />
        <ReactHoverObserver {...{
          className: 'example__observer',
          onHoverChanged: this.onHoverChanged2,
        }}
        />
        <div>
          1.{ this.state.element1.isHovering ? 'true' : 'false' }
        </div>
        <div>
          2.{ this.state.element2.isHovering ? 'true' : 'false' }
        </div>
    
      </div>
    );
  }
  
  renderFirstLevel() {
    const data = this.props.data.landscape;
    
    return data.map((i, index) =>
      (<div
        className={
          classNames(`cat_${Mapping(i.slug_name)}`
            , { active: index === this.state.activeIndex })
        }
        key={i.slug_name}
        onClick={() => this.setState({ activeIndex: index })}
      >
        <ReactHoverObserver {...{
          className: 'example__observer',
          onHoverChanged: this.onHoverChanged2,
        }}
        >
          <Link
            to={{
              pathname: `/${i.slug_name}`,
              // this is the trick!
              state: { modal: true },
            }}
          >
            <div className="category">
              <Iconator icon={i.slug_name} size="s" />
              <span>{i.name}</span>
            </div>
    
            {i.subcategories.length ?
              <span className="pull-right-container">
                {/* <Icon disabled name="angle left" /> */}
              </span>
              : ''}
          </Link>
        </ReactHoverObserver>
      </div>),
    
    );
  }
  
  render() {
    return (
      <div className="start">
        {this.renderExample()}
        {this.renderFirstLevel()}

      </div>
      
    );
  }
}

export default Start;
