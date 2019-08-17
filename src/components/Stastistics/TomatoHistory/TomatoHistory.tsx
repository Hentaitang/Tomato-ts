import * as React from 'react';
import { Tabs, Pagination } from 'antd';
import './TomatoHistory.scss';
import _ from 'lodash';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import axios from 'src/axios/axios';
// import { updateTodos } from 'src/redux/actions';

const { TabPane } = Tabs;

interface TodoHistoryProps {
  tomatoList: any[];
  // updateTodos: (payload: any) => void;
}

interface StateType {
  showCompleteTodos: any[];
  showDeleteTodos: any[];
}

class TomatoHistory extends React.Component<TodoHistoryProps, StateType> {
  constructor(props: TodoHistoryProps) {
    super(props);
    this.state = {
      showCompleteTodos: [],
      showDeleteTodos: []
    };
  }
  get completeTodo() {
    return this.props.tomatoList.filter(
      t => t.description && !t.aborted && t.ended_at
    );
  }
  get abortedTodo() {
    return this.props.tomatoList.filter(l => l.aborted);
  }
  get groupTodo() {
    return _.groupBy(this.completeTodo, t => {
      return format(t.ended_at, 'YYYY-MM-DD');
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
      params.ended_at = new Date();
    }
    try {
      const res = await axios.put(`todos/${id}`, params);
      console.log(res);
      // this.props.updateTodos(res.data.resource);
    } catch (err) {
      console.log(err);
    }
  }
  deletePageChange(page: number) {
    const startIndex = (page - 1) * 10;
    this.setState({
      ...this.state,
      showDeleteTodos: this.abortedTodo.slice(startIndex, startIndex + 10)
    });
  }
  completePageChange(page: number) {
    const startIndex = (page - 1) * 3;
    this.setState({
      ...this.state,
      showCompleteTodos: this.orderGroupTodo.slice(startIndex, startIndex + 3)
    });
  }
  componentDidMount() {
    this.setState({
      showCompleteTodos: this.orderGroupTodo.slice(0, 3),
      showDeleteTodos: this.abortedTodo.slice(0, 10)
    });
  }
  render() {
    const { showCompleteTodos, showDeleteTodos } = this.state;
    return (
      <div className="tomatoHistory">
        <Tabs type="card">
          <TabPane tab="已完成的老干妈" key="1">
            {showCompleteTodos.map(t => {
              return (
                <div key={t} className="dateWrapper">
                  <div className="title">
                    <span className="dateTime">{format(t, 'MM月DD日')}</span>
                    <span className="weekDay">{this.formatWeek(t)}</span>
                    <div className="total">
                      完成了{this.groupTodo[t].length}个老干妈
                    </div>
                  </div>
                  <div className="itemList">
                    {this.groupTodo[t].map(l => {
                      return (
                        <div className="todoItem" key={l.id}>
                          <span className="todoDateTime">
                            {format(l.ended_at, 'HH:mm')}
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
              );
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
          <TabPane tab="打断记录" key="2">
            <div className="deleteWrapper">
              {showDeleteTodos.map(t => {
                return (
                  <div key={t.id} className="deleteTodoItem">
                    <span className="deleteTodoTime">
                      {format(t.created_at, 'YYYY年MM月DD日 HH:mm')}
                    </span>
                    <span className="deleteTodoDesc">
                      {t.description ? t.description : '描述为空'}
                    </span>
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
                total={this.abortedTodo.length}
                onChange={page => this.deletePageChange(page)}
                pageSize={10}
              />
              <span className="totle">总计{this.abortedTodo.length}个任务</span>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProp = (state: any) => {
  return {
    tomatoList: state.Tomatoes
  };
};

// const mapDispatchToProps = {
//   updateTodos
// };

export default connect(
  mapStateToProp
  // mapDispatchToProps
)(TomatoHistory);
