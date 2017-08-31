import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

import Header from './../../components/header';
import SideBar from './../../components/SideBar';
import Footer from './../../components/Footer';
import Filter from './../../components/Filter';
import Modal from './../../components/Modal';
import ItemsPanel from './../../components/ItemsPanel';
import ResultsPanel from './../../components/ResultsPanel';

import './Layout.css';


class Layout extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: 'Layout',
      panel: 'items',
    };
    
    this.renderHeader = this.renderHeader.bind(this);
  }
  
  renderHeader() {
    const title = this.state.title;
    return (
      <Header title={title} />
    );
  }
  
  renderPanel(){
    
    if(this.state.panel === 'items'){
      return <ItemsPanel/> ;
    }
    return <ResultsPanel className="results__panel"/>
    
  }
  
  render() {
    return (
      <div className="layout">
        <div className="header_wrapper">
          {this.renderHeader()}
        </div>
        <div className="content_wrapper">
          <div className="sidebar_wrapper">
            <SideBar />
          </div>
          <div className="panel_wrapper">
            {this.renderPanel()}
          </div>
          <div className="filter_wrapper">
            <Filter />
          </div>
        </div>
      </div>
    
    );
  }
}


export default Layout;
