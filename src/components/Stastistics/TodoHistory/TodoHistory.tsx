import * as React from 'react';
import { Tabs, Pagination } from 'antd';
import './TodoHistory.scss';
import _ from 'lodash';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import axios from 'src/axios/axios';
import { updateTodos } from 'src/redux/actions';

const { TabPane } = Tabs;

interface TodoHistoryProps {
  todoList: any[];
  updateTodos: (payload: any) => void;
}

interface StateType {
  showCompleteTodos: any[];
  showDeleteTodos: any[];
  page: number;
}

class TodoHistory extends React.Component<TodoHistoryProps, StateType> {
  constructor(props: TodoHistoryProps) {
    super(props);
    this.state = {
      showCompleteTodos: [],
      showDeleteTodos: [],
      page: 1
    };
  }
  get completeTodo() {
    return this.props.todoList.filter(l => !l.deleted && l.completed);
  }
  get deleteTodo() {
    return this.props.todoList.filter(l => l.deleted);
  }
  get groupTodo() {
    return _.groupBy(this.completeTodo, t => {
      return format(t.completed_at, 'YYYY-MM-DD');
    });
  }
  get orderGroupTodo() {
    return Object.keys(this.groupTodo).sort((a, b) => {
      return Date.parse(b) - Date.parse(a);
    });
  }
  formatWeek(date: string) {
    let week;
    switch (format(date, 'd')) {
      case '0':
        return (week = '周天');
      case '1':
        return (week = '周一');
      case '2':
        return (week = '周二');
      case '3':
        return (week = '周三');
      case '4':
        return (week = '周四');
      case '5':
        return (week = '周五');
      case '6':
        return (week = '周六');
    }
    return week;
  }
  async update(id: number, params: any) {
    if (params.completed) {
      params.completed_at = new Date();
    }
    try {
      const res = await axios.put(`todos/${id}`, params);
      this.props.updateTodos(res.data.resource);
      if (params.deleted) {
        this.completePageChange(this.state.page);
      } else {
        this.deletePageChange(this.state.page);
      }
    } catch (err) {
      console.log(err);
    }
  }
  deletePageChange(page: number) {
    const startIndex = (page - 1) * 10;
    this.setState({
      ...this.state,
      page,
      showDeleteTodos: this.deleteTodo.slice(startIndex, startIndex + 10)
    });
  }
  completePageChange(page: number) {
    const startIndex = (page - 1) * 3;
    this.setState({
      ...this.state,
      page,
      showCompleteTodos: this.orderGroupTodo.slice(startIndex, startIndex + 3)
    });
  }
  componentDidMount() {
    this.setState({
      page: 1,
      showCompleteTodos: this.orderGroupTodo.slice(0, 3),
      showDeleteTodos: this.deleteTodo.slice(0, 10)
    });
  }
  render() {
    const { showCompleteTodos, showDeleteTodos } = this.state;
    return (
      <div className="todoHistory">
        <Tabs type="card">
          <TabPane tab="已完成的任务" key="1">
            {showCompleteTodos.map(t => {
              {
                return this.groupTodo[t] ? (
                  <div key={t} className="dateWrapper">
                    <div className="title">
                      <span className="dateTime">{format(t, 'MM月DD日')}</span>
                      <span className="weekDay">{this.formatWeek(t)}</span>
                      <div className="total">
                        完成了{this.groupTodo[t].length}个任务
                      </div>
                    </div>
                    <div className="itemList">
                      {this.groupTodo[t].map(l => {
                        return (
                          <div className="todoItem" key={l.id}>
                            <span className="todoDateTime">
                              {format(l.completed_at, 'HH:mm')}
                            </span>
                            <span className="todoDesc">{l.description}</span>
                            <div className="todoActionWrapper">
                              <span
                                onClick={() =>
                                  this.update(l.id, {
                                    completed: false,
                                    deleted: false
                                  })
                                }
                              >
                                恢复
                              </span>
                              <span
                                onClick={() =>
                                  this.update(l.id, { deleted: true })
                                }
                              >
                                删除
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null;
              }
            })}
            <div className="paginationWrapper">
              <Pagination
                defaultCurrent={1}
                total={Object.keys(this.groupTodo).length}
                pageSize={3}
                onChange={page => this.completePageChange(page)}
              />
              <span className="totle">
                总计{this.completeTodo.length}个任务
              </span>
            </div>
          </TabPane>
          <TabPane tab="已删除的任务" key="2">
            <div className="deleteWrapper">
              {showDeleteTodos.map(t => {
                return (
                  <div key={t.id} className="deleteTodoItem">
                    <span className="deleteTodoTime">
                      {format(t.created_at, 'YYYY年MM月DD日 HH:mm')}
                    </span>
                    <span className="deleteTodoDesc">{t.description}</span>
                    <span
                      className="deleteTodoAction"
                      onClick={() =>
                        this.update(t.id, { completed: false, deleted: false })
                      }
                    >
                      恢复
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="paginationWrapper">
              <Pagination
                defaultCurrent={1}
                total={this.deleteTodo.length}
                onChange={page => this.deletePageChange(page)}
                pageSize={10}
              />
              <span className="totle">总计{this.deleteTodo.length}个任务</span>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProp = (state: any) => {
  return {
    todoList: state.Todos
  };
};

const mapDispatchToProps = {
  updateTodos
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(TodoHistory);
