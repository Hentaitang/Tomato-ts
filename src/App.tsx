// import { Button } from 'antd'
import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './axios/history';
import Index from './components/Index/Index';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact={true} path="/" component={Index} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
