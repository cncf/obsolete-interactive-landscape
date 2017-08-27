import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Header from './../../components/Header';
import SideBar from './../../components/SideBar';
import Footer from './../../components/Footer';
import Filter from './../../components/Filter';
import Modal from './../../components/Modal';
import ProductPanel from './../../components/ProductPanel';

import './Layout.css';


class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Layout',
    };

    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    const title = this.state.title;
    return (
      <Card>
        <Header />
        <h1>This is {title}</h1>
      </Card>

    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        <SideBar />
        <Filter />
        <Footer />
        <Modal />
        <ProductPanel />

      </div>

    );
  }
}


export default Layout;
