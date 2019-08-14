import TodoInput from './todoInput';
import TodoItem from './todoItem';
import * as React from 'react';
import './todos.scss';
import { Button, Icon } from 'antd';
import { connect } from 'react-redux';

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
  compeleteList() {
    return this.unDeleteList().filter(l => l.completed);
  }
  unCompeleteList() {
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
        <div className="item">
          {this.unCompeleteList().map(n => {
            return <TodoItem {...n} key={n.id} />;
          })}
        </div>
        <Button className="changeBtn" onClick={() => this.changeShow()}>
          {showCompleted ? <Icon type="down" /> : <Icon type="right" />}
          最近完成任务
        </Button>
        <div className="item">
          {showCompleted ? (
            this.compeleteList().map(n => {
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
