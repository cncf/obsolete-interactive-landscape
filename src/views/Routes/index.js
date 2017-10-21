import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ResultsPanel from './../../components/ResultsPanel';
import Layout from './../Layout/Layout';

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={Layout}
    />
    <Route path="/filter" component={ResultsPanel} />
    <Route
      path="/orchestration_and_management/:id"
      component={Layout}
    />
    <Route
      path="/orchestration_and_management"
      component={Layout}
    />
    <Route
      path="/public_cloud/:id"
      component={Layout}
    />
    <Route
      path="/public_cloud"
      component={Layout}
    />
    <Route
      path="/provisioning/:id"
      component={Layout}
    />
    <Route
      path="/provisioning"
      component={Layout}
    />
    <Route
      path="/runtime/:id"
      component={Layout}
    />
    <Route
      path="/runtime"
      component={Layout}
    />
    <Route
      path="/app_definition_development/:id"
      component={Layout}
    />
    <Route
      path="/app_definition_development"
      component={Layout}
    />
    <Route
      path="/platform/:id"
      component={Layout}
    />
    <Route
      path="/platform"
      component={Layout}
    />
    <Route
      path="/observability_analysis/:id"
      component={Layout}
    />
    <Route
      path="/observability_analysis"
      component={Layout}
    />
  </Switch>
);

const R = () => (
  <Router>
    <Route component={Routes} />
  </Router>
);

export default R;
