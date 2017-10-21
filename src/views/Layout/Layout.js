import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import classNames from 'classnames'
import Header from './../../components/header';
import SideBar from './../../components/SideBar';
import Filter from './../../components/Filter';
import dataSet from '../data/landscape_v24_jm.json';

import './Layout.css';
import './Category.css';


class Layout extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: 'Layout',
      panel: 'items',
      menu: {
        collapsed: true,
      },
    };
    
    this.renderHeader = this.renderHeader.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.updateState = this.updateState.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
  }
  
  componentWillMount(){
  
    this.updateState();
    
  }
  
  previousLocation = this.props.location;
  
  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }
  
  updateState(){
    const data = dataSet;
    this.setState({landscape: data});
    
  }
  
  getClassNames() {
    const menu = this.state.menu.collapsed;
    const focus = this.state.focus;
  
    if (focus) { // If focus = TRUE
      if (menu) { // If collapsed = TRUE
        return classNames('layout infog01 outfocus', { collapse: true }, { open: true });
      }
      return classNames('layout infog01 outfocus', { open_hidden: true });
    }
    if (menu) { // If collapsed = TRUE
      return classNames('layout infog01', { collapse: true }, { open: true });
    }
    return classNames('layout infog01', { open_hidden: true });
    
    
  }
  
  
  renderHeader() {
    const title = this.state.title;
    return (
      <Header title={title} />
    );
  }
  
  renderButton() {
    const collapsed = this.state.menu.collapsed;
    return (
      <Menu.Item as="span" onClick={() => this.setState({ menu: { collapsed: !collapsed } })}>
        <a role="button" className="" >
          <span><Icon name="content" /></span>
        </a>
      </Menu.Item>
    );
  }

  renderCategory (number){
    const category = this.state.landscape.landscape[3];
    console.log(category);
  
    return (
      <div>
        {category.name} + 3
      </div>
    )
  }
  
  render() {
  
    const data= this.state.landscape;
   
    return (
  
        <div className={this.getClassNames()}>
          <div className="sidebar_wrapper" style={{ position: 'fixed' }}>
            <SideBar data={data} >
              {this.renderButton()}
            </SideBar>
          </div>
          <div className="layout_wrapper">
            <div className="header_wrapper">
              {this.renderHeader()}
  
            </div>
            <div className="content_wrapper">
              <div className="panel_wrapper">
                {this.props.location.pathname}
                { console.log(this.props)}
    
              </div>
              <div className="filter_wrapper">
                <Filter />
              </div>
            </div>
          </div>
          
          {/*{isModal ? <Route path='/:id' component={Modal} /> : null}*/}
        </div>
 
    )
  }

}


const CATEGORIES = dataSet.landscape;

const Thumbnail = ({ color }) =>
  <div style={{
    width: 50,
    height: 50,
    background: color
  }}/>;

const Home = () => (
  <div>
    <Link to='/gallery'>Visit the Gallery</Link>
    <h2>Featured Images</h2>
    <ul>
      <li><Link to='/orchestration_and_management'>Tomato</Link></li>
      <li><Link to='/'>Crimson</Link></li>
    </ul>
  </div>
);

const Gallery = () => (
  <div>
    {CATEGORIES.map(i => (
      <Link
        key={i.id}
        to={{
          pathname: `/${i.id}`,
          state: { modal: true }
        }}
      >
        <Thumbnail color={i.color} />
        <p>{i.name}</p>
      </Link>
    ))}
  </div>
);




const ModalGallery = () => (
  <Router>
    <Route component={Layout} />
  </Router>
);


export default ModalGallery;
