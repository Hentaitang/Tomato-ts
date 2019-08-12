import * as React from 'react';
import { Button, Icon, Input, message, Form } from 'antd';
import axios from 'src/axios/axios';
import './Login.scss';
import { Link } from 'react-router-dom';

interface StateType {
  confirmDirty: boolean;
}
class Login extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }
  async login() {
    const { account, password } = this.props.form.getFieldsValue();
    try {
      await axios.post('sign_in/user', {
        account,
        password
      });
      message.success('登录成功');
      setTimeout(() => {
        this.props.history.push('/');
      }, 1000);
    } catch (err) {
      message.error('登录失败，用户名与密码不匹配');
      console.log(err);
    }
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.login();
      }
    });
  }
  handleConfirmBlur = (e: any) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateToNextPassword = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="Register">
        <header>
          <p>
            <Icon type="check-circle" />
            <span> 老干妈计时法</span>
          </p>
          <h1>登录</h1>
        </header>
        <div>
          <Form onSubmit={e => this.handleSubmit(e)}>
            <Form.Item hasFeedback={true}>
              {getFieldDecorator('account', {
                rules: [{ required: true, message: '请输入用户名!' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="请输入用户名"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback={true}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="danger" htmlType="submit" className="registerBtn">
                登 录
              </Button>
              <Link to="/register" className="toLogin">
                创建账户
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedLogin = Form.create({ name: 'login' })(Login);

export default WrappedLogin;
