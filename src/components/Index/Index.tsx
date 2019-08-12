import * as React from 'react';
import { Button } from 'antd';
import axios from 'src/axios/axios';

class Index extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }
  async componentWillMount() {
    await axios.get('me');
  }
  login() {
    localStorage.setItem('x-token', '');
    this.props.history.push('/login');
  }
  register() {
    this.props.history.push('/register');
  }
  render() {
    return (
      <div>
        index
        <Button onClick={() => this.login()}>登出</Button>
      </div>
    );
  }
}

export default Index;
