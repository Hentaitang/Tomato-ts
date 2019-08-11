import * as React from 'react';
import { Button, Icon, Input, message, Form } from 'antd';
import axios from 'src/axios/axios';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   RouteComponentProps
// } from 'react-router-dom'

interface StateType {
  account: string;
  password: string;
  passwordConfirmation: string;
}
class Register extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordConfirmation: ''
    };
  }
  onChange(type: string, value: string): void {
    const newState = {};
    newState[type] = value;
    this.setState(newState);
  }
  resgister = async () => {
    const { account, password, passwordConfirmation } = this.state;
    try {
      await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation: passwordConfirmation
      });
    } catch (err) {
      console.log(err);
      message.error('注册失败');
    }
  };

  handleSubmit(e: any) {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    // const { account, password, passwordConfirmation } = this.state;
    console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <header>
          <Icon type="check-circle" />
          <h3>注册</h3>
        </header>
        <div>
          {/* <Input
            placeholder="请输入用户名"
            value={account}
            allowClear={true}
            onChange={e => this.onChange('account', e.target.value)}
          />
          <Input
            placeholder="请输入密码"
            value={password}
            allowClear={true}
            onChange={e => this.onChange('password', e.target.value)}
          />
          <Input
            placeholder="请重新输入密码"
            value={passwordConfirmation}
            allowClear={true}
            onChange={e =>
              this.onChange('passwordConfirmation', e.target.value)
            }
          />
          <Button type="danger" onClick={() => this.resgister()}>
            注册
          </Button> */}

          <Form onSubmit={() => this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Register;
