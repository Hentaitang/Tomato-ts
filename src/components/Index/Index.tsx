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

interface EditParams {
  description?: string;
  completed?: boolean;
  deleted?: boolean;
  extra?: object;
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
    this.updateTodos = this.updateTodos.bind(this);
    this.changeEditing = this.changeEditing.bind(this);
  }

  async componentDidMount() {
    try {
      const check = await axios.get('me');
      const list = await axios.get('todos');
      const todoList = list.data.resources.map((t: any) => {
        return { ...t, edit: false };
      });
      this.setState({ user: check.data, todoList });
    } catch (err) {
      console.log(err);
    }
  }

  changeEditing(id: number) {
    const todoList = this.state.todoList.map(t => {
      if (t.id === id) {
        return { ...t, edit: true };
      } else {
        return { ...t, edit: false };
      }
    });
    this.setState({ ...this.state, todoList });
  }

  addTodoList(value: string) {
    this.state.todoList.unshift(value);
    this.setState({
      ...this.state,
      todoList: this.state.todoList
    });
  }

  async updateTodos(id: number, params: EditParams) {
    const res = await axios.put(`todos/${id}`, params);
    const newList = this.state.todoList.map(l => {
      if (l.id === id) {
        return { ...res.data.resource, edit: false };
      } else {
        return l;
      }
    });
    this.setState({ ...this.state, todoList: newList });
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
            updateTodos={this.updateTodos}
            changeEditing={this.changeEditing}
          />
        </main>
      </div>
    );
  }
}

export default Index;
