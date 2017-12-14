import React, { Component } from 'react';
import { Icon, Menu, Checkbox } from 'semantic-ui-react'
import ClassNames from 'classnames';
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
    };
    
    this.renderHeader = this.renderHeader.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.updateState = this.updateState.bind(this);
    this.renderCategory = this.renderCategory.bind(this);
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
    const data= this.state.landscape;
    
    const subcategory = this.props.match.params.id;
    
    if (this.props.match.url === '/'){
      return <StartView data={data} />;
    }else{
      if(subcategory){
        return <SubCategoryView cat={this.getParentCategory()} data={dataSet} match={this.props.match} state={this.state} /> ;
      }
      return <CategoryView cat={this.getParentCategory()} data={dataSet} /> ;
    }
  }
  
  renderGraph (){
    const cat = this.getParentCategory();
  
    if (this.props.match.url === '/'){
      return <div className={ClassNames('graph_home')} />;
    }else{
      return <div className={ClassNames('graph_wrapper cat_'+ cat )} />
    }
  }
  
  handleSidebar(status) {
    this.setState({
      menu_visible:status
    });
  }
  
  render() {
    const data= this.state.landscape;
    const menuvisible = this.state.menu_visible;
    const cncf = this.state.filter_cncf;
    const oss = this.state.filter_oss;
    const com = this.state.filter_com;
    const filters = this.state.showFilters;
    
    console.log(':::::::::::');
    console.log(this.props.match.url);
   
    return (
        <div className={this.getClassNames()}>
          
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
              
              <div className="panel_wrapper">
                {this.renderCategory()}
              </div>
              
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
          </div>
          
          {/*{isModal ? <Route path='/:id' component={Modal} /> : null}*/}
        </div>
      
    )
  }

}

export default Layout;
