import * as React from 'react';

interface CountPorps {
  timer: number;
}

interface StateType {
  countDown: number;
}

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
    const interval = setInterval(() => {
      const time = this.state.countDown;
      if (time < 1000) {
        clearInterval(interval);
      } else {
        this.setState({ countDown: time - 1000 });
      }
    }, 1000);
  }
  render() {
    return (
      <div className="countDown">
        <span>{this.countDown()}</span>
      </div>
    );
  }
}

export default CountDown;
