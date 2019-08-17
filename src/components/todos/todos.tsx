import TodoInput from './todoInput';
import TodoItem from './todoItem';
import * as React from 'react';
import './todos.scss';
import { Button, Icon } from 'antd';
import { connect } from 'react-redux';
import NoHistory from '../Tomatoes/NoHistory';

interface TodoProps {
  todoList: any[];
}

interface StateType {
  showCompleted: boolean;
}

class Todos extends React.Component<TodoProps, StateType> {
  constructor(props: TodoProps) {
    super(props);
    this.state = {
      showCompleted: false
    };
  }
  unDeleteList() {
    return this.props.todoList.filter(l => !l.deleted);
  }
  get compeleteList() {
    return this.unDeleteList()
      .filter(l => {
        const filterTime =
          +new Date() - Date.parse(l.completed_at) < 1000 * 60 * 60 * 24 * 3;
        return l.completed && filterTime;
      })
      .splice(0, 10);
  }
  get unCompeleteList() {
    return this.unDeleteList().filter(l => !l.completed);
  }
  changeShow() {
    this.setState({ showCompleted: !this.state.showCompleted });
  }
  render() {
    const { showCompleted } = this.state;
    return (
      <div className="todoList">
        <TodoInput />
        {this.unCompeleteList.length ? (
          <div className="item">
            {this.unCompeleteList.map(n => {
              return <TodoItem {...n} key={n.id} />;
            })}
          </div>
        ) : (
          <NoHistory />
        )}
        {this.compeleteList.length ? (
          <Button className="changeBtn" onClick={() => this.changeShow()}>
            {showCompleted ? <Icon type="down" /> : <Icon type="right" />}
            最近完成任务
          </Button>
        ) : (
          <span />
        )}
        <div className="item">
          {showCompleted ? (
            this.compeleteList.map(n => {
              return <TodoItem {...n} key={n.id} />;
            })
          ) : (
            <span />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    todoList: state.Todos
  };
};

export default connect(
  mapStateToProps,
  null
)(Todos);
