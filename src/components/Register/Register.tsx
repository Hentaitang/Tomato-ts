import * as React from 'react';
import { Button, Icon, Input, message, Form } from 'antd';
import axios from 'src/axios/axios';
import './Register.scss';
import { Link } from 'react-router-dom';

interface StateType {
  confirmDirty: boolean;
}
class Register extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }
  async resgister() {
    const {
      account,
      password,
      passwordConfirmation
    } = this.props.form.getFieldsValue();
    try {
      await axios.post('sign_up/user', {
        account,
        password,
        password_confirmation: passwordConfirmation
      });
      message.success('注册成功');
      setTimeout(() => {
        this.props.history.push('/');
      }, 1000);
    } catch (err) {
      message.error('注册失败，已存在相同用户');
      console.log(err);
    }
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.resgister();
      }
    });
  }
  handleConfirmBlur = (e: any) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('你输入的两个密码不相符!');
    } else {
      callback();
    }
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
          <h1>注册</h1>
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
                rules: [
                  { required: true, message: '请输入密码!' },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="请输入密码"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback={true}>
              {getFieldDecorator('passwordConfirmation', {
                rules: [
                  { required: true, message: '请重新输入密码!' },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="请重新输入密码"
                  onBlur={e => this.handleConfirmBlur(e)}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="danger" htmlType="submit" className="registerBtn">
                注 册
              </Button>
              已有账号？
              <Link to="/login" className="toLogin">
                登录
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedRegister = Form.create({ name: 'register' })(Register);

export default WrappedRegister;
