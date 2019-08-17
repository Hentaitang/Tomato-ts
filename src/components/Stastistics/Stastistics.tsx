import * as React from 'react';
import './Stastistics.scss';
import { connect } from 'react-redux';
import StastisticsSvg from './StastisticsSvg';

interface StastisticsProps {
  todoList: any[];
  tomatoList: any[];
}

interface StateType {
  width: number;
}

class Stastistics extends React.Component<StastisticsProps, StateType> {
  liNode: HTMLLIElement | null;
  constructor(props: StastisticsProps) {
    super(props);
    this.state = {
      width: 0
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
  render() {
    return (
      <div className="stastistics">
        <ul>
          <li ref={li => (this.liNode = li)}>
            <div className="description">
              <span className="title">统计</span>
              <span className="subTitle">8月累计</span>
              <span className="quantity">4</span>
            </div>
          </li>
          <li>
            <div className="description">
              <span className="title">老干妈历史</span>
              <span className="subTitle">累计完成老干妈</span>
              <span className="quantity">{this.finishTomatoList.length}</span>
            </div>
            <StastisticsSvg
              list={this.finishTomatoList}
              width={this.state.width}
            />
          </li>
          <li>
            <div className="description">
              <span className="title">任务历史</span>
              <span className="subTitle">累计完成任务</span>
              <span className="quantity">{this.finishTodoList.length}</span>
            </div>
            <StastisticsSvg
              list={this.finishTodoList}
              width={this.state.width}
            />
          </li>
        </ul>
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
