import * as React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import axios from 'src/axios/axios';
import history from 'src/axios/history';
import './index.scss';
import Todos from 'src/components/todos/todos';

interface StateType {
  user: any;
  todoList: any[];
}

const menu = (
  <Menu onClick={e => login(e)}>
    <Menu.Item key="0">
      <Icon type="user" />
      个人设置
    </Menu.Item>
    <Menu.Item key="1">
      <Icon type="logout" />
      登出
    </Menu.Item>
  </Menu>
);

function login(e: any) {
  if (e.key === '1') {
    localStorage.setItem('x-token', '');
    history.push('/login');
  }
}

class Index extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
      todoList: []
    };
    this.addTodoList = this.addTodoList.bind(this);
  }

  async componentDidMount() {
    try {
      const check = await axios.get('me');
      const toList = await axios.get('todos');
      this.setState({ user: check.data, todoList: toList.data.resources });
    } catch (err) {
      console.log(err);
    }
  }

  addTodoList(value: string) {
    this.state.todoList.unshift(value);
    this.setState({
      ...this.state,
      todoList: this.state.todoList
    });
  }

  render() {
    const { account } = this.state.user;
    return (
      <div className="home">
        <header>
          <span className="title">老干妈计时法</span>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              {account} <Icon type="down" />
            </a>
          </Dropdown>
        </header>
        <main>
          <Todos
            todoList={this.state.todoList}
            addTodoList={this.addTodoList}
          />
        </main>
      </div>
    );
  }
}

export default Index;
