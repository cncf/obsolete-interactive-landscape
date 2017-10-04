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
import ItemsPanel from './../../components/ItemsPanel';
import ResultsPanel from './../../components/ResultsPanel';

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
  
  // renderHome() {
  //
  //   const data= this.state.landscape;
  //   return(
  //
  //     <div>
  //     {IMAGES.map(i => (
  //       <Link
  //         key={i.id}
  //         to={{
  //           pathname: `/img/${i.id}`,
  //           // this is the trick!
  //           state: {modal: true}
  //         }}
  //       >
  //         <Thumbnail color={i.color}/>
  //         <p>{i.title}</p>
  //       </Link>
  //     ))}
  //     </div>
  //
  //   );
  // }
  
  renderPanel(){
    
    if(this.state.panel === 'items'){
      return <ItemsPanel/> ;
    }
    return <ResultsPanel className="results__panel"/>
    
  }
  
  // renderdos() {
  //
  //   const data= this.state.landscape;
  //
  //   return (
  //     <div className="layout">
  //       <div className="header_wrapper">
  //         {this.renderHeader()}
  //
  //       </div>
  //       <div className={this.getClassNames()}>
  //         <div className="sidebar_wrapper" style={{ position: 'fixed' }}>
  //
  //           <SideBar data={data}>
  //             {this.renderButton()}
  //           </SideBar>
  //         </div>
  //         <div className="panel_wrapper">
  //           {this.renderPanel()}
  //         </div>
  //         <div className="filter_wrapper">
  //           <Filter />
  //         </div>
  //       </div>
  //     </div>
  //
  //   );
  // }
  
  render() {
  
    const data= this.state.landscape;
    
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    );
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
              
              <Switch location={isModal ? this.previousLocation : location}>
                <Route exact path='/' component={ItemsPanel}/>
                <Route path='/filter' component={ResultsPanel}/>
                <Route path='/home' component={Home}/>
                <Route path='/gallery' component={Gallery}/>
                <Route path='/:id' component={ImageView}/>
              </Switch>
              
              
              
            </div>
            <div className="filter_wrapper">
              <Filter />
            </div>
          </div>
          {isModal ? <Route path='/:id' component={Modal} /> : null}
        </div>
 
    )
  }

}


const IMAGES = [
  { id: 0, title: 'Orchestration & management', color: 'purple',slug_name:'orchestration_and_management' },
  { id: 1, title: 'Databases', color: 'green',slug_name:'databases' },
  { id: 2, title: 'Observability & Monitoring', color:'orange', slug_name: 'observability_and_monitoring' },
  { id: 3, title: 'Seven Ate Nine', color: '#789', slug_name:'other1' },
  { id: 4, title: 'Crimson', color: 'Crimson',slug_name:'other2'  }
];

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
    <h2>Featured Images</h2>
    <ul>
      <li><Link to='/orchestration_and_management'>Tomato</Link></li>
      <li><Link to='/'>Crimson</Link></li>
    </ul>
  </div>
);

const Gallery = () => (
  <div>
    {IMAGES.map(i => (
      <Link
        key={i.id}
        to={{
          pathname: `/${i.id}`,
          // this is the trick!
          state: { modal: true }
        }}
      >
        <Thumbnail color={i.color} />
        <p>{i.title}</p>
      </Link>
    ))}
  </div>
);

const ImageView = ({ match }) => {
  const image = IMAGES[parseInt(match.params.id, 10)];
  if (!image) {
    return <div>Image not found</div>
  }
  
  return (
    <div>
      <h1>{image.title}</h1>
      <Image color={image.color} />
    </div>
  )
};

const Modal = ({ match, history }) => {
  const image = IMAGES[parseInt(match.params.id, 10)];
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
        <h1>{image.title}</h1>
        <Image color={image.color} />
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
