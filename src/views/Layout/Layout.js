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
import Iconator from './../../components/Iconator';
import Filter from './../../components/Filter';
import ItemsPanel from './../../components/ItemsPanel';
import ResultsPanel from './../../components/ResultsPanel';
import ItemModal from './../../components/ItemModal';

//import dataSet from './data/file_UI.json';
import dataSet from './data/landscape_v24_jm.json';


import './Layout.css';
import './Category.css';


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
   
    return (
  
        <div className="layout infog01">
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
  
                <Route path='/orchestration_and_management/:id' render={props =>
                  <SubCategoryView cat={0} {...props} />
                } />
                <Route path='/orchestration_and_management' render={props =>
                  <CategoryView cat={0} {...props} />
                } />
                
                <Route path='/public_cloud/:id' render={props =>
                  <SubCategoryView cat={1} {...props} />
                } />
                <Route path='/public_cloud' render={props =>
                  <CategoryView cat={1} {...props} />
                } />
  
                <Route path='/provisioning/:id' render={props =>
                  <SubCategoryView cat={2} {...props} />
                } />
                <Route path='/provisioning' render={props =>
                  <CategoryView cat={2} {...props} />
                } />
  
                <Route path='/runtime/:id' render={props =>
                  <SubCategoryView cat={3} {...props} />
                } />
                <Route path='/runtime' render={props =>
                  <CategoryView cat={3} {...props} />
                } />
  
                <Route path='/app_definition_development/:id' render={props =>
                  <SubCategoryView cat={4} {...props} />
                } />
                <Route path='/app_definition_development' render={props =>
                  <CategoryView cat={4} {...props} />
                } />
  
                <Route path='/platform/:id' render={props =>
                  <SubCategoryView cat={5} {...props} />
                } />
                <Route path='/platform' render={props =>
                  <CategoryView cat={5} {...props} />
                } />
  
                <Route path='/observability_analysis/:id' render={props =>
                  <SubCategoryView cat={6} {...props} />
                } />
                <Route path='/observability_analysis' render={props =>
                  <CategoryView cat={6} {...props} />
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
    <div className="module">
      <Iconator icon={category.slug_name} size="background"/>
      <div className="stillbox">
        <div className="box-2 category-box-7">
          <h2 className="category-title-7 categ-big">
            <Iconator icon={category.slug_name} size="m"/>
            <br/>
            {category.name}
          </h2>
          <p className="categ-brief">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam.
          </p>
          <div className="companies-6 companies">
            <div className="box-items6-0 box-itemsDISABLED">
              {/*{subCategories.map(i => (*/}
                {/*<Link*/}
                  {/*key={i.id}*/}
                  {/*to={{*/}
                    {/*pathname: `/${category.slug_name}/${i.id}`,*/}
                    {/*// this is the trick!*/}
                    {/*state: { modal: true }*/}
                  {/*}}*/}
                {/*>*/}
                  {/*<h5 className="subcateg categ-color6">*/}
                    {/*<i className="caret right icon"/>{i.name}*/}
                  {/*</h5>*/}
                {/*</Link>*/}
              {/*))}*/}
              {subCategories.map((i,index) => (
                <Link
                  key={i.id}
                  to={{
                    pathname: `/${category.slug_name}/${index}`,
                    // this is the trick!
                    state: { modal: true }
                  }}
                >
                  <h5 className="subcateg categ-color6">
                    <i className="caret right icon"/>{i.name}
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
    <div className="module">
      <Iconator icon={category.slug_name} size="background"/>
      <div className="stillbox">
        <Link to={{ pathname: `/${category.slug_name}`}}>
          <h2 className="category-title-6 categ">
            <div className="ico-prov ico-small"/>
            {category.name}
          </h2>
        </Link>
        
        <div className="box-2">
          <h2 className="categ-color6">
            {subCategory.name}
          </h2>
          <div className="category-detail6-0  box-items categ-color6">
            
            {subCategory.items.map((i,index) =>(
              <ItemModal data={i} index={index} >
                <div className="item c-tooltip">
                  <h4 className="company" style={{ backgroundImage: `url(${i.calculated.resized_logo})`}} data-placement="top" title="Bosch">
                  </h4>
                  <div className="company-name">
                    {i.name}
                  </div>
                </div>
              </ItemModal>
            ))}
          </div>
          <Link
            to={{
              pathname: `/${category.slug_name}`,
              // this is the trick!
              state: { modal: true }
            }}
          >
            <i className="arrow left icon"/> Back to {category.name}
          </Link>
        </div>
      </div>
    </div>

  )
};


// const Modal = ({ match, history }) => {
//
//   const image = CATEGORIES[match.params.id];
//   if (!image) {
//     // return null
//   }
//   const back = (e) => {
//     e.stopPropagation();
//     history.goBack()
//   };
//   return (
//     <div
//       onClick={back}
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//         background: 'rgba(0, 0, 0, 0.15)'
//       }}
//     >
//       <div className='modal' style={{
//         position: 'absolute',
//         background: '#fff',
//         top: 25,
//         left: '10%',
//         right: '10%',
//         padding: 15,
//         border: '2px solid #444'
//       }}>
//         <h1>{image.name}</h1>
//         <button type='button' onClick={back}>
//           Close
//         </button>
//       </div>
//     </div>
//   )
// };

const ModalGallery = () => (
  <Router>
    <Route component={Layout} />
  </Router>
);


export default ModalGallery;
