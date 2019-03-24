import React, { Component } from 'react';
import { Layout } from './components/Layout';
import CandidateList from './containers/CandidateList';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <CandidateList/>
      </Layout>
    );
  }
}
