import * as React from 'react';
import { Button, Input, Icon, Modal } from 'antd';
import axios from '../../axios/axios';
import './TomatoesAction.scss';
import { connect } from 'react-redux';
import { addTomato, updateTomatoes } from '../../redux/actions';
import CountDown from './CountDown';

const { confirm } = Modal;

interface StateType {
  description: string;
}

interface ActionProps {
  tomatoList: any[];
  addTomato: (payload: any) => void;
  updateTomatoes: (payload: any) => void;
}

class TomatoesAction extends React.Component<ActionProps, StateType> {
  constructor(props: ActionProps) {
    super(props);
    this.state = {
      description: ''
    };
  }
  async actionStart(startTime: number) {
    try {
      const res = await axios.post('tomatoes', { duration: startTime });
      this.props.addTomato(res.data.resource);
    } catch (err) {
      console.log(err);
    }
  }
  showDeleteConfirm() {
    confirm({
      title: '您目前正在炒一个老干妈，要放弃这个老干妈?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.abortTomato();
      }
    });
  }
  abortTomato() {
    this.updateTomato({ aborted: true });
  }
  async updateTomato(params: any) {
    try {
      const res = await axios.put(
        `tomatoes/${this.unCompleteTomato().id}`,
        params
      );
      this.props.updateTomatoes(res.data.resource);
      document.title = '老干妈计时法';
      this.setState({ description: '' });
    } catch (err) {
      console.log(err);
    }
  }
  keyEnterDown() {
    if (this.state.description) {
      this.updateTomato({
        description: this.state.description,
        ended_at: new Date()
      });
    }
  }
  unCompleteTomato() {
    return this.props.tomatoList.filter(
      (n: any) => !n.description && !n.aborted && !n.ended_at
    )[0];
  }
  onFinshed() {
    this.forceUpdate();
  }
  render() {
    let action = <div />;
    const unCompleteTomato = this.unCompleteTomato();
    if (!unCompleteTomato) {
      action = (
        <Button
          className="actionBtn"
          onClick={() => this.actionStart(1000 * 60 * 25)}
        >
          开始炒老干妈
        </Button>
      );
    } else {
      const startTime = Date.parse(unCompleteTomato.started_at);
      const endTime = +new Date();
      const duration = unCompleteTomato.duration;
      if (endTime - startTime > duration) {
        action = (
          <div className="inputWrapper">
            <Input
              placeholder="请输入你刚刚完成的任务"
              className="actionBtn"
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
              onPressEnter={() => this.keyEnterDown()}
            />
            <Icon
              type="close-circle"
              className="closeTomato"
              onClick={() => this.showDeleteConfirm()}
            />
          </div>
        );
      } else {
        const timer = duration - (endTime - startTime);
        action = (
          <div className="countDownWrapper">
            <CountDown
              timer={timer}
              onFinshed={() => this.onFinshed()}
              duration={duration}
            />
            <Icon
              type="close-circle"
              className="closeTomato"
              onClick={() => this.showDeleteConfirm()}
            />
          </div>
        );
      }
    }
    return <div className="tomatoesAction">{action}</div>;
  }
}

const mapStateToProp = function(state: any) {
  return {
    tomatoList: state.Tomatoes
  };
};

const mapDispatchToProps = {
  addTomato,
  updateTomatoes
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(TomatoesAction);
