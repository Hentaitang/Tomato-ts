import { Spin } from 'antd';
import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './axios/history';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { connect } from 'react-redux';
import './App.scss';

class App extends React.Component<any> {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Spin spinning={this.props.loading} className="loadingWrapper">
            <Route exact={true} path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Spin>
        </div>
      </Router>
    );
  }
}

const mapStateTopProps = (state: any) => {
  return {
    loading: state.Loading
  };
};

export default connect(
  mapStateTopProps,
  null
)(App);
