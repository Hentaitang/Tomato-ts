import * as React from 'react';
import './Stastistics.scss';
import { connect } from 'react-redux';
import StastisticsSvg from './StastisticsSvg';
import TodoHistory from './TodoHistory/TodoHistory';
import TomatoHistory from './TomatoHistory/TomatoHistory';
import className from 'classnames';

interface StastisticsProps {
  todoList: any[];
  tomatoList: any[];
}

interface StateType {
  width: number;
  active: number;
}

class Stastistics extends React.Component<StastisticsProps, StateType> {
  liNode: HTMLLIElement | null;
  constructor(props: StastisticsProps) {
    super(props);
    this.state = {
      width: 0,
      active: 0
    };
  }
  componentDidMount() {
    this.setState({ width: this.liNode ? this.liNode.clientWidth : 0 });
    window.addEventListener('resize', () => {
      this.setState({ width: this.liNode ? this.liNode.clientWidth : 0 });
    });
  }
  get finishTodoList() {
    return this.props.todoList.filter(l => l.completed && !l.deleted);
  }
  get finishTomatoList() {
    return this.props.tomatoList.filter(
      l => l.ended_at && l.description && !l.aborted
    );
  }
  changeActive(active: number) {
    if (active === this.state.active) {
      this.setState({ ...this.state, active: 0 });
    } else {
      this.setState({ ...this.state, active });
    }
  }
  render() {
    const { width, active } = this.state;
    return (
      <div className="stastistics">
        <ul className="stastisticsTabs">
          {/* <li
            className={className({
              active: active === 1,
              stastisticsItem: true
            })}
            ref={li => (this.liNode = li)}
            onClick={() => this.changeActive(1)}
          >
            <div className="description">
              <span className="title">统计</span>
              <span className="subTitle">8月累计</span>
              <span className="quantity">4</span>
            </div>
          </li> */}
          <li
            onClick={() => this.changeActive(1)}
            ref={li => (this.liNode = li)}
            className={className({
              active: active === 1,
              stastisticsItem: true
            })}
          >
            <div className="description">
              <span className="title">老干妈历史</span>
              <span className="subTitle">累计完成老干妈</span>
              <span className="quantity">{this.finishTomatoList.length}</span>
            </div>
            <StastisticsSvg list={this.finishTomatoList} width={width} />
          </li>
          <li
            onClick={() => this.changeActive(2)}
            className={className({
              active: active === 2,
              stastisticsItem: true
            })}
          >
            <div className="description">
              <span className="title">任务历史</span>
              <span className="subTitle">累计完成任务</span>
              <span className="quantity">{this.finishTodoList.length}</span>
            </div>
            <StastisticsSvg list={this.finishTodoList} width={width} />
          </li>
        </ul>
        <div className="historyWrapper">
          {/* {active === 1 ? null : null} */}
          {active === 1 ? <TomatoHistory /> : null}
          {active === 2 ? <TodoHistory /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProp = (state: any) => {
  return {
    todoList: state.Todos,
    tomatoList: state.Tomatoes
  };
};

export default connect(mapStateToProp)(Stastistics);
