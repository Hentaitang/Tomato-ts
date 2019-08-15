import * as React from 'react';

interface CountPorps {
  timer: number;
  onFinshed: () => void;
  duration: number;
}

interface StateType {
  countDown: number;
}

let interval: NodeJS.Timer;
class CountDown extends React.Component<CountPorps, StateType> {
  constructor(props: CountPorps) {
    super(props);
    this.state = {
      countDown: this.props.timer
    };
  }
  countDown() {
    const min = Math.floor(this.state.countDown / (1000 * 60));
    const sec = Math.floor((this.state.countDown / 1000) % 60);
    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  }
  componentDidMount() {
    document.title = `${this.countDown()}-老干妈计时法`;
    interval = setInterval(() => {
      const time = this.state.countDown;
      if (time < 1000) {
        clearInterval(interval);
        document.title = '老干妈计时法';
        this.props.onFinshed();
      } else {
        this.setState({ countDown: time - 1000 });
        document.title = `${this.countDown()}-老干妈计时法`;
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(interval);
  }
  render() {
    const progress = 1 - this.state.countDown / this.props.duration;
    return (
      <div className="countDown">
        <span>{this.countDown()}</span>
        <div className="progress" style={{ width: `${progress * 100}%` }} />
      </div>
    );
  }
}

export default CountDown;
