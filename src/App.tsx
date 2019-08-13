// import { Button } from 'antd'
import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './axios/history';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

class App extends React.Component<any> {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact={true} path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
