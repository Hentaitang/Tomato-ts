import * as React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import axios from 'src/axios/axios';
import history from 'src/axios/history';
import './Home.scss';
import Todos from 'src/components/todos/todos';
import Tomatoes from 'src/components/Tomatoes/Tomatoes';
import Stastistics from 'src/components/Stastistics/Stastistics';
import { connect } from 'react-redux';
import { changeLoading, initTodo, initTomatoes } from '../../redux/actions';
import logo from 'src/static/lgm.png';

interface StateType {
  user: any;
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
    document.title = '老干妈计时法';
    history.push('/login');
  }
}

class Home extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async componentDidMount() {
    try {
      this.props.changeLoading(true);
      const check = await axios.get('me');
      const todos = await axios.get('todos');
      const tomatos = await axios.get('tomatoes');
      const todoList = todos.data.resources.map((t: any) => {
        return { ...t, edit: false };
      });
      this.props.initTodo(todoList);
      this.props.initTomatoes(tomatos.data.resources);
      this.props.changeLoading(false);
      this.setState({ user: check.data });
    } catch (err) {
      this.props.changeLoading(false);
      console.log(err);
    }
  }

  render() {
    const { account } = this.state.user;
    return (
      <div className="home">
        <header>
          <div className="titleLeft">
            <img src={logo} alt="" className="logo" />
            <span className="title">老干妈计时法</span>
          </div>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              {account} <Icon type="down" />
            </a>
          </Dropdown>
        </header>
        <main>
          <Tomatoes />
          <Todos />
        </main>
        <Stastistics />
      </div>
    );
  }
}

const mapDispatchToProps = {
  changeLoading,
  initTodo,
  initTomatoes
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
