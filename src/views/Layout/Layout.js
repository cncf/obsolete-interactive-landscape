import React, { Component } from 'react';
import { Icon, Menu, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import ArrowKeysReact from 'arrow-keys-react';
import {Redirect } from 'react-router-dom';
import Header from './../../components/header';
import SideBar from './../../components/SideBar';
import Filter from './../../components/Filter';
import CategoryView from './Category';
import SubCategoryView from './SubCategory';
import StartView from './Start';
import Mapping from './utilities/Mapping';
import dataSet from '../../data/tested.json';

import './Layout.css';
import './Category.css';

class Layout extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: 'Layout',
      panel: 'items',
      menu: {
        collapsed:true,
      },
      menu_visible:false,
      showFilters:false,
      filter_cncf:true,
      filter_oss:true,
      filter_com:true,
      sub_cat:[
        5, 3, 3, 5, 1, 2, 3
      ]
    };
  
    ArrowKeysReact.config({
      left: () => {
        
        this.setState({
          detected: 'left'
        });
        
      },
      right: () => {
        
        this.setState({
          detected: 'right'
        });
        
      },
      up: () => {
        this.setState({
          detected: 'up'
        });
      },
      down: () => {
        this.setState({
          detected: 'down'
        });
      }
    });
    
    this.renderHeader = this.renderHeader.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.updateState = this.updateState.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.triggerRoutes = this.triggerRoutes.bind(this);
    this.getRoutes = this.getRoutes.bind(this);
    
  }
  
  
  
  componentWillMount(){
    
    this.updateState();
  
    if (this.props.match.url === '/' || this.props.match.url === '' ){
      this.handleSidebar(false);
    }else{
      this.handleSidebar(true);
    }
  
    
    
  }
  componentWillReceiveProps(nextProps){
    
    
    if (nextProps.match.url === '/' || nextProps.match.url === '' ){
      this.handleSidebar(false);
    }else{
      this.handleSidebar(true);
    }
    
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
  
  componentDidUpdate(){
  
    
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
        return ClassNames('layout infog01 outfocus', { collapse: true }, { open: true });
      }
      return ClassNames('layout infog01 outfocus', { open_hidden: true });
    }
    if (menu) { // If collapsed = TRUE
      return ClassNames('layout infog01', { collapse: true }, { open: true });
    }
    return ClassNames('layout infog01', { open_hidden: true });
    
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
      <Menu.Item as="span" className='item-menu' onClick={() => this.setState({ menu: { collapsed: !collapsed } })}>
        <a role="button" className="" >
          <span><Icon className={ClassNames('angle', {right : collapsed}, {left : !collapsed})} /></span>
        </a>
      </Menu.Item>
    );
  }

  getParentCategory(){
    let parentCategory = this.props.match.url;
    let pathArray = parentCategory.split( '/' );
    parentCategory = Mapping(pathArray[1]);
    
    return parentCategory;
  }
  renderCategory (){
    const subcategory = this.props.match.params.id;
    
    if (this.props.match.url !== '/'){
      
      if(subcategory){
        return (<div className="panel_wrapper">
                  <SubCategoryView
                  cat={this.getParentCategory()}
                  data={dataSet}
                  match={this.props.match}
                  state={this.state} />
                </div>
        );
      }
      return (<div className="panel_wrapper">
                <CategoryView
                  cat={this.getParentCategory()}
                  data={dataSet} />
              </div>
        );
    }
  }
  
  renderGraph (){
    const cat = this.getParentCategory();
    const data= this.state.landscape;
  
    if (this.props.match.url === '/'){
      //if root path then send to home
      return(
          <div className={ClassNames('graph_home')}>
            <StartView data={data} />
          </div>
       
      );
    }else{
      return (
        
          <div className={ClassNames('graph_wrapper cat_'+ cat )} />
        
      );
    }
  }
  
  handleSidebar(status) {
    this.setState({
      menu_visible:status
    });
  }
  
  triggerRoutes(urlback, urlforward){
    
    let detected = this.state.detected;
    
    
    if(detected === 'right'){
      console.log('FRONT >>');
      
      return <Redirect to={urlback} push />
      
    }else if(detected === 'left'){
      console.log('<< BACK');
      
      return <Redirect to={urlforward} push />
    }else{
      console.log('....');
      
    }
  }
  
  renderFooter(){
    
    let parentCategory = this.props.match.url;
    let pathArray = parentCategory.split( '/' );
    let category = Mapping(pathArray[1]);
        category = parseInt(category, 10);
    let categoryName = pathArray[1];
    let subcategory = parseInt(pathArray[2], 10);
    let urlback = 0;
    let urlforward = 0;
    
    console.log(parentCategory);
    
      if(subcategory || subcategory === 0){
        //This is a Subcategory
        if(subcategory <= 0){
          urlback =  "/"+categoryName;
        }else{
          urlback =  "/"+categoryName+"/"+(subcategory -1);
        }
        
        let available=this.state.sub_cat[category]-1;
        
        if(available === subcategory) {
          let nextCategory = Mapping(category + 1);
          
          if(nextCategory <= 0){
            urlforward = "/";
          }else{
            urlforward = "/" + nextCategory;
            
          }
          
        }else{
          let nextSubcategory = subcategory +1;
          urlforward = "/"+categoryName+"/"+nextSubcategory;
        }
        
      }else{
        //This is a category
        if(category <= 0){
          urlback =  "/";
        }else{
          let prevAvailable = this.state.sub_cat[category-1]-1;
          urlback =  "/"+Mapping(category-1)+"/"+prevAvailable;
          
        }
        urlforward = "/"+categoryName+"/0";
        
      }
    
      if(parentCategory !== '/'){
  
        return(
          <div className="footer_wrapper">
      
            <Link
              to={{
                pathname:`${urlback}`,
                state: { modal: true },
              }}
            >
              <Icon name='arrow left' />
            </Link>
      
            <Link
              to={{
                pathname:`${urlforward}`,
                state: { modal: true },
              }}
            >
              <Icon name='arrow right' />
            </Link>
          </div>
  
        );
        
      }
    
  }
  
  getRoutes(){
    
    let parentCategory = this.props.match.url;
    let pathArray = parentCategory.split( '/' );
    let category = Mapping(pathArray[1]);
    category = parseInt(category, 10);
    let categoryName = pathArray[1];
    let subcategory = parseInt(pathArray[2], 10);
    let urlback = 0;
    let urlforward = 0;
    let gofor = true;
    
    if(subcategory || subcategory === 0){
      //This is a Subcategory
      if(subcategory <= 0){
        urlback =  "/"+categoryName;
      }else{
        urlback =  "/"+categoryName+"/"+(subcategory -1);
      }
      
      let available=this.state.sub_cat[category]-1;
      
      if(available === subcategory) {
        let nextCategory = Mapping(category + 1);
        
        if(nextCategory <= 0){
          urlforward = "/";
        }else{
          urlforward = "/" + nextCategory;
          
        }
        
      }else{
        let nextSubcategory = subcategory +1;
        urlforward = "/"+categoryName+"/"+nextSubcategory;
      }
      
    }else{
      //This is a category
      if(category <= 0){
        urlback =  "/";
      }else{
        let prevAvailable = this.state.sub_cat[category-1]-1;
        urlback =  "/"+Mapping(category-1)+"/"+prevAvailable;
        
      }
      urlforward = "/"+categoryName+"/0";
      
    }
    
      let detected = this.state.detected;
      if(detected === 'right' || detected === 'left'){
  
        if(gofor === true) {
          
          return this.triggerRoutes(urlback, urlforward);
        }
        
      }
    
  }
  
  render() {
    const data= this.state.landscape;
    const menuvisible = this.state.menu_visible;
    const cncf = this.state.filter_cncf;
    const oss = this.state.filter_oss;
    const com = this.state.filter_com;
    const filters = this.state.showFilters;
   
    return (
        <div className={this.getClassNames()} {...ArrowKeysReact.events} tabIndex="1">
          
          
          <div className={ClassNames('sidebar_wrapper', { hidden: !menuvisible })}>
            <SideBar data={data} category={this.getParentCategory()} >
              {this.renderButton()}
            </SideBar>
          </div>
          <div className="layout_wrapper">
            <div className="header_wrapper">
              {this.renderHeader()}
  
              <div className={ClassNames('filter_toggle', { hidden: filters })} onClick={() => this.setState({ showFilters : !filters })} >
                Filters
                <Icon name='angle up' />
              </div>
              
            </div>
            <div className="content_wrapper">
              
              {this.renderGraph()}
              
              {this.renderCategory()}
              
              <div className={ClassNames('filter_wrapper', { hidden: !filters })}>
                <Icon disabled name='angle right' style={{float:'right'}} onClick={() => this.setState({ showFilters : !filters })} />
                <br/><br/>
                <Filter>
                  <div><Checkbox name="cncf" toggle defaultChecked label='CNCF' onClick={() => this.setState({filter_cncf : !cncf })} /></div>
                  <div><Checkbox name="oss" toggle defaultChecked label='OSS' onClick={() => this.setState({filter_oss : !oss })} /></div>
                  <div><Checkbox name="com" toggle defaultChecked label='Commercial' onClick={() => this.setState({filter_com : !com })} /></div>
                </Filter>
              </div>
            </div>
            
            {this.renderFooter()}
            {this.getRoutes()}
            
          </div>
          
          {/*{isModal ? <Route path='/:id' component={Modal} /> : null}*/}
        </div>
      
    )
  }

}


export default Layout;
