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
        <div className="test1" />
        <div className="test2" />
        <div className="test2_1" />
        
        {this.renderHeader()}
        
        <div className="content">
          <div className="sidebar">
            <SideBar />
          </div>
          <div className="panel">
            {this.renderPanel()}
          </div>
          <div className="filter">
            <Filter />
          </div>
        </div>
        <div className="footer">
          <Footer/>
        </div>
        <Modal />
      </div>
    
    );
  }
}


export default Layout;
