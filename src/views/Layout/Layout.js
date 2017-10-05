import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import classNames from 'classnames'
import { parse } from 'qs'
import Header from './../../components/header';
import SideBar from './../../components/SideBar';
import Filter from './../../components/Filter';
import ItemsPanel from './../../components/ItemsPanel';
import ResultsPanel from './../../components/ResultsPanel';
import Category from './Category';

import dataSet from './data/file.json';


import './Layout.css';


class Layout extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: 'Layout',
      panel: 'items',
      menu: {
        collapsed: false,
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
    
    if (menu) { // If collapsed = TRUE
      return classNames('content_wrapper', { collapse: true }, { open: true });
    }
    return classNames('content_wrapper', { open_hidden: true });
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
    
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    );
    const category = this.state.landscape.landscape;
    
    return (
  
        <div className="layout">
          <div className="header_wrapper">
            {this.renderHeader()}
    
          </div>
          <div className={this.getClassNames()}>
            <div className="sidebar_wrapper" style={{ position: 'fixed' }}>
             
              <SideBar data={data}>
                {this.renderButton()}
              </SideBar>
            </div>
            <div className="panel_wrapper">
              
              {/*<Switch location={isModal ? this.previousLocation : location}>*/}
              <Switch>
                <Route exact path='/' component={ItemsPanel}/>
                <Route path='/filter' component={ResultsPanel}/>
                <Route path='/home' component={Home}/>
                <Route path='/gallery' component={Gallery}/>
  
                <Route path='/public_cloud/:id' render={props =>
                  <SubCategoryView cat={0} {...props} />
                } />
                <Route path='/public_cloud' render={props =>
                  <CategoryView cat={0} {...props} />
                } />
                
                
                <Route path='/orchestration/:id' render={props =>
                  <SubCategoryView cat={3} {...props} />
                } />
                <Route path='/orchestration' render={props =>
                  <CategoryView cat={3} {...props} />
                } />
                
              </Switch>
              
            </div>
            <div className="filter_wrapper">
              <Filter />
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

const Image = ({ color }) =>
  <div style={{
    width: '100%',
    height: 400,
    background: color
  }}/>;

const Home = () => (
  <div>
    <Link to='/gallery'>Visit the Gallery</Link>
    <h2>Featured Imagesxx</h2>
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
          // this is the trick!
          state: { modal: true }
        }}
      >
        <Thumbnail color={i.color} />
        <p>{i.name}</p>
      </Link>
    ))}
  </div>
);


const CategoryView = ({ cat }) => {
  const category = CATEGORIES[cat];
  const subCategories = category.subcategories;
  
  if (!category) {
    return <div>No Category called like that</div>
  }
  
  return (

  <div id="module7" class="module element-anchor7">
    <div class="ico-infr ico-background">
    </div>
    <div class="stillbox">
      <div class="box-2 category-box-7">
        <h2 class="category-title-7 categ-big">
          <div class="ico-infr ico-medium"></div>
          {category.name}
        </h2>
        <p class="categ-brief">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam.
        </p>
        <div class="companies-6 companies">
          <div class="box-items6-0 box-itemsDISABLED">
            {subCategories.map(i => (
              <Link
                key={i.id}
                to={{
                  pathname: `/${category.name}/${i.id}`,
                  // this is the trick!
                  state: { modal: true }
                }}
              >
                <h5 class="subcateg categ-color6">
                  <i class="caret right icon"></i>{i.name}
                </h5>
              </Link>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  </div>
  )
};

const SubCategoryView = ({ cat, match }) => {
  const category = CATEGORIES[cat];
  const subCategory = category.subcategories[match.params.id];
  
  if (!subCategory) {
    return <div>No Sub Category called like that</div>
  }
  
  return (
    <div>
      parent: {category.name}
      <div>
        <p>{subCategory.name}</p>
      </div>
    </div>
  )
};


const Modal = ({ match, history }) => {
  //const image = CATEGORIES[match.params.title];
  //const image = IMAGES[parseInt(match.params.id, 10)];
  const image = CATEGORIES[match.params.id];
  if (!image) {
    // return null
  }
  const back = (e) => {
    e.stopPropagation();
    history.goBack()
  };
  return (
    <div
      onClick={back}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.15)'
      }}
    >
      <div className='modal' style={{
        position: 'absolute',
        background: '#fff',
        top: 25,
        left: '10%',
        right: '10%',
        padding: 15,
        border: '2px solid #444'
      }}>
        <h1>{image.name}</h1>
        <button type='button' onClick={back}>
          Close
        </button>
      </div>
    </div>
  )
};

const ModalGallery = () => (
  <Router>
    <Route component={Layout} />
  </Router>
);


export default ModalGallery;
